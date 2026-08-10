import { useParams, Link } from "react-router-dom";

export default function DummyPage() {
  const { side } = useParams();
  const label = side === "allied" ? "ALLIED FRONT" : "AXIS POWERS";

  return (
    <main className="dummy-page">
      <div className="paper-noise" aria-hidden="true" />
      <div className="dummy-card">
        <p className="eyebrow">INVICTUS 1.0</p>
        <h1>{label}</h1>
        <div className="stamp">SELECTION CONFIRMED</div>
        <p>
          The next battlefield awaits. This is a placeholder page for the
          upcoming round/experience.
        </p>
        <Link to="/" className="back-button">RETURN TO BATTLEFIELD</Link>
      </div>
    </main>
  );
}