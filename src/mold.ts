import type p5 from "p5";

export class Mold {
  p: p5;
  d: number;
  x: number;
  y: number;
  r: number;
  heading: number;
  vx: number;
  vy: number;
  rotAngle: number;

  rSensorPos: p5.Vector;
  lSensorPos: p5.Vector;
  fSensorPos: p5.Vector;
  sensorAngle: number;
  sensorDist: number;

  constructor(p: p5, d: number) {
    this.p = p;
    this.d = d;

    this.x = p.random(p.width / 2 - 20, p.width / 2 + 20);
    this.y = p.random(p.height / 2 - 20, p.height / 2 + 20);
    this.r = 0.5;

    this.heading = p.random(360);
    this.vx = p.cos(this.heading);
    this.vy = p.sin(this.heading);
    this.rotAngle = 45;

    this.rSensorPos = p.createVector(0, 0);
    this.lSensorPos = p.createVector(0, 0);
    this.fSensorPos = p.createVector(0, 0);
    this.sensorAngle = 45;
    this.sensorDist = 10;
  }

  update() {
    const p = this.p;
    this.vx = p.cos(this.heading);
    this.vy = p.sin(this.heading);

    this.x = (this.x + this.vx + p.width) % p.width;
    this.y = (this.y + this.vy + p.height) % p.height;

    this.getSensorPos(this.rSensorPos, this.heading + this.sensorAngle);
    this.getSensorPos(this.lSensorPos, this.heading - this.sensorAngle);
    this.getSensorPos(this.fSensorPos, this.heading);

    const pixels = p.pixels as number[];

    let index: number;
    let l = 0,
      r = 0,
      f = 0;

    index =
      4 * (this.d * Math.floor(this.rSensorPos.y)) * (this.d * p.width) +
      4 * (this.d * Math.floor(this.rSensorPos.x));
    r = pixels[index] ?? 0;

    index =
      4 * (this.d * Math.floor(this.lSensorPos.y)) * (this.d * p.width) +
      4 * (this.d * Math.floor(this.lSensorPos.x));
    l = pixels[index] ?? 0;

    index =
      4 * (this.d * Math.floor(this.fSensorPos.y)) * (this.d * p.width) +
      4 * (this.d * Math.floor(this.fSensorPos.x));
    f = pixels[index] ?? 0;

    if (f > l && f > r) {
      this.heading += 0;
    } else if (f < l && f < r) {
      if (p.random(1) < 0.5) {
        this.heading += this.rotAngle;
      } else {
        this.heading -= this.rotAngle;
      }
    } else if (l > r) {
      this.heading += -this.rotAngle;
    } else if (r > l) {
      this.heading += this.rotAngle;
    }
  }

  display() {
    const p = this.p;
    p.noStroke();
    p.fill(255);
    p.ellipse(this.x, this.y, this.r * 2, this.r * 2);
  }

  getSensorPos(sensor: p5.Vector, angle: number) {
    const p = this.p;
    sensor.x = (this.x + this.sensorDist * p.cos(angle) + p.width) % p.width;
    sensor.y = (this.y + this.sensorDist * p.sin(angle) + p.height) % p.height;
  }
}
