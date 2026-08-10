export default function PowerPanel({ side, data, selected, disabled, onJoin }) {
  const allied = side === "allied";

  return (
    <article
      className={`power-panel ${allied ? "allied-panel" : "axis-panel"} ${selected ? "panel-selected" : ""}`}
    >
      <div className="power-hover-glow" aria-hidden="true" />

      <div className="map-backdrop" aria-hidden="true" />
      <div className="map-vignette" aria-hidden="true" />
      <div className="battle-smoke-bg" aria-hidden="true" />

      <div className="power-hover-label" aria-hidden="true">
        <span>{data.title}</span>
      </div>

      <div className="aircraft aircraft-one" aria-hidden="true">✈</div>
      <div className="aircraft aircraft-two" aria-hidden="true">✈</div>

      <div className="ground-battle" aria-hidden="true">
        <span className="soldier s1" />
        <span className="soldier s2" />
        <span className="soldier s3" />
        <span className="tank" />
        <span className="wire-line" />
      </div>

      <div className="panel-content">
        <div className="panel-kicker">INVICTUS 1.0</div>
        <h1>{data.title}</h1>
        <div className="title-rule">
          <span /> <b>★ ★ ★</b> <span />
        </div>
        <p>{data.subtitle}</p>

        <button
          type="button"
          className="join-button"
          onClick={() => onJoin(side)}
          disabled={disabled}
          aria-label={`Join ${data.title}`}
        >
          <i>★</i>
          <strong>JOIN</strong>
          <i>★</i>
        </button>
      </div>
    </article>
  );
}
