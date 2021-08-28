export default class Gauger {
  constructor(id, sz, thick, number = null, fixed = 0) {
    this.e = document.querySelector(id);
    const c = document.createElement("canvas");
    const ctx = (this.ctx = c.getContext("2d"));

    if (number) {
      this.number = this.e.querySelector(number);
    }

    c.width = sz;
    c.height = sz / 2;

    ctx.translate(sz / 2, sz / 2);
    ctx.rotate(Math.PI);
    ctx.translate(-sz / 2, -sz / 2);

    this.e.appendChild(c);

    this.sz = sz;
    this.now = [0];
    this.to = [0];
    this.lw = thick;
    this.fix = fixed;
  }

  on(e, fn) {
    this.e.addEventListener(e, fn);
    return this;
  }

  off(e, fn) {
    this.e.removeEventListener(e, fn);
    return this;
  }

  set(n) {
    this.to = [n];

    while (n > Math.PI) {
      n -= Math.PI;
      this.to.push(n);
    }

    return this;
  }

  update() {
    const { number, fix, now, to } = this;

    if (now[0] < to[0]) {
      this.now = [now[0]];
      this.now[0] += (to[0] - now[0]) / (Math.PI * 2);

      let n = this.now[0];
      while (n > Math.PI) {
        this.now.push(n);
        n -= Math.PI;
      }
      this.now.push(n);
    } else if (now[0] > to[0]) {
      this.now = [now[0]];
      this.now[0] += (to[0] - now[0]) / (Math.PI * 2);

      let n = this.now[0];
      while (n > Math.PI) {
        this.now.push(n);
        n -= Math.PI;
      }
      this.now.push(n);
    }

    if (number) {
      number.innerText = Math.round(this.now[0]).toFixed(fix);
    }

    return this;
  }

  draw() {
    const { ctx, sz, now, lw } = this;
    ctx.clearRect(0, 0, sz, sz);

    const len = now.length;
    const hue = 360 / len;
    now.forEach((n, i) => {
      if (i > 0) {
        ctx.beginPath();
        ctx.arc(sz / 2, sz / 2, sz / 2 - (lw * i - i * 2), 0, n);

        ctx.lineWidth = lw;
        ctx.strokeStyle = `hsl(${hue * (i - 1)}, 85%, 75%)`;
        ctx.stroke();
      }
    });

    return this;
  }
}
