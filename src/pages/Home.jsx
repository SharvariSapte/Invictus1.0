import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PowerPanel from "../components/PowerPanel";
import TrenchDivider from "../components/TrenchDivider";
import BattleFX from "../components/BattleFX";
import { playLaunchSound, playExplosionSound } from "../components/sound";

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

export default function Home() {
  const navigate = useNavigate();
  const [battle, setBattle] = useState(null);
  const [flash, setFlash] = useState(false);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    if (!battle) return;

    const explosionTimer = setTimeout(() => {
      playExplosionSound();
      setFlash(true);
    }, 1050);

    const navigateTimer = setTimeout(() => {
      navigate(`/selected/${battle}`);
    }, 1900);

    return () => {
      clearTimeout(explosionTimer);
      clearTimeout(navigateTimer);
    };
  }, [battle, navigate]);

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
