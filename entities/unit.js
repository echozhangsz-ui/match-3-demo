(function () {
  const TD = (window.TD = window.TD || {});
  const MathUtil = TD.Math;
  const UnitConfig = TD.UnitConfig;

  class Unit {
    constructor(game, type, gridCell) {
      this.game = game;
      this.type = type;
      this.config = UnitConfig[type];
      this.gridCell = gridCell;
      this.x = gridCell.x;
      this.y = gridCell.y + (type === "tower" ? -8 : -12);
      this.cooldownLeft = 0;
      this.range = this.config.height * this.config.rangeFactor;
      if (this.game.scene && this.game.scene.theme === "beach" && this.type === "tower") this.range *= 0.5;
      this.bodyHeight = this.config.height;
      this.attackAnim = 0;
      this.idleTime = Math.random() * Math.PI * 2;
      this.attackPulse = 0;
      this.facing = 1;
      this.currentTarget = null;
    }

    update(dt) {
      this.idleTime += dt * 2.8;
      if (this.cooldownLeft > 0) this.cooldownLeft -= dt;
      if (this.attackAnim > 0) this.attackAnim = Math.max(0, this.attackAnim - dt * 2.4);
      this.attackPulse = Math.sin((1 - this.attackAnim) * Math.PI);

      const target = this.findTarget();
      this.currentTarget = target || null;
      if (!target) this.attackAnim = 0;
      if (target && Math.abs(target.x - this.x) > 4) this.facing = target.x < this.x ? -1 : 1;
      if (target && this.cooldownLeft <= 0) {
        this.attack(target);
        this.cooldownLeft = this.config.cooldown;
      }
    }

    findTarget() {
      let best = null;
      let bestX = -Infinity;
      for (const enemy of this.game.enemies) {
        if (!enemy.alive) continue;
        if (enemy.flying && !this.config.canTargetFlying) continue;
        const targetY = enemy.targetY != null ? enemy.targetY : enemy.y;
        const distance = MathUtil.distance(this.x, this.y, enemy.x, targetY);
        if (distance <= this.range && enemy.x > bestX) {
          best = enemy;
          bestX = enemy.x;
        }
      }
      return best;
    }

    attack(target) {
      this.attackAnim = 1;
      const facing = this.type === "tower" ? 1 : (this.facing || 1);
      this.game.projectiles.push(new TD.Projectile({
        x: this.x + ((this.type === "tower" ? 18 : 10) * facing),
        y: this.y - (this.type === "tower" ? (this.game.scene && this.game.scene.theme === "beach" ? 80 : 50) : 34),
        target,
        speed: this.config.projectileSpeed,
        damage: this.config.damage,
        type: this.config.projectileType,
        splashRadius: this.config.splashRadius,
        game: this.game
      }));
      const sfxMap = { stone: "throw", arrow: "arrow", cannon: "cannon" };
      this.game.audio.playSFX(sfxMap[this.config.projectileType]);
    }
  }

  TD.Unit = Unit;
})();
