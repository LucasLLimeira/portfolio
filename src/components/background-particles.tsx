"use client";

import { useEffect, useMemo, useState } from "react";

import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { ISourceOptions } from "@tsparticles/engine";

export function BackgroundParticles() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    void initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setIsReady(true);
    });
  }, []);

  const options: ISourceOptions = useMemo(
    () => ({
      fpsLimit: 60,
      detectRetina: true,
      fullScreen: {
        enable: false,
      },
      particles: {
        number: {
          value: 62,
          density: {
            enable: true,
            width: 1200,
            height: 800,
          },
        },
        color: {
          value: ["#c6dcff", "#8ab6ff", "#5f93f0"],
        },
        opacity: {
          value: { min: 0.16, max: 0.48 },
        },
        size: {
          value: { min: 1, max: 3.2 },
        },
        move: {
          enable: true,
          speed: 0.75,
          random: false,
          direction: "none",
          outModes: {
            default: "out",
          },
        },
        links: {
          enable: true,
          distance: 160,
          opacity: 0.15,
          color: "#8ab6ff",
          width: 1,
        },
      },
      interactivity: {
        events: {
          onHover: {
            enable: true,
            mode: "grab",
          },
          resize: {
            enable: true,
          },
        },
        modes: {
          grab: {
            distance: 150,
            links: {
              opacity: 0.28,
            },
          },
        },
      },
      background: {
        color: {
          value: "transparent",
        },
      },
    }),
    [],
  );

  if (!isReady) return null;

  return (
    <div className="pointer-events-none fixed inset-0 -z-10">
      <Particles id="portfolio-particles" options={options} className="h-full w-full" />
    </div>
  );
}
