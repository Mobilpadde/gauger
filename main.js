import Gauger from "./gauger";

const gauges = new Array(1)
  .fill(0)
  .map((_, i) => new Gauger(`#gauger-${i + 1}`, 500, 15, ".inner", 0));

const draw = () => {
  gauges.forEach((g) => g.update().draw());
  window.requestAnimationFrame(draw);
};
window.requestAnimationFrame(draw);

let n = 5;
window.addEventListener("mousewheel", ({ deltaY }) => {
  n += deltaY > 0 ? -1 : 1;
  if (n > 59) n = 59.69;
  if (n < 0) n = 0;

  gauges.forEach((g) => g.set(n));
});

gauges.forEach((g) => g.set(n));
// setInterval(() => gauges.forEach((g) => g.set(Math.random() * 10)), 1000);
