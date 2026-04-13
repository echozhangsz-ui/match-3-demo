(function () {
  const TD = (window.TD = window.TD || {});
  const MapConfig = TD.MapConfig;
  const EnemyConfig = TD.EnemyConfig;

  function buildSegments(points) {
    const segments = [];
    let totalLength = 0;
    for (let i = 0; i < points.length - 1; i += 1) {
      const from = points[i];
      const to = points[i + 1];
      const length = Math.hypot(to.x - from.x, to.y - from.y);
      segments.push({ from: from, to: to, length: length });
      totalLength += length;
    }
    return { segments: segments, totalLength: totalLength };
  }

  function getPointAt(pathData, distance) {
    let remaining = distance;
    for (let i = 0; i < pathData.segments.length; i += 1) {
      const segment = pathData.segments[i];
      if (remaining <= segment.length) {
        const t = segment.length === 0 ? 0 : remaining / segment.length;
        return {
          x: segment.from.x + (segment.to.x - segment.from.x) * t,
          y: segment.from.y + (segment.to.y - segment.from.y) * t
        };
      }
      remaining -= segment.length;
    }
    return MapConfig.pathPoints[MapConfig.pathPoints.length - 1];
  }

  class Enemy {
    constructor(game, type) {
      const config = EnemyConfig[type];
      this.game = game;
      this.type = type;
      this.config = config;
      this.radius = config.radius;
      this.maxHealth = config.maxHealth;
      this.health = config.maxHealth;
      this.speed = config.speed;
      this.reward = config.reward;
      this.alive = true;
      this.progress = 0;
      this.moveCycle = Math.random() * Math.PI * 2;
      this.walkBob = 0;
      this.legSwing = 0;
      this.bodyTilt = 0;
      this.wingSwing = 0;
      this.spawnAnim = 0.32;
      this.flying = !!config.flying;
      this.altitude = config.altitude || 0;
      this.pathData = buildSegments(MapConfig.pathPoints);
      const start = getPointAt(this.pathData, 0);
      this.x = start.x;
      this.y = start.y;
      this.targetY = this.flying ? start.y - this.altitude : start.y;
    }

    update(dt) {
      if (!this.alive) return;
      if (this.spawnAnim > 0) this.spawnAnim = Math.max(0, this.spawnAnim - dt);
      this.progress += this.speed * dt;

      let cadence;
      if (this.flying) cadence = this.type === "gull" ? 3.1 : 2.8;
      else if (this.type === "hermit") cadence = 1.8;
      else if (this.type === "crab") cadence = 1.55;
      else if (this.type === "blackcat") cadence = 1.45;
      else if (this.type === "octopus") cadence = 0.95;
      else if (this.type === "seal") cadence = 0.9;
      else if (this.type === "monkey") cadence = 1.5;
      else if (this.type === "boar") cadence = 1.05;
      else if (this.type === "gorilla") cadence = 0.88;
      else cadence = 1.45;
      this.moveCycle += dt * cadence;

      if (this.flying) {
        this.walkBob = Math.sin(this.moveCycle * 1.2) * 3;
        this.legSwing = 0;
        this.wingSwing = Math.sin(this.moveCycle * 6.2) * 14;
        this.bodyTilt = Math.sin(this.moveCycle * 1.0) * 0.05;
      } else {
        let legFrequency;
        let legAmplitude;
        if (this.type === "hermit") {
          legFrequency = 11.5;
          legAmplitude = 7;
        } else if (this.type === "crab") {
          legFrequency = 10;
          legAmplitude = 6.5;
        } else if (this.type === "blackcat") {
          legFrequency = 8.6;
          legAmplitude = 6;
        } else if (this.type === "octopus") {
          legFrequency = 6.2;
          legAmplitude = 4.6;
        } else if (this.type === "seal") {
          legFrequency = 3.2;
          legAmplitude = 1.6;
        } else if (this.type === "bear") {
          legFrequency = 6;
          legAmplitude = 5.5;
        } else if (this.type === "gorilla") {
          legFrequency = 4.4;
          legAmplitude = 6;
        } else {
          legFrequency = 8.5;
          legAmplitude = 5.5;
        }
        this.walkBob = this.type === "seal" ? Math.sin(this.moveCycle * 0.7) * 1.2 : Math.sin(this.moveCycle * 0.7) * 0.28;
        this.legSwing = Math.sin(this.moveCycle * legFrequency) * legAmplitude;
        this.wingSwing = 0;
        this.bodyTilt = this.type === "seal" ? Math.sin(this.moveCycle * 0.6) * 0.035 : Math.sin(this.moveCycle * 0.4) * 0.02;
      }

      if (this.progress >= this.pathData.totalLength) {
        this.alive = false;
        this.game.damageBase(this.config.baseDamage || 1);
        return;
      }
      const point = getPointAt(this.pathData, this.progress);
      this.x = point.x;
      this.y = point.y;
      this.targetY = this.flying ? point.y - this.altitude + this.walkBob : point.y;
    }

    takeDamage(amount) {
      if (!this.alive) return;
      this.health -= amount;
      if (this.health <= 0) {
        this.alive = false;
        this.game.gold += this.reward;
        this.game.audio.playSFX("enemy_die");
        this.game.spawnBurst(this.x, this.targetY, "#ffffff");
      }
    }
  }

  TD.Enemy = Enemy;
})();
