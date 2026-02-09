import React, { useCallback } from "react";
import type p5 from "p5";
import P5Background from "./P5Background";

interface SketchState {
  x: number;
  speed: number;
}

const App: React.FC = () => {
  const state: SketchState = { x: 0, speed: 0 };

  const setup = useCallback((p: p5) => {
    state.x = p.width / 2;
    state.speed = p.width * 0.005;
  }, []);

  const draw = useCallback((p: p5) => {
    const radius = Math.min(p.width, p.height) * 0.05;

    state.x += state.speed;
    if (state.x + radius > p.width || state.x - radius < 0) {
      state.speed = -state.speed;
      state.x = Math.max(radius, Math.min(state.x, p.width - radius));
    }

    p.background(255, 120, 20);
    p.noStroke();
    p.fill(255);
    p.ellipse(state.x, p.height / 2, radius * 2);
  }, []);

  return (
    <div>
      <P5Background setup={setup} draw={draw} frameRate={30} />
      <div style={{ position: "relative", zIndex: 1, padding: "2rem" }}>
        <h1 style={{ color: "white" }}>Your website content here</h1>
      </div>
    </div>
  );
};

export default App;
