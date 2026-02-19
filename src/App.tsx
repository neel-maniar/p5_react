import React, { useCallback } from "react";
import type p5 from "p5";
import P5Background from "./P5Background";
import Vector2 from "./Vector2";

interface Particle {
  pos: Vector2;
  vel: Vector2;
}

interface SketchState {
  particles: Particle[];
}

const App: React.FC = () => {
  const state: SketchState = {particles:[
      {pos: new Vector2(0, 0), vel: new Vector2(1,1)},
      {pos: new Vector2(0, 0), vel: new Vector2(1,1)}
  ]};

  const setup = useCallback((p: p5) => {
    state.particles.forEach(particle => {
      const angle = p.random() * 2 * p.PI
      const direction = new Vector2(p.cos(angle), p.sin(angle));
      const magnitude = 4;
      // const direction: Vector2 = 
      particle.pos.x = p.width / 2;
      particle.pos.y = p.height / 2;
      particle.vel = direction.scale(magnitude);
    });
  }, []);

  const draw = useCallback((p: p5) => {
    const radius = Math.min(p.width, p.height) * 0.05;


    p.background(255, 120, 20);
    p.noStroke();
    p.fill(255);

    for (let i = 0; i < state.particles.length; i++) {
      state.particles[i].pos = Vector2.add(state.particles[i].pos, state.particles[i].vel);

      if (state.particles[i].pos.x > p.width && state.particles[i].vel.x > 0) {
        state.particles[i].vel.x = -state.particles[i].vel.x
      }

      if (state.particles[i].pos.x < 0 && state.particles[i].vel.x < 0) {
        state.particles[i].vel.x = -state.particles[i].vel.x
      }

      if (state.particles[i].pos.y > p.height && state.particles[i].vel.y > 0) {
        state.particles[i].vel.y = -state.particles[i].vel.y
      }

      if (state.particles[i].pos.y < 0 && state.particles[i].vel.y < 0) {
        state.particles[i].vel.y = -state.particles[i].vel.y
      }
      p.ellipse(state.particles[i].pos.x, state.particles[i].pos.y, radius * 2);
    }
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
