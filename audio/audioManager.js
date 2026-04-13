(function () {
  const TD = (window.TD = window.TD || {});

  function encodeWav(samples, sampleRate) {
    const buffer = new ArrayBuffer(44 + samples.length * 2);
    const view = new DataView(buffer);
    function writeString(offset, value) { for (var i = 0; i < value.length; i += 1) view.setUint8(offset + i, value.charCodeAt(i)); }
    writeString(0, "RIFF");
    view.setUint32(4, 36 + samples.length * 2, true);
    writeString(8, "WAVE");
    writeString(12, "fmt ");
    view.setUint32(16, 16, true);
    view.setUint16(20, 1, true);
    view.setUint16(22, 1, true);
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, sampleRate * 2, true);
    view.setUint16(32, 2, true);
    view.setUint16(34, 16, true);
    writeString(36, "data");
    view.setUint32(40, samples.length * 2, true);
    var offset = 44;
    for (var j = 0; j < samples.length; j += 1) {
      var value = Math.max(-1, Math.min(1, samples[j]));
      view.setInt16(offset, value * 32767, true);
      offset += 2;
    }
    var binary = "";
    var bytes = new Uint8Array(buffer);
    for (var k = 0; k < bytes.length; k += 1) binary += String.fromCharCode(bytes[k]);
    return "data:audio/wav;base64," + btoa(binary);
  }

  function buildTone(options) {
    var sampleRate = 22050;
    var duration = options.duration || 0.18;
    var length = Math.floor(sampleRate * duration);
    var attack = Math.floor(length * 0.08);
    var release = Math.floor(length * 0.2);
    var samples = new Float32Array(length);
    for (var i = 0; i < length; i += 1) {
      var time = i / sampleRate;
      var frequency = typeof options.frequency === "function" ? options.frequency(time) : options.frequency;
      var sine = Math.sin(2 * Math.PI * frequency * time);
      var wave = options.wave === "square" ? Math.sign(sine) : options.wave === "triangle" ? (2 / Math.PI) * Math.asin(sine) : sine;
      var envelope = 1;
      if (i < attack) envelope = i / Math.max(attack, 1);
      if (i > length - release) envelope = (length - i) / Math.max(release, 1);
      samples[i] = wave * (options.volume || 0.25) * envelope;
    }
    return encodeWav(samples, sampleRate);
  }

  function buildMelody(notes, bassNotes, stepDuration, leadVolume, bassVolume, sparkleVolume) {
    var sampleRate = 22050;
    var totalLength = Math.floor(sampleRate * stepDuration * notes.length);
    var samples = new Float32Array(totalLength);
    for (var step = 0; step < notes.length; step += 1) {
      var start = Math.floor(step * stepDuration * sampleRate);
      var end = Math.floor((step + 1) * stepDuration * sampleRate);
      var leadFreq = notes[step];
      var bassFreq = bassNotes[step % bassNotes.length];
      for (var i = start; i < end; i += 1) {
        var t = (i - start) / sampleRate;
        var fade = Math.min(1, (i - start) / 360) * Math.min(1, (end - i) / 720);
        var lead = Math.sin(2 * Math.PI * leadFreq * t) * leadVolume;
        var harmony = Math.sin(2 * Math.PI * (leadFreq * 1.25) * t) * (leadVolume * 0.32);
        var sparkle = Math.sin(2 * Math.PI * (leadFreq * 2) * t) * sparkleVolume;
        var bass = ((2 / Math.PI) * Math.asin(Math.sin(2 * Math.PI * bassFreq * t))) * bassVolume;
        var pulse = Math.sin(2 * Math.PI * 8 * t) * 0.01;
        var kick = Math.exp(-t * 10) * Math.sin(2 * Math.PI * 95 * t) * ((step % 2 === 0) ? 0.02 : 0.012);
        samples[i] += (lead + harmony + sparkle + bass + pulse + kick) * fade;
      }
    }
    return encodeWav(samples, sampleRate);
  }

  function buildForestMelody() {
    return buildMelody(
      [523, 659, 784, 659, 587, 659, 698, 659, 523, 659, 784, 880, 784, 698, 659, 587],
      [196, 196, 220, 220, 247, 247, 220, 196, 196, 196, 220, 247, 220, 196, 175, 196],
      0.26,
      0.072,
      0.02,
      0.014
    );
  }

  function buildBeachMelody() {
    return buildMelody(
      [659, 784, 880, 784, 740, 784, 988, 880, 659, 784, 880, 988, 880, 784, 740, 659],
      [220, 247, 262, 247, 220, 196, 220, 247],
      0.24,
      0.066,
      0.016,
      0.018
    );
  }

  function createSounds() {
    return {
      throw: buildTone({ frequency: 320, duration: 0.12, volume: 0.22, wave: "square" }),
      arrow: buildTone({ frequency: 880, duration: 0.08, volume: 0.16 }),
      cannon: buildTone({ frequency: function (t) { return 126 - t * 22; }, duration: 0.22, volume: 0.22, wave: "triangle" }),
      hit: buildTone({ frequency: 520, duration: 0.08, volume: 0.16, wave: "square" }),
      base_hurt: buildTone({ frequency: function (t) { return 260 - t * 180; }, duration: 0.26, volume: 0.24, wave: "triangle" }),
      enemy_die: buildTone({ frequency: 190, duration: 0.22, volume: 0.2, wave: "triangle" }),
      place: buildTone({ frequency: 660, duration: 0.1, volume: 0.16 }),
      ui_hover: buildTone({ frequency: 780, duration: 0.08, volume: 0.11, wave: "triangle" }),
      ui_click: buildTone({ frequency: 540, duration: 0.1, volume: 0.16, wave: "triangle" }),
      wave_start: buildTone({ frequency: 480, duration: 0.28, volume: 0.18, wave: "triangle" }),
      victory: buildTone({ frequency: function (t) { return t < 0.18 ? 740 + t * 860 : t < 0.34 ? 920 + (t - 0.18) * 980 : 1120 - (t - 0.34) * 260; }, duration: 0.62, volume: 0.32, wave: "triangle" }),
      celebrate: buildTone({ frequency: function (t) { return t < 0.12 ? 980 + t * 720 : t < 0.28 ? 1140 - (t - 0.12) * 180 : 1110 + (t - 0.28) * 540; }, duration: 0.56, volume: 0.34, wave: "triangle" }),
      defeat: buildTone({ frequency: 120, duration: 0.45, volume: 0.26, wave: "square" })
    };
  }

  function buildVersionedUrl(path) {
    return path + "?v=" + Date.now().toString();
  }

  function getThemeName(scene) {
    return scene && scene.theme ? scene.theme : "forest";
  }

  function getThemeCandidates(theme) {
    if (theme === "worldmap") {
      return [
        buildVersionedUrl("./assets/audio/worldmap/bgm.mp3"),
        buildVersionedUrl("./assets/audio/worldmap/bgm.wav"),
        buildVersionedUrl("./assets/audio/bgm.mp3"),
        buildVersionedUrl("./assets/audio/bgm.ogg")
      ];
    }
    return [
      buildVersionedUrl("./assets/audio/scenes/" + theme + "/bgm.mp3"),
      buildVersionedUrl("./assets/audio/scenes/" + theme + "/bgm.wav"),
      buildVersionedUrl("./assets/audio/bgm.mp3"),
      buildVersionedUrl("./assets/audio/bgm.ogg")
    ];
  }

  function getLoopLeadSeconds(theme) {
    return theme === "beach" || theme === "worldmap" ? 6 : 0;
  }

  class AudioManager {
    constructor(assets, scene) {
      this.assets = assets || { audio: {} };
      this.scene = scene || null;
      this.enabled = true;
      this.started = false;
      this.unlockedOnce = false;
      this.sounds = null;
      this.bgm = null;
      this.bgmCandidates = [];
      this.bgmCandidateIndex = 0;
      this.currentBgmSource = null;
      this.isEnding = false;
      this.handleLoopWindow = this.handleLoopWindow.bind(this);
    }

    disposeCurrentBGM() {
      if (!this.bgm) return;
      this.bgm.removeEventListener("timeupdate", this.handleLoopWindow);
      this.bgm.pause();
      this.bgm.currentTime = 0;
      this.bgm.removeAttribute("src");
      this.bgm.load();
      this.bgm = null;
      this.currentBgmSource = null;
    }

    handleLoopWindow() {
      if (!this.bgm) return;
      var lead = getLoopLeadSeconds(getThemeName(this.scene));
      if (!lead || !isFinite(this.bgm.duration) || this.bgm.duration <= lead) return;
      if (this.bgm.currentTime >= this.bgm.duration - lead) this.bgm.currentTime = 0;
    }

    buildBGM() {
      var self = this;
      var theme = getThemeName(this.scene);
      this.bgmCandidates = getThemeCandidates(theme);
      this.bgmCandidateIndex = 0;

      function makeAudio(index) {
        var src = self.bgmCandidates[index];
        self.currentBgmSource = src;
        var audio = new Audio(src);
        audio.loop = getLoopLeadSeconds(theme) === 0;
        audio.volume = self.isEnding ? 0.12 : 0.18;
        if (getLoopLeadSeconds(theme) > 0) audio.addEventListener("timeupdate", self.handleLoopWindow);
        audio.addEventListener("error", function () {
          if (index + 1 < self.bgmCandidates.length) {
            self.bgmCandidateIndex = index + 1;
            self.disposeCurrentBGM();
            self.bgm = makeAudio(self.bgmCandidateIndex);
            if (self.started && self.bgm) self.bgm.play().catch(function () {});
          }
        }, { once: true });
        return audio;
      }

      this.bgm = makeAudio(0);
    }

    ensureReady() {
      if (!this.sounds) this.sounds = createSounds();
      if (!this.bgm) this.buildBGM();
    }

    unlock() {
      this.ensureReady();
      this.unlockedOnce = true;
      if (this.started) return;
      this.started = true;
      this.bgm.play().catch(() => { this.started = false; });
    }

    playSFX(name) {
      this.ensureReady();
      if (!this.enabled) return;
      var src = this.assets && this.assets.audio ? this.assets.audio[name] : null;
      if (!src && !this.sounds[name]) return;
      var audio = new Audio(src || this.sounds[name]);
      audio.volume = name === "victory" ? 0.5 : name === "celebrate" ? 0.56 : name === "cannon" ? 0.22 : name === "base_hurt" ? 0.32 : 0.35;
      audio.play().catch(function () {});
    }

    setEndState(isEnded) {
      this.ensureReady();
      this.isEnding = isEnded;
      if (this.bgm) this.bgm.volume = isEnded ? 0.12 : 0.18;
    }

    stopBGM() {
      this.ensureReady();
      this.started = false;
      this.disposeCurrentBGM();
    }

    restartBGM() {
      var shouldPlay = this.unlockedOnce;
      this.disposeCurrentBGM();
      this.buildBGM();
      if (this.bgm) this.bgm.volume = this.isEnding ? 0.12 : 0.18;
      if (shouldPlay && this.bgm) {
        this.started = true;
        this.bgm.play().catch(() => { this.started = false; });
      }
    }
  }

  TD.AudioManager = AudioManager;
})();

