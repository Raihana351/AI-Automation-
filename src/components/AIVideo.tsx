import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize2, Settings, Sparkles, RefreshCw } from 'lucide-react';

interface AIVideoProps {
  videoSrc?: string;
}

export function AIVideo({ videoSrc = '/assets/ai-hero-video.mp4' }: AIVideoProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [hasVideoError, setHasVideoError] = useState(false);
  const [customSrc, setCustomSrc] = useState(videoSrc);
  const [showConfig, setShowConfig] = useState(false);
  const [progress, setProgress] = useState(24);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Play/pause toggle
  const togglePlay = () => {
    if (videoRef.current && !hasVideoError) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(() => {});
      }
      setIsPlaying(!isPlaying);
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  // Mute toggle
  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
    }
    setIsMuted(!isMuted);
  };

  // Fullscreen
  const toggleFullscreen = () => {
    const container = document.getElementById('ai-video-frame');
    if (!container) return;
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    } else {
      container.requestFullscreen().catch(() => {});
    }
  };

  // Real-time canvas neural animation when simulated/placeholder mode is active
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let time = 0;

    const render = () => {
      time += isPlaying ? 0.02 : 0;
      
      const w = canvas.offsetWidth || canvas.clientWidth || 0;
      const h = canvas.offsetHeight || canvas.clientHeight || 0;

      // Guard against zero-sized canvas before layout calculation finishes
      if (w <= 10 || h <= 10 || !Number.isFinite(w) || !Number.isFinite(h)) {
        animId = requestAnimationFrame(render);
        return;
      }

      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }

      // Dark cinematic backdrop
      const bgGrad = ctx.createLinearGradient(0, 0, w, h);
      bgGrad.addColorStop(0, '#040711');
      bgGrad.addColorStop(0.5, '#081126');
      bgGrad.addColorStop(1, '#02050E');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, w, h);

      // Flowing neural wave lines
      for (let j = 0; j < 5; j++) {
        ctx.beginPath();
        const yOffset = h * 0.5 + Math.sin(time + j) * 40;
        ctx.moveTo(0, yOffset);

        for (let x = 0; x < w; x += 15) {
          const y = yOffset + Math.sin(x * 0.008 + time * 1.5 + j * 0.8) * (25 + j * 12);
          ctx.lineTo(x, y);
        }

        ctx.strokeStyle = j % 2 === 0 ? 'rgba(56, 189, 248, 0.45)' : 'rgba(99, 102, 241, 0.35)';
        ctx.lineWidth = 2.5;
        ctx.stroke();
      }

      // Synapse glow nodes with guaranteed finite coordinates
      for (let i = 0; i < 18; i++) {
        const rawFraction = (i * 0.06 + Math.sin(time * 0.5 + i) * 0.04 + 0.05) % 1;
        const normalizedFraction = (rawFraction + 1) % 1;
        const nx = normalizedFraction * w;
        const ny = h * 0.5 + Math.sin(time * 1.2 + i * 2) * (50 + (i % 3) * 20);

        if (!Number.isFinite(nx) || !Number.isFinite(ny)) continue;

        const nodeGrad = ctx.createRadialGradient(nx, ny, 1, nx, ny, 14);
        nodeGrad.addColorStop(0, '#38BDF8');
        nodeGrad.addColorStop(0.4, 'rgba(14, 165, 233, 0.4)');
        nodeGrad.addColorStop(1, 'transparent');

        ctx.fillStyle = nodeGrad;
        ctx.beginPath();
        ctx.arc(nx, ny, 14, 0, Math.PI * 2);
        ctx.fill();
      }

      // Scanline grid
      ctx.fillStyle = 'rgba(255, 255, 255, 0.015)';
      for (let y = 0; y < h; y += 4) {
        ctx.fillRect(0, y, w, 1);
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animId);
  }, [isPlaying]);

  return (
    <section className="py-20 bg-[#05060A] relative" id="platform-demo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="text-xs font-semibold tracking-wider text-cyan-400 uppercase font-mono mb-2">
            CINEMATIC PREVIEW
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Intelligence in Motion
          </h2>
          <p className="text-sm sm:text-base text-slate-400 mt-3 text-balance">
            Watch autonomous AI agents orchestrate real-time cloud workflows and topological analytics at wire speed.
          </p>
        </div>

        {/* Video Player Container */}
        <div
          id="ai-video-frame"
          className="relative w-full aspect-[16/9] max-h-[640px] rounded-2xl overflow-hidden border border-slate-800/80 shadow-2xl bg-black group"
        >
          {/* Real video if accessible */}
          {!hasVideoError ? (
            <video
              ref={videoRef}
              src={customSrc}
              className="w-full h-full object-cover"
              autoPlay
              muted={isMuted}
              loop
              playsInline
              onError={() => setHasVideoError(true)}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
            />
          ) : null}

          {/* Procedural AI Cinema Canvas (Active fallback when local mp4 is not yet generated) */}
          <canvas
            ref={canvasRef}
            className={`w-full h-full object-cover absolute inset-0 ${hasVideoError ? 'block' : 'hidden'}`}
          />

          {/* Cinematic Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/40 pointer-events-none" />

          {/* Center Brand Hologram if fallback is playing */}
          {hasVideoError && (
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none p-6 text-center">
              <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center mb-4 backdrop-blur-sm">
                <Sparkles className="w-8 h-8 text-cyan-400" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-wide">
                NEXORA Autonomous Agent Stream
              </h3>
              <p className="text-xs sm:text-sm text-cyan-300/80 max-w-md mt-1">
                Real-Time Generative Simulation · Neural Layer Active
              </p>
            </div>
          )}

          {/* Player Controls Bar */}
          <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex flex-col gap-3 transition-opacity duration-300">
            {/* Progress Scrubber */}
            <div
              className="w-full h-1.5 bg-slate-800 rounded-full cursor-pointer overflow-hidden"
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const pct = Math.round(((e.clientX - rect.left) / rect.width) * 100);
                setProgress(pct);
              }}
            >
              <div
                className="h-full bg-gradient-to-r from-cyan-400 to-indigo-500 rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Buttons Row */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  onClick={togglePlay}
                  className="w-9 h-9 rounded-lg bg-white/10 hover:bg-white/20 text-white flex items-center justify-center backdrop-blur-md transition-colors"
                  aria-label={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                </button>

                <button
                  onClick={toggleMute}
                  className="w-9 h-9 rounded-lg bg-white/10 hover:bg-white/20 text-white flex items-center justify-center backdrop-blur-md transition-colors"
                  aria-label={isMuted ? 'Unmute' : 'Mute'}
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>

                <span className="text-xs font-mono text-slate-400">
                  00:{progress < 10 ? `0${progress}` : progress} / 01:00
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowConfig(!showConfig)}
                  className="px-2.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white text-xs font-medium backdrop-blur-md transition-colors flex items-center gap-1.5"
                  title="Configure Video Source"
                >
                  <Settings className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Source</span>
                </button>

                <button
                  onClick={toggleFullscreen}
                  className="w-9 h-9 rounded-lg bg-white/10 hover:bg-white/20 text-white flex items-center justify-center backdrop-blur-md transition-colors"
                  aria-label="Fullscreen"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Config popover */}
          {showConfig && (
            <div className="absolute top-4 right-4 z-20 w-80 p-4 rounded-xl bg-slate-900/95 border border-slate-700 shadow-2xl backdrop-blur-md text-xs">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-slate-200">Replace Video Media</span>
                <button
                  onClick={() => setShowConfig(false)}
                  className="text-slate-400 hover:text-white"
                >
                  ✕
                </button>
              </div>
              <p className="text-slate-400 mb-2">
                Default: <code className="text-cyan-400">/assets/ai-hero-video.mp4</code>
              </p>
              <input
                type="text"
                value={customSrc}
                onChange={(e) => setCustomSrc(e.target.value)}
                placeholder="Enter custom video URL or path..."
                className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-md text-white mb-2 focus:outline-none focus:border-cyan-500"
              />
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => {
                    setHasVideoError(false);
                    setShowConfig(false);
                  }}
                  className="px-3 py-1 bg-cyan-500 text-slate-950 font-medium rounded-md hover:bg-cyan-400"
                >
                  Apply
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
export default AIVideo;
