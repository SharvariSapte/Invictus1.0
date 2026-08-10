import { useEffect, useState } from "react";
import PowerPanel from "../components/PowerPanel";
import TrenchDivider from "../components/TrenchDivider";
import BattleFX from "../components/BattleFX";
import { playLaunchSound, playExplosionSound } from "../components/sound";
import landingCss from "../landing.css?raw";

const SIDES = {
  allied: {
    title: "ALLIED FRONT",
    subtitle: "UNITED WE STAND. VICTORY TOGETHER."
  },
  axis: {
    title: "AXIS POWERS",
    subtitle: "STRENGTH. ORDER. VICTORY."
  }
};

export default function Landing({ onJoinComplete }) {
  const [battle, setBattle] = useState(null);
  const [flash, setFlash] = useState(false);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    if (!battle) return;

    // Keep the sound aligned with the visual impact anchor (1.02s).
    // The fireball itself starts at ~1.03s, so the blast sound lands
    // immediately as the missile reaches the target.
    const explosionTimer = setTimeout(() => {
      playExplosionSound();
      setFlash(true);
    }, 1020);

    const completeTimer = setTimeout(() => {
      onJoinComplete(battle);
    }, 1900);

    return () => {
      clearTimeout(explosionTimer);
      clearTimeout(completeTimer);
    };
  }, [battle, onJoinComplete]);

  // Inject landing CSS into the document only while this component is mounted.
  useEffect(() => {
    const style = document.createElement('style');
    style.id = 'landing-styles';
    style.textContent = landingCss;
    document.head.appendChild(style);
    return () => {
      const el = document.getElementById('landing-styles');
      if (el) el.remove();
    };
  }, []);

  const handleJoin = (side) => {
    if (disabled) return;
    setDisabled(true);
    setBattle(side);
    setFlash(false);
    playLaunchSound();
  };

  return (
    <main className="war-page">
      <section className="battlefield" aria-label="Choose your power">
        <PowerPanel
          side="allied"
          data={SIDES.allied}
          selected={battle === "allied"}
          disabled={disabled}
          onJoin={handleJoin}
        />

        <TrenchDivider />

        <PowerPanel
          side="axis"
          data={SIDES.axis}
          selected={battle === "axis"}
          disabled={disabled}
          onJoin={handleJoin}
        />

        <BattleFX battle={battle} flash={flash} />
      </section>
    </main>
  );
}