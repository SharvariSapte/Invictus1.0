import { useEffect, useState } from "react";
import PowerPanel from "../components/PowerPanel";
import TrenchDivider from "../components/TrenchDivider";
import BattleFX from "../components/BattleFX";
import {
  preloadBattleSound,
  playLaunchSound,
} from "../components/sound";
import landingCss from "../landing.css?raw";

const SIDES = {
  allied: {
    title: "ALLIED FRONT",
    subtitle: "UNITED WE STAND. VICTORY TOGETHER.",
  },
  axis: {
    title: "AXIS POWERS",
    subtitle: "STRENGTH. ORDER. VICTORY.",
  },
};

export default function Landing({ onJoinComplete }) {
  const [battle, setBattle] = useState(null);
  const [flash, setFlash] = useState(false);
  const [disabled, setDisabled] = useState(false);

  // Preload battle audio as soon as landing page opens
  useEffect(() => {
    preloadBattleSound();
  }, []);

  // Battle animation timing
  useEffect(() => {
    if (!battle) return;

    // Visual explosion / flash
    // Keep this synchronized with the missile animation
    const explosionTimer = setTimeout(() => {
      setFlash(true);
    }, 1020);

    // Navigate to the main site after animation
    const completeTimer = setTimeout(() => {
      onJoinComplete(battle);
    }, 1900);

    return () => {
      clearTimeout(explosionTimer);
      clearTimeout(completeTimer);
    };
  }, [battle, onJoinComplete]);

  // Inject landing CSS only while this component is mounted
  useEffect(() => {
    const style = document.createElement("style");

    style.id = "landing-styles";
    style.textContent = landingCss;

    document.head.appendChild(style);

    return () => {
      const el = document.getElementById("landing-styles");
      if (el) el.remove();
    };
  }, []);

  const handleJoin = (side) => {
    if (disabled) return;

    setDisabled(true);
    setBattle(side);
    setFlash(false);

    // Start the trimmed missile + explosion audio
    // at exactly the same time as the missile animation
    playLaunchSound();
  };

  return (
    <main className="war-page">
      <section
        className="battlefield"
        aria-label="Choose your power"
      >
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

        <BattleFX
          battle={battle}
          flash={flash}
        />
      </section>
    </main>
  );
}