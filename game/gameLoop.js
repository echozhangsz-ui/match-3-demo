(function () {
  const TD = (window.TD = window.TD || {});
  class GameLoop {
    constructor(update, render) { this.update = update; this.render = render; this.lastTime = 0; this.rafId = 0; this.tick = this.tick.bind(this); }
    start() { this.lastTime = performance.now(); this.rafId = requestAnimationFrame(this.tick); }
    stop() { if (this.rafId) cancelAnimationFrame(this.rafId); this.rafId = 0; }
    tick(timestamp) {
      const dt = Math.min(0.033, (timestamp - this.lastTime) / 1000);
      this.lastTime = timestamp;
      this.update(dt);
      this.render();
      this.rafId = requestAnimationFrame(this.tick);
    }
  }
  TD.GameLoop = GameLoop;
})();
