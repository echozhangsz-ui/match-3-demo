(function () {
  const TD = (window.TD = window.TD || {});

  class WorldMapUI {
    constructor(onSelect, audio) {
      this.onSelect = onSelect;
      this.audio = audio || null;
      this.screen = document.getElementById("worldMapScreen");
      this.root = document.getElementById("worldMapNodes");
      this.hoveredNode = null;

      this.root.addEventListener("mouseover", (event) => {
        const button = event.target.closest(".world-node");
        if (!button || button === this.hoveredNode) return;
        this.hoveredNode = button;
        if (this.audio) this.audio.playSFX("ui_hover");
      });

      this.root.addEventListener("mouseleave", () => {
        this.hoveredNode = null;
      });

      this.root.addEventListener("click", (event) => {
        const button = event.target.closest(".world-node");
        if (!button) return;
        const sceneId = button.dataset.scene;
        const scene = TD.SceneConfig.scenes[sceneId];
        if (!scene || scene.state === "locked") return;
        if (this.audio) this.audio.playSFX("ui_click");
        if (this.onSelect) this.onSelect(sceneId);
      });
    }

    render() {
      Object.keys(TD.SceneConfig.scenes).forEach((sceneId) => {
        const scene = TD.SceneConfig.scenes[sceneId];
        const button = this.root.querySelector('[data-scene="' + sceneId + '"]');
        if (!button) return;
        button.classList.remove("world-node--locked", "world-node--unlocked", "world-node--completed");
        button.classList.add("world-node--" + scene.state);
        button.disabled = scene.state === "locked";
      });
    }

    show() {
      this.render();
      this.screen.classList.remove("hidden");
    }

    hide() {
      this.screen.classList.add("hidden");
    }
  }

  TD.WorldMapUI = WorldMapUI;
})();