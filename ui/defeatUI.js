(function () {
  const TD = (window.TD = window.TD || {});
  class DefeatUI {
    constructor(game) {
      this.game = game;
      this.panel = document.getElementById("messagePanel");
      this.title = document.getElementById("messageTitle");
      this.subtitle = document.getElementById("messageSubtitle");
      this.restartBtn = document.getElementById("messageRestartBtn");
      this.stage = document.querySelector(".game-stage");
      this.card = document.getElementById("messageCard");
      this.restartBtn.addEventListener("click", () => this.game.restart());
    }
    show() {
      this.title.textContent = "DEFEAT";
      this.subtitle.textContent = "Your base has fallen";
      this.card.classList.remove("message-panel__card--victory");
      this.card.classList.add("message-panel__card--defeat");
      var image = this.game.assets && this.game.assets.images ? this.game.assets.images.panel_defeat : null;
      this.card.style.backgroundImage = image ? 'url("' + image.src + '")' : "";
      this.panel.classList.remove("hidden");
      this.stage.classList.remove("flash-defeat");
      void this.stage.offsetWidth;
      this.stage.classList.add("flash-defeat");
    }
    hide() {
      this.panel.classList.add("hidden");
      this.stage.classList.remove("flash-defeat");
      this.card.style.backgroundImage = "";
      this.card.classList.remove("message-panel__card--defeat");
    }
  }
  TD.DefeatUI = DefeatUI;
})();
