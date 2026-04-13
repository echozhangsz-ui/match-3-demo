(function () {
  var bar = document.getElementById("statusBar");
  var canvas = document.getElementById("gameCanvas");
  var gameOverlay = document.getElementById("gameOverlay");
  var startHint = document.getElementById("startHint");
  var homeBtn = document.getElementById("homeBtn");

  function setStatus(text, className) {
    if (!bar) return;
    bar.textContent = text;
    bar.className = className || "status-bar";
  }

  function syncObject(target, source) {
    Object.keys(target).forEach(function (key) { delete target[key]; });
    Object.keys(source).forEach(function (key) {
      target[key] = Array.isArray(source[key]) ? source[key].slice() : source[key];
    });
  }

  function syncArray(target, source) {
    target.length = 0;
    source.forEach(function (item) { target.push(item); });
  }

  function applyScene(scene) {
    syncObject(window.TD.MapConfig, scene.map);
    syncArray(window.TD.WaveConfig, scene.waves);
  }

  function App(assets) {
    this.assets = assets;
    this.game = null;
    this.mapAudio = new window.TD.AudioManager(this.assets, { theme: "worldmap" });
    this.worldMap = new window.TD.WorldMapUI(this.startScene.bind(this), this.mapAudio);
    this.handleWorldMapClick = this.handleWorldMapClick.bind(this);
    document.getElementById("worldMapScreen").addEventListener("click", this.handleWorldMapClick);
    this.worldMap.show();
    this.showMap();
    homeBtn.addEventListener("click", this.showMap.bind(this));
  }

  App.prototype.handleWorldMapClick = function () {
    if (this.game) return;
    if (this.worldMap && this.worldMap.screen && this.worldMap.screen.classList.contains("hidden")) return;
    this.mapAudio.unlock();
  };

  App.prototype.showMap = function () {
    if (this.game) {
      this.game.destroy();
      this.game = null;
    }
    this.mapAudio.restartBGM();
    this.worldMap.render();
    this.worldMap.show();
    homeBtn.classList.add("hidden");
    gameOverlay.classList.add("hidden");
    startHint.classList.add("hidden");
    canvas.classList.add("hidden");
    setStatus("", "status-bar status-bar--ready hidden");
  };

  App.prototype.markCompleted = function (sceneId) {
    var scene = window.TD.SceneConfig.scenes[sceneId];
    if (scene && scene.state !== "locked") scene.state = "completed";
    this.worldMap.render();
  };

  App.prototype.startScene = function (sceneId) {
    var scene = window.TD.SceneConfig.scenes[sceneId];
    if (!scene || scene.state === "locked" || !scene.map) return;
    applyScene(scene);
    this.mapAudio.stopBGM();
    this.worldMap.hide();
    homeBtn.classList.remove("hidden");
    gameOverlay.classList.remove("hidden");
    startHint.classList.remove("hidden");
    canvas.classList.remove("hidden");
    setStatus("", "status-bar status-bar--ready");
    if (this.game) this.game.destroy();
    this.game = new window.TD.Game(canvas, this.assets, {
      scene: scene,
      onSceneComplete: this.markCompleted.bind(this)
    });
    this.game.start();
    this.game.audio.unlock();
  };

  try {
    setStatus("Loading assets...", "status-bar");
    var loader = new window.TD.AssetLoader(window.TD.AssetManifest);
    loader.loadAll().then(function (assets) {
      new App(assets);
      setStatus("", "status-bar status-bar--ready hidden");
    }).catch(function (error) {
      setStatus("Asset loading failed, using fallback art/audio.", "status-bar status-bar--error");
      new App({ images: {}, audio: {}, manifest: window.TD.AssetManifest });
      throw error;
    });
  } catch (error) {
    setStatus("Initialization failed: " + error.message, "status-bar status-bar--error");
    throw error;
  }
})();
