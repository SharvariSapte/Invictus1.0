import React, { useState, useRef, useEffect } from "react";

const PRIZES = [
  {
    code: "BRAVO",
    rank: "2ND PLACE",
    amount: "₹2,000",
    detail: "Runner-Up Medal + Cash",
  },
  {
    code: "ALPHA",
    rank: "1ST PLACE",
    amount: "₹3,000",
    detail: "Champion's Trophy + Cash",
  },
  {
    code: "CHARLIE",
    rank: "3RD PLACE",
    amount: "₹1,000",
    detail: "2nd Runner-Up + Cash",
  },
];

const OLIVE = "#1B3A22";
const OLIVE_DARK = "#101F14";
const KHAKI = "#C7B98A";
const RUST = "#9C3B2E";
const BRASS = "#C69B3C";
const PAPER = "#EDE6D2";
const INK = "#1C1C18";

function Crate({ index, prize, status, onFire }) {
  const locked = status === "locked";
  const firing = status === "firing";
  const revealed = status === "revealed";

  return (
    <div className="relative flex flex-col items-center w-full">
      <div
        className="mb-1.5 sm:mb-3 px-1.5 sm:px-4 py-0.5 sm:py-1 text-center whitespace-nowrap"
        style={{
          background: INK,
          color: KHAKI,
          letterSpacing: "0.15em",
          fontSize: "clamp(0.5rem, 2.4vw, 0.75rem)",
          border: `1px solid ${KHAKI}`,
        }}
      >
        TGT {String.fromCharCode(65 + index)} · {prize.code}
      </div>

      <button
        onClick={() => (locked ? onFire(index) : null)}
        disabled={!locked}
        className="relative w-full focus:outline-none group"
        style={{ cursor: locked ? "crosshair" : "default" }}
        aria-label={locked ? `Fire on target ${prize.code}` : `${prize.rank} revealed`}
      >
        <div
          className="relative w-full aspect-square overflow-hidden"
          style={{
            background:
              "repeating-linear-gradient(0deg, #6B4A2E 0px, #6B4A2E 22px, #5C3F27 22px, #5C3F27 25px)",
            border: "3px solid #3A2817",
            boxShadow: locked
              ? "inset 0 0 0 4px rgba(0,0,0,0.15), 0 6px 16px rgba(0,0,0,0.5)"
              : "0 4px 10px rgba(0,0,0,0.3)",
            transition: "box-shadow 0.3s ease",
          }}
        >
          {["top-0 left-0", "top-0 right-0", "bottom-0 left-0", "bottom-0 right-0"].map((pos) => (
            <div
              key={pos}
              className={`absolute ${pos} w-3.5 h-3.5 sm:w-6 sm:h-6`}
              style={{ background: "#8A8F87", clipPath: "polygon(0 0, 100% 0, 0 100%)", opacity: 0.85 }}
            />
          ))}

          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(45deg, transparent 46%, #3A2817 46%, #3A2817 54%, transparent 54%), linear-gradient(-45deg, transparent 46%, #3A2817 46%, #3A2817 54%, transparent 54%)",
              opacity: locked ? 0.5 : 0,
              transition: "opacity 0.4s ease",
            }}
          />

          <div
            className="absolute inset-0 flex items-center justify-center select-none"
            style={{
              fontWeight: 700,
              fontSize: "clamp(1.6rem, 8vw, 3.5rem)",
              color: "rgba(237,230,210,0.16)",
            }}
          >
            {index + 1}
          </div>

          {locked && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 sm:gap-2">
              <span
                style={{ color: KHAKI, fontSize: "clamp(0.45rem, 2vw, 0.7rem)", letterSpacing: "0.2em" }}
              >
                CLASSIFIED
              </span>
            </div>
          )}

          {firing && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="muzzle-flash" />
              <span
                style={{ color: "#FFDE8A", fontSize: "clamp(1rem, 2vw, 1.5rem)", fontWeight: 700 }}
              >
                
              </span>
            </div>
          )}

          {revealed && (
            <div
              className="absolute inset-0 flex flex-col items-center justify-center gap-3 reveal-pop px-3 text-center"
              style={{ background: PAPER }}
            >
              <div
                style={{ color: RUST, fontSize: "clamp(0.85rem, 4.5vw, 1.6rem)", fontWeight: 700, lineHeight: 1 }}
              >
                {prize.amount}
              </div>
              <div style={{ color: INK, fontSize: "clamp(0.45rem, 2vw, 0.7rem)", letterSpacing: "0.1em", fontWeight: 600 }}>
                {prize.rank}
              </div>
              <div
                className="hidden sm:block"
                style={{ color: "#4A4A42", fontSize: "clamp(0.4rem, 1.6vw, 0.62rem)" }}
              >
                {prize.detail}
              </div>
            </div>
          )}
        </div>

        {locked && (
          <div
            className="mt-1 sm:mt-2 flex items-center justify-center gap-1 opacity-70 sm:opacity-0 group-hover:opacity-100 transition-opacity"
            style={{ color: BRASS, fontSize: "clamp(0.5rem, 2vw, 0.7rem)", letterSpacing: "0.15em" }}
          >
            FIRE
          </div>
        )}
      </button>
    </div>
  );
}

export default function PrizePool() {
  const [statuses, setStatuses] = useState(PRIZES.map(() => "locked"));
  const [shakeAll, setShakeAll] = useState(false);
  const [flash, setFlash] = useState(false);
  const [booted, setBooted] = useState(false);
  const timers = useRef([]);

  useEffect(() => {
    const t = setTimeout(() => setBooted(true), 150);
    return () => clearTimeout(t);
  }, []);

  const revealedCount = statuses.filter((s) => s === "revealed").length;
  const allRevealed = revealedCount === PRIZES.length;

  const fire = (idx) => {
    if (statuses[idx] !== "locked") return;
    setStatuses((prev) => {
      const next = [...prev];
      next[idx] = "firing";
      return next;
    });
    setShakeAll(true);
    setFlash(true);
    const t0 = setTimeout(() => setFlash(false), 120);
    const t1 = setTimeout(() => setShakeAll(false), 400);
    const t2 = setTimeout(() => {
      setStatuses((prev) => {
        const next = [...prev];
        next[idx] = "revealed";
        return next;
      });
    }, 480);
    timers.current.push(t0, t1, t2);
  };

  const reset = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setStatuses(PRIZES.map(() => "locked"));
  };

  return (
    <section
      id="war-room"
      className={`relative w-full min-h-[560px] sm:min-h-[680px] flex flex-col items-center justify-center overflow-hidden ${
        shakeAll ? "screen-shake" : ""
      }`}
      style={{
        backgroundImage: "url('/desktop_heroo.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        fontFamily: "'Oswald', sans-serif",
      }}
    >
      <div className="absolute inset-0 bg-black/80" />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600;700&family=Bebas+Neue&display=swap');

        @keyframes screenShakeKF {
          0% { transform: translate(0,0) rotate(0deg); }
          15% { transform: translate(-6px,3px) rotate(-0.4deg); }
          30% { transform: translate(6px,-3px) rotate(0.4deg); }
          45% { transform: translate(-5px,-2px) rotate(-0.3deg); }
          60% { transform: translate(5px,2px) rotate(0.3deg); }
          80% { transform: translate(-2px,1px) rotate(0deg); }
          100% { transform: translate(0,0) rotate(0deg); }
        }
        .screen-shake { animation: screenShakeKF 0.4s ease-in-out; }

        @keyframes flashPop {
          0% { transform: scale(0.2); opacity: 0; }
          25% { transform: scale(1.4); opacity: 1; }
          100% { transform: scale(2.6); opacity: 0; }
        }
        .muzzle-flash {
          position: absolute; width: 70px; height: 70px; border-radius: 9999px;
          background: radial-gradient(circle, #FFF3C4 0%, #FFB347 35%, #9C3B2E 70%, transparent 75%);
          animation: flashPop 0.5s ease-out forwards;
        }

        @keyframes revealPop {
          0% { transform: scale(0.85); opacity: 0; }
          60% { transform: scale(1.03); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        .reveal-pop { animation: revealPop 0.4s ease-out forwards; }

        @keyframes searchlightSweep {
          0% { transform: translateX(-20%) rotate(-8deg); opacity: 0.35; }
          50% { transform: translateX(20%) rotate(6deg); opacity: 0.5; }
          100% { transform: translateX(-20%) rotate(-8deg); opacity: 0.35; }
        }
        .searchlight {
          position: absolute; top: -40%; left: 10%; width: 60%; height: 160%;
          background: radial-gradient(ellipse at center, rgba(255,240,200,0.15) 0%, transparent 60%);
          animation: searchlightSweep 9s ease-in-out infinite;
          pointer-events: none;
        }

        @keyframes smokeDrift {
          0% { transform: translateX(-10%) translateY(0); opacity: 0.15; }
          50% { transform: translateX(6%) translateY(-3%); opacity: 0.25; }
          100% { transform: translateX(-10%) translateY(0); opacity: 0.15; }
        }
        .smoke-layer {
          position: absolute; inset: -10%; pointer-events: none;
          background: radial-gradient(ellipse 40% 20% at 15% 80%, rgba(200,200,190,0.25), transparent 70%),
                      radial-gradient(ellipse 30% 15% at 80% 85%, rgba(200,200,190,0.2), transparent 70%);
          animation: smokeDrift 14s ease-in-out infinite;
        }

        .film-grain {
          position: absolute; inset: 0; pointer-events: none; opacity: 0.06; mix-blend-mode: overlay;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
        }

        .vignette {
          position: absolute; inset: 0; pointer-events: none;
          background: radial-gradient(ellipse at center, transparent 45%, rgba(0,0,0,0.55) 100%);
        }

        .flash-overlay {
          position: absolute; inset: 0; background: #FFF8E5; pointer-events: none;
          animation: flashOut 0.15s ease-out forwards;
        }
        @keyframes flashOut { from { opacity: 0.55; } to { opacity: 0; } }

        @keyframes titleFlicker {
          0%, 100% { opacity: 1; }
          92% { opacity: 1; }
          93% { opacity: 0.4; }
          94% { opacity: 1; }
          96% { opacity: 0.6; }
          97% { opacity: 1; }
        }
        .title-flicker { animation: titleFlicker 5s infinite; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .boot-in { animation: fadeUp 0.7s ease-out forwards; }
      `}</style>

      <div className="searchlight" />
      <div className="smoke-layer" />
      <div className="film-grain" />
      <div className="vignette" />
      {flash && <div className="flash-overlay" />}

      <div
        className={`relative z-10 w-full flex flex-col items-center px-3 sm:px-6 ${booted ? "boot-in" : "opacity-0"}`}
        style={{ paddingTop: "6%", paddingBottom: "6%" }}
      >
        <div className="flex flex-col items-center mb-2 sm:mb-4">
          <p
            className="text-center"
            style={{
              color: PAPER,
              fontSize: "clamp(0.55rem,2.2vw,0.8rem)",
              letterSpacing: "0.12em",
              marginTop: "0.35rem",
              fontWeight: 600,
              textShadow: "0 1px 4px rgba(0,0,0,0.35)",
            }}
          >
            THREE TARGETS. FIRE TO REVEAL THE PRIZE POOL.
          </p>
        </div>

        <div style={{ width: "100%", maxWidth: "52rem", display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: "2rem", marginTop: "1rem" }}>
          {PRIZES.map((prize, i) => (
            <Crate key={prize.code} index={i} prize={prize} status={statuses[i]} onFire={fire} />
          ))}
        </div>

        <div style={{ marginTop: "2rem", display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem" }}>
          <div style={{ color: KHAKI, fontSize: "clamp(0.55rem,2vw,0.75rem)", letterSpacing: "0.18em" }}>
            TARGETS ELIMINATED: {revealedCount} / {PRIZES.length}
          </div>
          <div className="w-40 sm:w-56 h-1 sm:h-1.5" style={{ background: "rgba(255,255,255,0.15)" }}>
            <div
              className="h-full"
              style={{ width: `${(revealedCount / PRIZES.length) * 100}%`, background: BRASS, transition: "width 0.4s ease" }}
            />
          </div>
          {allRevealed && (
            <div
              className="mt-1 reveal-pop text-center"
              style={{ color: RUST, fontSize: "clamp(0.6rem,2.4vw,0.85rem)", letterSpacing: "0.2em", fontWeight: 600 }}
            >
              ★ PRIZE POOL SECURED ★
            </div>
          )}
          <button
            onClick={reset}
            className="mt-2 flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2"
            style={{ background: "transparent", border: `1px solid ${KHAKI}`, color: KHAKI, fontSize: "clamp(0.5rem,1.8vw,0.7rem)", letterSpacing: "0.18em" }}
          >
            RESET MISSION
          </button>
        </div>
      </div>
    </section>
  );
}