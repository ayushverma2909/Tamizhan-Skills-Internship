import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

const Particle = () => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const options = useMemo(() => ({
    autoPlay: true,
    background: {
      color: { value: "#000" },
      image: "",
      position: "",
      repeat: "",
      size: "",
      opacity: 1
    },
    backgroundMask: {
      composite: "destination-out",
      cover: {
        opacity: 1,
        color: { value: "" }
      },
      enable: false
    },
    clear: true,
    defaultThemes: {},
    delay: 0,
    fullScreen: {
      enable: true,
      zIndex: -1
    },
    detectRetina: true,
    duration: 0,
    fpsLimit: 120,
    interactivity: {
      detectsOn: "window",
      events: {
        onClick: { enable: false, mode: [] },
        onDiv: {
          selectors: [],
          enable: false,
          mode: [],
          type: "circle"
        },
        onHover: {
          enable: true,
          mode: "trail",
          parallax: {
            enable: false,
            force: 2,
            smooth: 10
          }
        },
        resize: {
          delay: 0.5,
          enable: true
        }
      },
      modes: {
        trail: {
          delay: 0.005,
          pauseOnStop: true,
          quantity: 5,
          particles: {
            color: {
              value: "#ff0000",
              animation: {
                enable: true,
                speed: 400,
                sync: true
              }
            },
            collisions: { enable: false },
            links: { enable: false },
            move: {
              outModes: { default: "destroy" },
              speed: 2
            },
            size: {
              value: { min: 1, max: 5 },
              animation: {
                enable: true,
                speed: 5,
                sync: true,
                startValue: "min",
                destroy: "max"
              }
            }
          }
        }
      }
    },
    particles: {
      number: {
        value: 100,
        density: {
          enable: true,
          width: 1920,
          height: 1080
        }
      },
      color: {
        value: "#ff0000",
        animation: {
          h: { enable: true, speed: 50 },
          s: { enable: false },
          l: { enable: false }
        }
      },
      shape: { type: "circle" },
      opacity: {
        value: { min: 0.3, max: 0.8 },
        animation: {
          enable: true,
          speed: 0.5,
          sync: false,
          mode: "auto",
          startValue: "random"
        }
      },
      size: {
        value: { min: 1, max: 3 },
        animation: {
          enable: true,
          speed: 3,
          sync: false,
          mode: "auto",
          startValue: "random"
        }
      },
      move: {
        enable: true,
        speed: 2,
        direction: "none",
        outModes: {
          default: "out",
          bottom: "out",
          left: "out",
          right: "out",
          top: "out"
        }
      },
      links: {
        enable: true,
        distance: 100,
        color: { value: "random" },
        opacity: 1,
        width: 1
      }
    },
    pauseOnBlur: true,
    pauseOnOutsideViewport: true,
    zLayers: 100,
    motion: {
      disable: false,
      reduce: {
        factor: 27,
        value: true
      }
    }
  }), []);

  return init ? <Particles id="tsparticles" options={options} /> : null;
};

export default Particle;
