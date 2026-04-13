(function () {
  const TD = (window.TD = window.TD || {});
  const MathUtil = TD.Math;

  function getTargetY(target) {
    return target && target.targetY != null ? target.targetY : target ? target.y : 0;
  }

  class Projectile {
    constructor(options) {
      this.x = options.x;
      this.y = options.y;
      this.target = options.target;
      this.speed = options.speed;
      this.damage = options.damage;
      this.type = options.type;
      this.radius = options.type === "cannon" ? 9 : options.type === "stone" ? 7 : 5;
      this.alive = true;
      this.splashRadius = options.splashRadius || 0;
      this.game = options.game;
    }
    update(dt) {
      if (!this.target || !this.target.alive) { this.alive = false; return; }
      const targetY = getTargetY(this.target) - 10;
      const angle = MathUtil.angleTo(this.x, this.y, this.target.x, targetY);
      this.x += Math.cos(angle) * this.speed * dt;
      this.y += Math.sin(angle) * this.speed * dt;
      if (MathUtil.distance(this.x, this.y, this.target.x, targetY) <= this.radius + this.target.radius * 0.7) this.hit();
    }
    hit() {
      if (!this.alive) return;
      this.alive = false;
      if (this.type === "cannon") {
        const hitX = this.target.x;
        const hitY = getTargetY(this.target);
        if (this.target.alive) this.target.takeDamage(this.damage);
        this.game.damageEnemiesInRadius(hitX, hitY, this.splashRadius, this.damage, this.target);
        this.game.spawnExplosion(hitX, hitY, this.splashRadius);
      } else {
        this.target.takeDamage(this.damage);
      }
      this.game.audio.playSFX("hit");
    }
  }
  TD.Projectile = Projectile;
})();
