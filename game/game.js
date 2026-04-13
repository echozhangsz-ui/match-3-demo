(function () {
  const TD = (window.TD = window.TD || {});
  const MapConfig = TD.MapConfig;
  const WaveConfig = TD.WaveConfig;
  const GameState = TD.GameState;

  class Game {
    constructor(canvas, assets, options) {
      this.canvas = canvas;
      this.assets = assets || { images: {}, audio: {}, manifest: TD.AssetManifest };
      this.options = options || {};
      this.scene = this.options.scene || null;
      this.onSceneComplete = this.options.onSceneComplete || function () {};
      this.ctx = canvas.getContext("2d");
      this.canvas.width = MapConfig.width;
      this.canvas.height = MapConfig.height;
      this.audio = new TD.AudioManager(this.assets, this.scene);
      this.hud = new TD.HUDUI(this);
      this.waveUI = new TD.WaveUI();
      this.victoryUI = new TD.VictoryUI(this);
      this.defeatUI = new TD.DefeatUI(this);
      this.renderer = new TD.Renderer(this, this.ctx);
      this.loop = new TD.GameLoop((dt) => this.update(dt), () => this.render());
      this.removeMenu = document.getElementById("removeMenu");
      this.removeUnitBtn = document.getElementById("removeUnitBtn");
      this.selectedPlacedUnit = null;
      this.handleCanvasClick = this.handleCanvasClick.bind(this);
      this.handleRemoveClick = this.removeSelectedUnit.bind(this);
      if (this.removeUnitBtn) this.removeUnitBtn.addEventListener("click", this.handleRemoveClick);
      this.bindInput();
      this.resetGame();
    }

    resetGame() {
      this.state = GameState.MENU;
      this.gold = MapConfig.initialGold;
      this.life = MapConfig.baseLife;
      this.waveIndex = -1;
      this.selectedUnitType = "soldier";
      this.units = [];
      this.enemies = [];
      this.projectiles = [];
      this.effects = [];
      this.gridOccupancy = Array.from({ length: MapConfig.rows }, () => Array(MapConfig.cols).fill(null));
      this.spawnQueue = [];
      this.spawnTimer = 0;
      this.waveSpawning = false;
      this.baseHitTimer = 0;
      this.baseFlashTimer = 0;
      this.hideRemoveMenu();
      if (this.hud) this.hud.refreshSelection();
      if (this.victoryUI) this.victoryUI.hide();
      if (this.defeatUI) this.defeatUI.hide();
      this.audio.restartBGM();
    }

    bindInput() {
      this.canvas.addEventListener("click", this.handleCanvasClick);
    }

    handleCanvasClick(event) {
      this.audio.unlock();
      if (this.state === GameState.VICTORY || this.state === GameState.DEFEAT) return;
      const rect = this.canvas.getBoundingClientRect();
      const scaleX = this.canvas.width / rect.width;
      const scaleY = this.canvas.height / rect.height;
      const x = (event.clientX - rect.left) * scaleX;
      const y = (event.clientY - rect.top) * scaleY;
      this.tryPlaceUnit(x, y, event.clientX, event.clientY);
    }

    start() {
      this.loop.start();
    }

    destroy() {
      this.loop.stop();
      if (this.audio) this.audio.stopBGM();
      this.canvas.removeEventListener("click", this.handleCanvasClick);
      if (this.removeUnitBtn) this.removeUnitBtn.removeEventListener("click", this.handleRemoveClick);
      this.hideRemoveMenu();
      this.victoryUI.hide();
      this.defeatUI.hide();
    }

    canStartNextWave() {
      return this.state !== GameState.WAVE_START && this.state !== GameState.VICTORY && this.state !== GameState.DEFEAT && !this.waveSpawning && this.waveIndex < WaveConfig.length - 1 && (this.waveIndex < 0 || this.enemies.length === 0);
    }

    startNextWave() {
      if (!this.canStartNextWave()) return;
      this.hideRemoveMenu();
      this.waveIndex += 1;
      this.state = GameState.WAVE_START;
      this.audio.playSFX("wave_start");
      this.waveUI.play("Wave " + (this.waveIndex + 1), () => {
        this.prepareWaveSpawns();
        this.state = GameState.PLAYING;
      });
    }

    prepareWaveSpawns() {
      const wave = WaveConfig[this.waveIndex];
      this.spawnQueue = [];
      wave.entries.forEach((entry) => {
        for (let i = 0; i < entry.count; i += 1) this.spawnQueue.push({ type: entry.type, delay: entry.interval });
      });
      this.spawnTimer = 0;
      this.waveSpawning = true;
    }

    tryPlaceUnit(x, y, clientX, clientY) {
      const cell = this.findGridCell(x, y);
      if (!cell) {
        this.hideRemoveMenu();
        return;
      }
      const existing = this.gridOccupancy[cell.row][cell.col];
      if (existing) {
        this.showRemoveMenu(existing, clientX, clientY);
        return;
      }
      this.hideRemoveMenu();
      const config = TD.UnitConfig[this.selectedUnitType];
      if (this.gold < config.cost) return;
      this.gold -= config.cost;
      const unit = new TD.Unit(this, this.selectedUnitType, cell);
      this.units.push(unit);
      this.gridOccupancy[cell.row][cell.col] = unit;
      this.audio.playSFX("place");
    }

    showRemoveMenu(unit, clientX, clientY) {
      if (!this.removeMenu) return;
      this.selectedPlacedUnit = unit;
      const stage = this.canvas.closest(".game-stage");
      const stageRect = stage.getBoundingClientRect();
      const left = Math.max(56, Math.min(stageRect.width - 56, clientX - stageRect.left));
      const top = Math.max(64, Math.min(stageRect.height - 28, clientY - stageRect.top - 10));
      this.removeMenu.style.left = left + "px";
      this.removeMenu.style.top = top + "px";
      this.removeMenu.classList.remove("hidden");
    }

    hideRemoveMenu() {
      this.selectedPlacedUnit = null;
      if (this.removeMenu) this.removeMenu.classList.add("hidden");
    }

    removeSelectedUnit() {
      const unit = this.selectedPlacedUnit;
      if (!unit) return;
      this.units = this.units.filter((entry) => entry !== unit);
      if (unit.gridCell) this.gridOccupancy[unit.gridCell.row][unit.gridCell.col] = null;
      this.hideRemoveMenu();
    }

    findGridCell(x, y) {
      for (let rowIndex = 0; rowIndex < MapConfig.grid.length; rowIndex += 1) {
        for (let colIndex = 0; colIndex < MapConfig.grid[rowIndex].length; colIndex += 1) {
          const cell = MapConfig.grid[rowIndex][colIndex];
          if (TD.Math.distance(x, y, cell.x, cell.y) <= cell.radius) return cell;
        }
      }
      return null;
    }

    update(dt) {
      if (this.baseHitTimer > 0) this.baseHitTimer -= dt;
      if (this.baseFlashTimer > 0) this.baseFlashTimer -= dt;

      if (this.state === GameState.PLAYING) {
        this.updateSpawner(dt);
        this.units.forEach((unit) => unit.update(dt));
        this.enemies.forEach((enemy) => enemy.update(dt));
        this.projectiles.forEach((projectile) => projectile.update(dt));
        this.effects.forEach((effect) => effect.update(dt));
        this.cleanup();
        this.checkWaveEnd();
      } else if (this.state === GameState.MENU) {
        this.effects.forEach((effect) => effect.update(dt));
        this.cleanup();
      }
      this.hud.update();
    }

    updateSpawner(dt) {
      if (!this.waveSpawning) return;
      this.spawnTimer -= dt;
      if (this.spawnTimer > 0) return;
      const next = this.spawnQueue.shift();
      if (!next) {
        this.waveSpawning = false;
        return;
      }
      this.enemies.push(new TD.Enemy(this, next.type));
      this.spawnTimer = next.delay;
    }

    damageEnemiesInRadius(x, y, radius, damage, ignoredEnemy) {
      this.enemies.forEach((enemy) => {
        if (!enemy.alive || enemy === ignoredEnemy) return;
        const targetY = enemy.targetY != null ? enemy.targetY : enemy.y;
        if (TD.Math.distance(x, y, enemy.x, targetY) <= radius) enemy.takeDamage(damage);
      });
    }

    damageBase(amount) {
      if (this.state === GameState.DEFEAT || this.state === GameState.VICTORY) return;
      this.life -= amount;
      this.baseHitTimer = 0.35;
      this.baseFlashTimer = 0.22;
      this.spawnBurst(MapConfig.baseX, MapConfig.baseY, "#ff8b8b");
      this.audio.playSFX("base_hurt");
      if (this.life <= 0) {
        this.life = 0;
        this.state = GameState.DEFEAT;
        this.hideRemoveMenu();
        this.defeatUI.show();
        this.audio.playSFX("defeat");
        this.audio.setEndState(true);
      }
    }

    checkWaveEnd() {
      if (this.state !== GameState.PLAYING) return;
      if (!this.waveSpawning && this.spawnQueue.length === 0 && this.enemies.length === 0 && this.waveIndex >= WaveConfig.length - 1) {
        this.state = GameState.VICTORY;
        this.hideRemoveMenu();
        if (this.scene && this.scene.id) this.onSceneComplete(this.scene.id);
        this.victoryUI.show();
        this.audio.playSFX("victory");
        this.audio.setEndState(true);
      }
    }

    spawnExplosion(x, y, radius) {
      this.effects.push(new TD.Effect(x, y, 0.35, radius, "rgba(255, 211, 120, 0.95)", "explosion"));
    }

    spawnBurst(x, y, color) {
      this.effects.push(new TD.Effect(x, y, 0.22, 30, color || "rgba(255,255,255,0.85)", "burst"));
    }

    cleanup() {
      this.enemies = this.enemies.filter((enemy) => enemy.alive);
      this.projectiles = this.projectiles.filter((projectile) => projectile.alive);
      this.effects = this.effects.filter((effect) => effect.alive);
    }

    render() {
      this.renderer.render();
    }

    restart() {
      this.resetGame();
    }
  }

  TD.Game = Game;
})();
