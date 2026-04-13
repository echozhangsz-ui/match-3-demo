(function () {
  const TD = (window.TD = window.TD || {});
  class WaveUI {
    constructor() { this.banner = document.getElementById("waveBanner"); this.text = document.getElementById("waveBannerText"); }
    play(label, onDone) {
      this.text.textContent = label;
      this.banner.classList.remove("docked");
      this.banner.classList.remove("animating");
      void this.banner.offsetWidth;
      this.banner.classList.add("animating");
      window.setTimeout(() => {
        this.banner.classList.remove("animating");
        this.banner.classList.add("docked");
        if (onDone) onDone();
      }, 1600);
    }
  }
  TD.WaveUI = WaveUI;
})();
