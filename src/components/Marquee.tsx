"use client";

import { Pause, Play } from "lucide-react";
import { useState } from "react";
import { marquee, ui } from "@/content/site";

export function Marquee() {
  const [paused, setPaused] = useState(false);
  return (
    <div className="marquee bg-navy flex items-stretch text-white">
      <div className="marquee-viewport min-w-0 flex-1 overflow-hidden py-4">
        <div className="marquee-track" data-paused={paused || undefined}>
          {[false, true].map((copy) => (
            <div
              key={String(copy)}
              aria-hidden={copy || undefined}
              className="flex flex-1 items-center justify-around whitespace-nowrap"
            >
              {marquee.map((text) => (
                <span key={text} className="flex items-center gap-8 pr-8">
                  <span>{text}</span>
                  <span
                    aria-hidden="true"
                    className="bg-yellow h-1.5 w-1.5 shrink-0 rounded-full"
                  />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
      <button
        type="button"
        aria-label={paused ? ui.marqueeResume : ui.marqueePause}
        className="text-yellow flex min-w-12 shrink-0 items-center justify-center border-l border-white/30 hover:bg-white/10 focus-visible:-outline-offset-4 motion-reduce:hidden"
        onClick={() => setPaused(!paused)}
      >
        {paused ? (
          <Play size={18} aria-hidden="true" />
        ) : (
          <Pause size={18} aria-hidden="true" />
        )}
      </button>
    </div>
  );
}
