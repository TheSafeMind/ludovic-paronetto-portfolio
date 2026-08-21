export function SonarBackground({
  compact = false,
  forceMotion = false,
}: {
  compact?: boolean;
  forceMotion?: boolean;
}) {
  return (
    <div className={`sonar-background ${compact ? "sonar-compact" : ""} ${forceMotion ? "sonar-force-motion" : ""}`}>
      <div className="structural-grid" aria-hidden="true" />
      <div className="sonar-origin" aria-hidden="true">
        <span className="sonar-ring ring-one" />
        <span className="sonar-ring ring-two" />
        <span className="sonar-ring ring-three" />
        <span className="sonar-sweep" />
        <span className="sonar-return sonar-return-one" />
        <span className="sonar-return sonar-return-two" />
        <span className="sonar-return sonar-return-three" />
        <span className="sonar-return sonar-return-four" />
        <span className="sonar-return sonar-return-five" />
        <span className="sonar-return sonar-return-six" />
        <span className="sonar-core" />
      </div>
    </div>
  );
}
