export default function BattleFX({ battle, flash }) {
  if (!battle) return null;

  // battle = the side that launched. The impact is always the opposite side.
  const target = battle === "allied" ? "axis" : "allied";

  return (
    <>
      <div className={`projectile-layer launcher-${battle}`}>
        <div className="projectile">
          <span className="projectile-flame" />
          <span className="projectile-body" />
          <span className="projectile-tail" />
        </div>
      </div>

      <div className={`impact impact-target-${target}`}>
        <div className="fireball">
          <i className="fire-core" />
          <i className="fire-mid" />
          <i className="fire-outer" />
        </div>

        <div className="impact-ring ring-one" />
        <div className="impact-ring ring-two" />

        <div className="smoke smoke-one" />
        <div className="smoke smoke-two" />
        <div className="smoke smoke-three" />
        <div className="smoke smoke-four" />

        <div className="debris debris-one" />
        <div className="debris debris-two" />
        <div className="debris debris-three" />
        <div className="debris debris-four" />
      </div>

      {flash && <div className="battle-flash" />}
    </>
  );
}