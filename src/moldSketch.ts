import type p5 from "p5";
import { Mold } from "./mold.ts";

let molds: Mold[] = [];
let num = 4000;
let d = 1;

export function moldSetup(p: p5) {
  p.angleMode(p.DEGREES);
  d = p.pixelDensity();

  for (let i = 0; i < num; i++) {
    molds[i] = new Mold(p, d);
  }

  // Optional: describe for accessibility if available
  if ((p as any).describe) {
    (p as any).describe(
      "This sketch simulates behaviors of slime molds. Each slime mold object has position (x and y), traveling direction (r and heading angle) and sensor (in 3 directions: front, left, and forward). As a slime mold moves through the trail, it leaves a trace and the trail map is updated. In each simulation step, a slime mold senses the trail map (the pixel color value) and decides which direction to move and rotate.",
      (p as any).LABEL,
    );
  }
}

export function moldDraw(p: p5) {
  p.background(0, 5);
  p.loadPixels();

  for (let i = 0; i < num; i++) {
    molds[i].update();
    molds[i].display();
  }
}
