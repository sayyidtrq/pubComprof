export function SectionHeading({
  title,
  sub,
  center = false,
}: {
  title: string;
  sub?: string;
  center?: boolean;
}) {
  return (
    <div className={`mb-8 ${center ? "text-center" : ""}`}>
      <h2 className="h-section">{title}</h2>
      {sub && (
        <p
          className={`measure text-muted mt-3 text-lg ${center ? "mx-auto" : ""}`}
        >
          {sub}
        </p>
      )}
    </div>
  );
}
