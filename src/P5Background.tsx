import React, { useEffect, useRef } from "react";
import type p5 from "p5";

interface P5BackgroundProps {
  setup?: (p: p5) => void;
  draw?: (p: p5) => void;
  frameRate?: number;
}

const P5Background: React.FC<P5BackgroundProps> = ({
  setup,
  draw,
  frameRate = 30,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let sketch: p5 | null = null;

    const loadSketch = async () => {
      const p5 = (await import("p5")).default;

      sketch = new p5((p: p5) => {
        p.setup = () => {
          const canvas = p.createCanvas(window.innerWidth, window.innerHeight);
          canvas.parent(containerRef.current!);
          p.frameRate(frameRate);

          if (setup) setup(p);
        };

        p.draw = () => {
          if (draw) draw(p);
        };

        p.windowResized = () => {
          p.resizeCanvas(window.innerWidth, window.innerHeight);
        };
      });
    };

    loadSketch();

    return () => {
      if (sketch) sketch.remove();
    };
  }, [setup, draw, frameRate]);

  const style: React.CSSProperties = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    zIndex: -1,
    overflow: "hidden",
  };

  return <div ref={containerRef} style={style} />;
};

export default P5Background;
