(function () {
  const TD = (window.TD = window.TD || {});
  class Effect {
    constructor(x, y, life, radius, color, mode) {
      this.x = x; this.y = y; this.life = life; this.maxLife = life; this.radius = radius; this.color = color; this.mode = mode || "burst"; this.alive = true;
    }
    update(dt) { this.life -= dt; if (this.life <= 0) this.alive = false; }
  }
  TD.Effect = Effect;
})();
