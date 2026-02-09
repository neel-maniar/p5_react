import React, { useCallback } from "react";
import type p5 from "p5";
import P5Background from "./P5Background";
import { moldSetup, moldDraw } from "./moldSketch.ts";

const App: React.FC = () => {
  const setup = useCallback((p: p5) => {
    moldSetup(p);
  }, []);

  const draw = useCallback((p: p5) => {
    moldDraw(p);
  }, []);

  return (
    <div>
      <P5Background setup={setup} draw={draw} frameRate={30} />
      <div style={{ position: "relative", zIndex: 1, padding: "2rem" }}>
        <h1 style={{ color: "black" }}>Your website content here</h1>
      </div>
    </div>
  );
};

export default App;
