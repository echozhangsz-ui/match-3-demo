(function () {
  const TD = (window.TD = window.TD || {});

  class VictoryUI {
    constructor(game) {
      this.game = game;
      this.panel = document.getElementById("messagePanel");
      this.title = document.getElementById("messageTitle");
      this.subtitle = document.getElementById("messageSubtitle");
      this.restartBtn = document.getElementById("messageRestartBtn");
      this.card = document.getElementById("messageCard");
      this.confettiLayer = null;
      this.restartBtn.addEventListener("click", () => this.game.restart());
    }

    ensureConfetti() {
      if (this.confettiLayer) return;
      this.confettiLayer = document.createElement("div");
      this.confettiLayer.className = "victory-confetti";
      for (var i = 0; i < 28; i += 1) {
        var piece = document.createElement("span");
        piece.className = "victory-confetti__piece";
        piece.style.left = (6 + (i % 14) * 6.6) + "%";
        piece.style.animationDelay = (i * 0.045) + "s";
        piece.style.animationDuration = (1.8 + (i % 5) * 0.18) + "s";
        piece.style.setProperty("--drift", ((i % 2 === 0 ? 1 : -1) * (18 + (i % 4) * 10)) + "px");
        piece.style.setProperty("--spin", ((i % 2 === 0 ? 1 : -1) * (120 + (i % 3) * 70)) + "deg");
        this.confettiLayer.appendChild(piece);
      }
      this.card.appendChild(this.confettiLayer);
    }

    show() {
      this.title.textContent = "";
      this.subtitle.textContent = "You survived all waves";
      this.card.classList.remove("message-panel__card--defeat");
      this.card.classList.add("message-panel__card--victory");
      var image = this.game.assets && this.game.assets.images ? this.game.assets.images.panel_victory : null;
      this.card.style.backgroundImage = image ? 'url("' + image.src + '")' : "";
      this.ensureConfetti();
      this.confettiLayer.classList.remove("victory-confetti--active");
      void this.confettiLayer.offsetWidth;
      this.confettiLayer.classList.add("victory-confetti--active");
      this.panel.classList.remove("hidden");
      this.game.audio.playSFX("celebrate");
    }

    hide() {
      this.panel.classList.add("hidden");
      this.card.style.backgroundImage = "";
      this.card.classList.remove("message-panel__card--victory");
      if (this.confettiLayer) this.confettiLayer.classList.remove("victory-confetti--active");
    }
  }

  TD.VictoryUI = VictoryUI;
})();

