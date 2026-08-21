"use client";

import { useEffect, useRef } from "react";

type Filament = {
  offset: number;
  amplitude: number;
  frequency: number;
  phase: number;
  speed: number;
  alpha: number;
  width: number;
};

const FILAMENTS: Filament[] = [
  { offset: -0.31, amplitude: 0.030, frequency: 2.3, phase: 0.2, speed: 0.00062, alpha: 0.22, width: 0.75 },
  { offset: -0.25, amplitude: 0.041, frequency: 2.8, phase: 1.2, speed: 0.00078, alpha: 0.30, width: 0.90 },
  { offset: -0.19, amplitude: 0.032, frequency: 3.4, phase: 2.6, speed: 0.00054, alpha: 0.24, width: 0.70 },
  { offset: -0.13, amplitude: 0.048, frequency: 2.6, phase: 3.8, speed: 0.00070, alpha: 0.38, width: 1.05 },
  { offset: -0.075, amplitude: 0.024, frequency: 3.7, phase: 0.8, speed: 0.00088, alpha: 0.34, width: 0.82 },
  { offset: -0.025, amplitude: 0.019, frequency: 4.1, phase: 4.5, speed: 0.00066, alpha: 0.46, width: 1.10 },
  { offset: 0.035, amplitude: 0.022, frequency: 3.9, phase: 2.1, speed: 0.00082, alpha: 0.44, width: 1.00 },
  { offset: 0.09, amplitude: 0.034, frequency: 3.2, phase: 5.4, speed: 0.00058, alpha: 0.35, width: 0.90 },
  { offset: 0.15, amplitude: 0.045, frequency: 2.5, phase: 1.7, speed: 0.00073, alpha: 0.36, width: 1.05 },
  { offset: 0.22, amplitude: 0.036, frequency: 3.0, phase: 4.1, speed: 0.00064, alpha: 0.26, width: 0.78 },
  { offset: 0.28, amplitude: 0.043, frequency: 2.2, phase: 3.0, speed: 0.00084, alpha: 0.25, width: 0.90 },
  { offset: 0.34, amplitude: 0.027, frequency: 3.5, phase: 5.8, speed: 0.00057, alpha: 0.18, width: 0.68 },
];

export function EnergyField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let reducedMotion = reducedMotionQuery.matches;
    let isVisible = true;
    let frameId: number | null = null;
    let width = 0;
    let height = 0;

    const pointOnFilament = (filament: Filament, progress: number, time: number) => {
      const sourceX = width * 0.405;
      const sourceY = height * 0.505;
      const spread = height * filament.offset * Math.pow(progress, 0.72);
      const broadWave = Math.sin(
        progress * filament.frequency * Math.PI * 2 + time * filament.speed + filament.phase,
      ) * height * filament.amplitude * (0.12 + progress * 0.88);
      const fineWave = Math.sin(progress * 12 + time * 0.0011 + filament.phase) * height * 0.0045 * progress;

      return {
        x: sourceX + (width * 1.06 - sourceX) * progress,
        y: sourceY + spread + broadWave + fineWave,
      };
    };

    const draw = (time: number) => {
      frameId = null;
      if (!width || !height) return;

      context.clearRect(0, 0, width, height);
      context.save();
      context.globalCompositeOperation = "lighter";
      context.lineCap = "round";
      context.lineJoin = "round";

      FILAMENTS.forEach((filament, index) => {
        context.beginPath();
        for (let step = 0; step <= 72; step += 1) {
          const progress = step / 72;
          const point = pointOnFilament(filament, progress, time);
          if (step === 0) context.moveTo(point.x, point.y);
          else context.lineTo(point.x, point.y);
        }

        const isHighlight = index === 3 || index === 5 || index === 8;
        context.strokeStyle = isHighlight
          ? `rgba(208, 166, 250, ${filament.alpha})`
          : `rgba(150, 98, 233, ${filament.alpha})`;
        context.lineWidth = filament.width;
        context.shadowColor = isHighlight ? "rgba(208, 166, 250, .55)" : "rgba(150, 98, 233, .45)";
        context.shadowBlur = isHighlight ? 9 : 6;
        context.stroke();

        if (!reducedMotion) {
          const particleProgress = (time * (0.00007 + index * 0.0000022) + index * 0.127) % 1;
          const particle = pointOnFilament(filament, particleProgress, time);
          const particleAlpha = 0.24 + Math.sin(particleProgress * Math.PI) * 0.58;
          context.beginPath();
          context.fillStyle = `rgba(226, 203, 255, ${particleAlpha})`;
          context.shadowColor = "rgba(208, 166, 250, .9)";
          context.shadowBlur = 14;
          context.arc(particle.x, particle.y, index % 3 === 0 ? 2.15 : 1.35, 0, Math.PI * 2);
          context.fill();
        }
      });

      if (!reducedMotion) {
        [3, 5, 8].forEach((filamentIndex, pulseIndex) => {
          const filament = FILAMENTS[filamentIndex];
          const headProgress = 0.06 + ((time * 0.000105 + pulseIndex * 0.31) % 0.94);
          const tailProgress = Math.max(0.015, headProgress - 0.15);
          const tail = pointOnFilament(filament, tailProgress, time);
          const head = pointOnFilament(filament, headProgress, time);
          const trail = context.createLinearGradient(tail.x, tail.y, head.x, head.y);
          trail.addColorStop(0, "rgba(150, 98, 233, 0)");
          trail.addColorStop(0.58, "rgba(150, 98, 233, .24)");
          trail.addColorStop(1, "rgba(238, 218, 255, .94)");

          context.beginPath();
          for (let step = 0; step <= 22; step += 1) {
            const progress = tailProgress + (headProgress - tailProgress) * (step / 22);
            const point = pointOnFilament(filament, progress, time);
            if (step === 0) context.moveTo(point.x, point.y);
            else context.lineTo(point.x, point.y);
          }
          context.strokeStyle = trail;
          context.lineWidth = pulseIndex === 1 ? 2.25 : 1.75;
          context.shadowColor = "rgba(208, 166, 250, .95)";
          context.shadowBlur = 18;
          context.stroke();

          context.beginPath();
          context.fillStyle = "rgba(246, 235, 255, .96)";
          context.shadowBlur = 22;
          context.arc(head.x, head.y, pulseIndex === 1 ? 3.1 : 2.5, 0, Math.PI * 2);
          context.fill();
        });
      }

      const sourceX = width * 0.405;
      const sourceY = height * 0.505;
      const beam = context.createLinearGradient(sourceX, sourceY, width, sourceY);
      beam.addColorStop(0, "rgba(245, 230, 255, .92)");
      beam.addColorStop(0.12, "rgba(208, 166, 250, .78)");
      beam.addColorStop(0.58, "rgba(150, 98, 233, .32)");
      beam.addColorStop(1, "rgba(103, 62, 168, 0)");
      context.beginPath();
      context.moveTo(sourceX, sourceY);
      context.lineTo(width, sourceY);
      context.strokeStyle = beam;
      context.lineWidth = 1.45;
      context.shadowColor = "rgba(208, 166, 250, .85)";
      context.shadowBlur = 13;
      context.stroke();

      const pulse = reducedMotion ? 0.45 : (Math.sin(time * 0.0022) + 1) / 2;
      context.beginPath();
      context.strokeStyle = `rgba(208, 166, 250, ${0.42 - pulse * 0.2})`;
      context.lineWidth = 1;
      context.shadowBlur = 10;
      context.arc(sourceX, sourceY, 5 + pulse * 7, 0, Math.PI * 2);
      context.stroke();
      context.beginPath();
      context.fillStyle = "rgba(245, 230, 255, .9)";
      context.arc(sourceX, sourceY, 2.4, 0, Math.PI * 2);
      context.fill();
      context.restore();

      if (!reducedMotion && isVisible) frameId = window.requestAnimationFrame(draw);
    };

    const start = () => {
      if (frameId === null && !reducedMotion && isVisible) frameId = window.requestAnimationFrame(draw);
    };

    const stop = () => {
      if (frameId !== null) window.cancelAnimationFrame(frameId);
      frameId = null;
    };

    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.75);
      width = bounds.width;
      height = bounds.height;
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      draw(reducedMotion ? 1200 : performance.now());
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);

    const visibilityObserver = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
      if (isVisible) start();
      else stop();
    });
    visibilityObserver.observe(canvas);

    const handleMotionPreference = (event: MediaQueryListEvent) => {
      reducedMotion = event.matches;
      stop();
      draw(1200);
      start();
    };
    reducedMotionQuery.addEventListener("change", handleMotionPreference);

    return () => {
      stop();
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      reducedMotionQuery.removeEventListener("change", handleMotionPreference);
    };
  }, []);

  return <canvas ref={canvasRef} className="hero-energy-canvas" aria-hidden="true" />;
}
