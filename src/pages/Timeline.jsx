import React, { useState, useEffect, useRef } from "react";

const MAX_FRAMES = 250;

const EVENT_ROUNDS = [
  {
    id: "round-1",
    startFrame: 75,
    endFrame: 105,
    image: "/round1.png",
    title: "Round 01 - The Council of War",
  },
  {
    id: "round-2",
    startFrame: 140,
    endFrame: 170,
    image: "/round2.png",
    title: "Round 02 - The Frontline",
  },
  {
    id: "round-3",
    startFrame: 220,
    endFrame: 250,
    image: "/round3.png",
    title: "Final Round - The Decisive Strike",
  },
];

// Frame-bound opacity calculation (3-frame ramp in and out, zero time delay)
const getFrameOpacity = (currentFrame, startFrame, endFrame) => {
  if (currentFrame < startFrame || currentFrame > endFrame) return 0;
  const fadeLength = 3;
  if (currentFrame - startFrame < fadeLength) {
    return (currentFrame - startFrame + 1) / fadeLength;
  }
  if (endFrame - currentFrame < fadeLength) {
    return (endFrame - currentFrame + 1) / fadeLength;
  }
  return 1;
};

const Timeline = () => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const video1Ref = useRef(null);
  const video2Ref = useRef(null);
  const combinedVideoRef = useRef(null);

  const usingCombinedRef = useRef(true);
  const lastDrawnProgressRef = useRef(-1);

  const [currentFrame, setCurrentFrame] = useState(0);

  // Draw video frame to full viewport canvas with aspect-ratio cover fit
  const drawVideoToCanvas = (videoEl) => {
    const canvas = canvasRef.current;
    if (!canvas || !videoEl || videoEl.readyState < 2) return;

    const ctx = canvas.getContext("2d");
    const dpr = window.devicePixelRatio || 1;
    const canvasWidth = window.innerWidth;
    const canvasHeight = window.innerHeight;

    if (canvas.width !== canvasWidth * dpr || canvas.height !== canvasHeight * dpr) {
      canvas.width = canvasWidth * dpr;
      canvas.height = canvasHeight * dpr;
    }

    ctx.save();
    ctx.scale(dpr, dpr);

    const vWidth = videoEl.videoWidth || 1920;
    const vHeight = videoEl.videoHeight || 1080;

    const vAspect = vWidth / vHeight;
    const cAspect = canvasWidth / canvasHeight;

    let drawWidth, drawHeight, offsetX, offsetY;

    if (cAspect > vAspect) {
      drawWidth = canvasWidth;
      drawHeight = canvasWidth / vAspect;
      offsetX = 0;
      offsetY = (canvasHeight - drawHeight) / 2;
    } else {
      drawHeight = canvasHeight;
      drawWidth = canvasHeight * vAspect;
      offsetX = (canvasWidth - drawWidth) / 2;
      offsetY = 0;
    }

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.drawImage(videoEl, offsetX, offsetY, drawWidth, drawHeight);
    ctx.restore();
  };

  const updateFrame = (progress) => {
    const clampedProgress = Math.max(0, Math.min(1, progress));
    lastDrawnProgressRef.current = clampedProgress;

    // Direct calculation of frame 0 to 250
    const calcFrame = Math.min(MAX_FRAMES, Math.floor(clampedProgress * MAX_FRAMES));
    setCurrentFrame(calcFrame);

    const combinedVid = combinedVideoRef.current;
    const vid1 = video1Ref.current;
    const vid2 = video2Ref.current;

    // Direct 1:1 scroll-to-duration mapping for the trimmed 250-frame video
    if (
      usingCombinedRef.current &&
      combinedVid &&
      combinedVid.duration &&
      !isNaN(combinedVid.duration)
    ) {
      const targetTime = clampedProgress * combinedVid.duration;
      if (typeof combinedVid.fastSeek === "function") {
        combinedVid.fastSeek(targetTime);
      } else {
        combinedVid.currentTime = targetTime;
      }
      drawVideoToCanvas(combinedVid);
      return;
    }

    // Dual video fallback: Part 1 (frames 0..147) -> Part 2 (frames 147..250)
    if (calcFrame <= 147) {
      const part1Progress = calcFrame / 147;
      if (vid1 && vid1.duration && !isNaN(vid1.duration)) {
        const targetTime = part1Progress * vid1.duration;
        if (typeof vid1.fastSeek === "function") vid1.fastSeek(targetTime);
        else vid1.currentTime = targetTime;
        drawVideoToCanvas(vid1);
      }
    } else {
      const part2FrameIndex = calcFrame - 147;
      const part2Progress = part2FrameIndex / 147;
      if (vid2 && vid2.duration && !isNaN(vid2.duration)) {
        const targetTime = part2Progress * vid2.duration;
        if (typeof vid2.fastSeek === "function") vid2.fastSeek(targetTime);
        else vid2.currentTime = targetTime;
        drawVideoToCanvas(vid2);
      }
    }
  };

  useEffect(() => {
    let animId = null;

    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const totalScrollableDistance = rect.height - window.innerHeight;

      if (totalScrollableDistance <= 0) return;

      const currentScrollDistance = -rect.top;
      const rawProgress = currentScrollDistance / totalScrollableDistance;

      if (animId) cancelAnimationFrame(animId);
      animId = requestAnimationFrame(() => {
        updateFrame(rawProgress);
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (animId) cancelAnimationFrame(animId);
    };
  }, []);

  useEffect(() => {
    const vid1 = video1Ref.current;
    const vid2 = video2Ref.current;
    const combinedVid = combinedVideoRef.current;

    const onFrameUpdate = (e) => {
      drawVideoToCanvas(e.target);
    };

    [vid1, vid2, combinedVid].forEach((v) => {
      if (v) {
        v.addEventListener("seeked", onFrameUpdate);
        v.addEventListener("timeupdate", onFrameUpdate);
        v.addEventListener("loadedmetadata", onFrameUpdate);
        v.addEventListener("canplay", onFrameUpdate);
      }
    });

    return () => {
      [vid1, vid2, combinedVid].forEach((v) => {
        if (v) {
          v.removeEventListener("seeked", onFrameUpdate);
          v.removeEventListener("timeupdate", onFrameUpdate);
          v.removeEventListener("loadedmetadata", onFrameUpdate);
          v.removeEventListener("canplay", onFrameUpdate);
        }
      });
    };
  }, []);

  return (
    <section
      id="timeline"
      ref={containerRef}
      className="relative w-full h-[350vh] sm:h-[450vh] md:h-[500vh] bg-[#0d0b09]"
    >
      <video
        ref={combinedVideoRef}
        src="/timeline_250.mp4"
        preload="auto"
        muted
        playsInline
        className="hidden"
        onError={() => {
          usingCombinedRef.current = false;
        }}
      />
      <video
        ref={video1Ref}
        src="/part 1.mp4"
        preload="auto"
        muted
        playsInline
        className="hidden"
      />
      <video
        ref={video2Ref}
        src="/part 2.mp4"
        preload="auto"
        muted
        playsInline
        className="hidden"
      />

      {/* Sticky Viewport Container */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden bg-[#0d0b09] z-20">
        {/* Fullscreen Video Canvas */}
        <canvas
          ref={canvasRef}
          className="w-full h-full object-cover block pointer-events-none filter brightness-90 contrast-105"
        />

        {/* Dynamic Dark Vignette Overlay for Card Readability */}
        <div className="absolute inset-0 bg-radial from-transparent via-black/40 to-black/85 pointer-events-none" />

        {/* Centered Event Round Cards (Frame-Bound Opacity - Zero Time Lag) */}
        <div className="absolute inset-0 flex items-center justify-center p-3 sm:p-6 z-30 pointer-events-none">
          {EVENT_ROUNDS.map((round) => {
            const opacity = getFrameOpacity(currentFrame, round.startFrame, round.endFrame);
            if (opacity <= 0) return null;

            return (
              <img
                key={round.id}
                src={round.image}
                alt={round.title}
                style={{
                  opacity: opacity,
                  transform: `scale(${0.96 + opacity * 0.04})`,
                }}
                className="absolute w-[94vw] sm:w-[85vw] max-w-3xl max-h-[82vh] object-contain pointer-events-auto filter drop-shadow-[0_10px_30px_rgba(0,0,0,0.85)]"
              />
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default Timeline;
