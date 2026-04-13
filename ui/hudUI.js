(function () {
  const TD = (window.TD = window.TD || {});
  const UnitConfig = TD.UnitConfig;
  const WaveConfig = TD.WaveConfig;

  function iconMarkup(type) {
    if (type === "soldier") {
      return '<svg viewBox="0 0 64 64" aria-hidden="true"><circle cx="32" cy="12" r="8" fill="#f1cfb3" stroke="#1c2430" stroke-width="3"/><path d="M32 20 L32 40 M32 26 L18 34 M32 26 L46 34 M32 40 L22 56 M32 40 L42 56" stroke="#1c2430" stroke-width="4" stroke-linecap="round"/><circle cx="49" cy="34" r="5" fill="#8a8a8a" stroke="#1c2430" stroke-width="2"/><path d="M22 18 L42 18 L38 30 L26 30 Z" fill="#547a3d" stroke="#1c2430" stroke-width="3" stroke-linejoin="round"/></svg>';
    }
    if (type === "archer") {
      return '<svg viewBox="0 0 64 64" aria-hidden="true"><circle cx="28" cy="12" r="8" fill="#f1cfb3" stroke="#1c2430" stroke-width="3"/><path d="M28 20 L28 40 M28 26 L16 34 M28 26 L40 30 M28 40 L20 56 M28 40 L38 56" stroke="#1c2430" stroke-width="4" stroke-linecap="round"/><path d="M18 18 L38 18 L34 30 L22 30 Z" fill="#4377a8" stroke="#1c2430" stroke-width="3" stroke-linejoin="round"/><path d="M44 18 Q56 30 44 48" fill="none" stroke="#1c2430" stroke-width="3" stroke-linecap="round"/><path d="M37 22 L51 42" stroke="#1c2430" stroke-width="2"/></svg>';
    }
    return '<svg viewBox="0 0 64 64" aria-hidden="true"><rect x="16" y="18" width="28" height="30" fill="#7f6652" stroke="#1c2430" stroke-width="3"/><path d="M12 18 L30 4 L48 18 Z" fill="#7f6652" stroke="#1c2430" stroke-width="3" stroke-linejoin="round"/><rect x="38" y="26" width="14" height="6" fill="#3f3f3f" stroke="#1c2430" stroke-width="2"/><rect x="24" y="8" width="6" height="10" fill="#ece8db" stroke="#1c2430" stroke-width="2"/></svg>';
  }

  function buttonAssetName(type) {
    return type === "soldier" ? "button_soldier" : type === "archer" ? "button_archer" : "button_tower";
  }

  class HUDUI {
    constructor(game) {
      this.game = game;
      this.goldValue = document.getElementById("goldValue");
      this.lifeValue = document.getElementById("lifeValue");
      this.waveValue = document.getElementById("waveValue");
      this.unitButtonsRoot = document.getElementById("unitButtons");
      this.nextWaveBtn = document.getElementById("nextWaveBtn");
      this.restartBtn = document.getElementById("restartBtn");
      this.startHint = document.getElementById("startHint");
      this.createUnitButtons();
      this.applyHudIcons();
      this.nextWaveBtn.addEventListener("click", () => { this.game.audio.unlock(); this.game.startNextWave(); });
      this.restartBtn.addEventListener("click", () => this.game.restart());
    }

    getImage(name) {
      return this.game.assets && this.game.assets.images ? this.game.assets.images[name] : null;
    }

    getSceneButtonAssetName(type) {
      const baseName = buttonAssetName(type);
      const theme = this.game.scene && this.game.scene.theme ? this.game.scene.theme : null;
      if (!theme) return baseName;
      const sceneName = theme + "_" + baseName;
      return this.getImage(sceneName) ? sceneName : baseName;
    }

    createUnitButtons() {
      this.unitButtonsRoot.innerHTML = "";
      Object.keys(UnitConfig).forEach((key) => {
        const unit = UnitConfig[key];
        const button = document.createElement("button");
        const assetName = this.getSceneButtonAssetName(unit.id);
        button.className = "unit-button unit-button--icon";
        button.dataset.unit = unit.id;
        button.title = unit.name + " - " + unit.cost;
        if (this.getImage(assetName)) {
          button.innerHTML = '<span class="unit-button__icon"><img src="' + this.getImage(assetName).src + '" alt="' + unit.name + ' icon"></span><span class="unit-button__name">' + unit.name + '</span><span class="unit-button__cost">' + unit.cost + '</span>';
        } else {
          button.innerHTML = '<span class="unit-button__icon">' + iconMarkup(unit.icon) + '</span><span class="unit-button__name">' + unit.name + '</span><span class="unit-button__cost">' + unit.cost + '</span>';
        }
        button.addEventListener("click", () => {
          this.game.audio.unlock();
          this.game.selectedUnitType = unit.id;
          this.refreshSelection();
        });
        this.unitButtonsRoot.appendChild(button);
      });
      this.refreshSelection();
    }

    applyHudIcons() {
      this.applyHudIcon("hudGoldIcon", "hud_gold");
      this.applyHudIcon("hudLifeIcon", "hud_life");
      this.applyHudIcon("hudWaveIcon", "hud_wave");
    }

    applyHudIcon(elementId, assetName) {
      const root = document.getElementById(elementId);
      const image = this.getImage(assetName);
      if (!root || !image) return;
      root.innerHTML = '<img src="' + image.src + '" alt="">';
      root.classList.add("hud__icon--image");
    }

    refreshSelection() {
      const buttons = this.unitButtonsRoot.querySelectorAll(".unit-button");
      buttons.forEach((button) => button.classList.toggle("active", button.dataset.unit === this.game.selectedUnitType));
    }

    update() {
      this.goldValue.textContent = String(this.game.gold);
      this.lifeValue.textContent = String(this.game.life);
      this.waveValue.textContent = String(Math.max(0, this.game.waveIndex + 1)) + " / " + WaveConfig.length;
      this.nextWaveBtn.disabled = !this.game.canStartNextWave();
      this.startHint.style.display = this.game.waveIndex < 0 ? "block" : "none";
    }
  }

  TD.HUDUI = HUDUI;
})();
