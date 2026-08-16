export function SonarBackground({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`sonar-background ${compact ? "sonar-compact" : ""}`} aria-hidden="true">
      <div className="structural-grid" />
      <div className="sonar-origin">
        <span className="sonar-ring ring-one" />
        <span className="sonar-ring ring-two" />
        <span className="sonar-ring ring-three" />
        <span className="sonar-core" />
        <span className="sonar-sweep" />
      </div>
    </div>
  );
}
