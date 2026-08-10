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
  const combinedVideoRef = useRef(null);

  const [currentFrame, setCurrentFrame] = useState(0);
  const [imagesReady, setImagesReady] = useState(false);

  // Preloaded frame image objects array for 60FPS zero-lag canvas rendering
  const framesRef = useRef([]);
  const lastDrawnProgressRef = useRef(-1);

  // Preload all 250 frame images on component mount
  useEffect(() => {
    let loadedCount = 0;
    const images = [];

    for (let i = 1; i <= MAX_FRAMES; i++) {
      const img = new Image();
      const padNum = String(i).padStart(3, "0");
      img.src = `/timeline_frames/frame_${padNum}.jpg`;

      img.onload = () => {
        loadedCount++;
        if (loadedCount >= MAX_FRAMES * 0.3 && !imagesReady) {
          setImagesReady(true);
        }
      };
      images.push(img);
    }
    framesRef.current = images;
  }, []);

  // Fast canvas draw function supporting both preloaded Image frames & HTML5 Video fallback
  const drawSourceToCanvas = (sourceEl) => {
    const canvas = canvasRef.current;
    if (!canvas || !sourceEl) return;

    const isVideo = sourceEl instanceof HTMLVideoElement;
    if (isVideo && sourceEl.readyState < 2) return;

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

    const srcWidth = isVideo
      ? sourceEl.videoWidth || 1920
      : sourceEl.naturalWidth || 1920;
    const srcHeight = isVideo
      ? sourceEl.videoHeight || 1080
      : sourceEl.naturalHeight || 1080;

    const vAspect = srcWidth / srcHeight;
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
    ctx.drawImage(sourceEl, offsetX, offsetY, drawWidth, drawHeight);
    ctx.restore();
  };

  const updateFrame = (progress) => {
    const clampedProgress = Math.max(0, Math.min(1, progress));
    lastDrawnProgressRef.current = clampedProgress;

    const frameIdx = Math.min(MAX_FRAMES - 1, Math.floor(clampedProgress * MAX_FRAMES));
    setCurrentFrame(frameIdx + 1);

    // 1. Primary Engine: Instant RAM Image Frame Draw (< 0.1ms execution time)
    const cachedImg = framesRef.current[frameIdx];
    if (cachedImg && cachedImg.complete && cachedImg.naturalWidth > 0) {
      drawSourceToCanvas(cachedImg);
      return;
    }

    // 2. Nearest Loaded Frame Fallback
    for (let offset = 1; offset < 10; offset++) {
      const prev = framesRef.current[frameIdx - offset];
      if (prev && prev.complete && prev.naturalWidth > 0) {
        drawSourceToCanvas(prev);
        break;
      }
      const next = framesRef.current[frameIdx + offset];
      if (next && next.complete && next.naturalWidth > 0) {
        drawSourceToCanvas(next);
        break;
      }
    }

    // 3. HTML5 Video Fallback
    const combinedVid = combinedVideoRef.current;
    if (combinedVid && combinedVid.duration && !isNaN(combinedVid.duration)) {
      combinedVid.currentTime = clampedProgress * combinedVid.duration;
      drawSourceToCanvas(combinedVid);
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
  }, [imagesReady]);

  return (
    <section
      id="timeline"
      ref={containerRef}
      className="relative w-full h-[350vh] sm:h-[450vh] md:h-[500vh] bg-[#0d0b09] -mt-1"
    >
      {/* Hidden Fallback Video */}
      <video
        ref={combinedVideoRef}
        src="/timeline_250.mp4"
        preload="auto"
        muted
        playsInline
        className="hidden"
      />

      {/* Sticky Viewport Container */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden bg-[#0d0b09] z-20">
        {/* Fullscreen High-Performance Frame Canvas */}
        <canvas
          ref={canvasRef}
          className="w-full h-full object-cover block pointer-events-none filter brightness-90 contrast-105"
        />

        {/* Dynamic Dark Vignette Overlay for Card Readability */}
        <div className="absolute inset-0 bg-radial from-transparent via-black/40 to-black/85 pointer-events-none" />

        {/* Top Fade Blend from Hero Section */}
        <div className="absolute top-0 left-0 w-full h-32 md:h-48 bg-gradient-to-b from-[#0d0b09] via-[#0d0b09]/75 to-transparent pointer-events-none z-25" />

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
