"use client";

import Lenis from "lenis";
import { useEffect } from "react";

const OFFSETS: Record<string, Keyframe> = {
  left: { translate: "-2rem 0" },
  right: { translate: "2rem 0" },
  zoom: { translate: "0 0", scale: "0.96" },
};

/**
 * Smooth scrolling (Lenis) and scroll reveals for elements marked `data-reveal`
 * (optionally "left" | "right" | "zoom"; `data-reveal-group` staggers children).
 *
 * Reveals run through the Web Animations API instead of attributes or classes, so
 * they never change server-rendered markup that React may still be hydrating.
 * Without JavaScript or with reduced motion, content stays visible and scrolling
 * stays native.
 */
export function Motion() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduce.matches) return;
    const lenis = new Lenis({
      autoRaf: true,
      // Sections already carry scroll-margin-top for the sticky header, which Lenis honors.
      anchors: true,
      allowNestedScroll: true,
      stopInertiaOnNavigate: true,
    });
    const onReduce = () => reduce.matches && lenis.destroy();
    reduce.addEventListener("change", onReduce);
    return () => {
      reduce.removeEventListener("change", onReduce);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    if (
      !("IntersectionObserver" in window) ||
      typeof Element.prototype.animate !== "function" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;

    const seen = new WeakSet<Element>();
    const pending = new Map<Element, Animation>();

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          pending.get(entry.target)?.play();
          pending.delete(entry.target);
          io.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.1 },
    );

    const bind = () => {
      const vh = window.innerHeight;
      for (const el of document.querySelectorAll<HTMLElement>(
        "[data-reveal]",
      )) {
        if (seen.has(el)) continue;
        seen.add(el);
        // Content already on screen is left as is, so nothing flashes on load.
        if (el.getBoundingClientRect().top < vh) continue;
        const delay =
          parseFloat(getComputedStyle(el).getPropertyValue("--reveal-delay")) ||
          0;
        const from: Keyframe = {
          opacity: 0,
          translate: "0 1.5rem",
          scale: "1",
          ...OFFSETS[el.dataset.reveal ?? ""],
        };
        const to: Keyframe = { opacity: 1, translate: "0 0", scale: "1" };
        const animation = el.animate([from, to], {
          duration: 700,
          delay,
          easing: "cubic-bezier(0.22, 1, 0.36, 1)",
          fill: "backwards",
        });
        animation.pause();
        pending.set(el, animation);
        io.observe(el);
      }
    };

    bind();
    let frame = 0;
    const mo = new MutationObserver(() => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(bind);
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      cancelAnimationFrame(frame);
      mo.disconnect();
      io.disconnect();
      for (const animation of pending.values()) animation.cancel();
    };
  }, []);

  return null;
}
