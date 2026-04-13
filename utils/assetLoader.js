(function () {
  const TD = (window.TD = window.TD || {});
  const assetVersion = Date.now().toString();

  function versioned(url) {
    return url + "?v=" + assetVersion;
  }

  function loadImage(definition) {
    return new Promise(function (resolve) {
      var image = new Image();
      image.onload = function () { resolve(image); };
      image.onerror = function () { resolve(null); };
      image.src = versioned(definition.src);
    });
  }

  function loadAudioSource(definition) {
    return new Promise(function (resolve) {
      var candidates = [definition.src];
      if (definition.alt) candidates.push(definition.alt);
      var index = 0;

      function tryNext() {
        if (index >= candidates.length) {
          resolve(null);
          return;
        }

        var url = versioned(candidates[index]);
        index += 1;
        var audio = new Audio();
        var settled = false;
        var timer = setTimeout(function () {
          if (settled) return;
          settled = true;
          cleanup();
          tryNext();
        }, 4000);

        function cleanup() {
          clearTimeout(timer);
          audio.removeEventListener("canplaythrough", onReady);
          audio.removeEventListener("canplay", onReady);
          audio.removeEventListener("loadeddata", onReady);
          audio.removeEventListener("error", onError);
        }

        function onReady() {
          if (settled) return;
          settled = true;
          cleanup();
          resolve(url);
        }

        function onError() {
          if (settled) return;
          settled = true;
          cleanup();
          tryNext();
        }

        audio.preload = "auto";
        audio.addEventListener("canplaythrough", onReady, { once: true });
        audio.addEventListener("canplay", onReady, { once: true });
        audio.addEventListener("loadeddata", onReady, { once: true });
        audio.addEventListener("error", onError, { once: true });
        audio.src = url;
        audio.load();
      }

      tryNext();
    });
  }

  class AssetLoader {
    constructor(manifest) {
      this.manifest = manifest || { images: {}, audio: {} };
    }

    loadAll() {
      var imageEntries = Object.entries(this.manifest.images || {});
      var audioEntries = Object.entries(this.manifest.audio || {});

      var imagePromises = imageEntries.map(function (entry) {
        return loadImage(entry[1]).then(function (asset) { return [entry[0], asset]; });
      });
      var audioPromises = audioEntries.map(function (entry) {
        return loadAudioSource(entry[1]).then(function (asset) { return [entry[0], asset]; });
      });

      return Promise.all(imagePromises.concat(audioPromises)).then(function (results) {
        var assets = { images: {}, audio: {}, manifest: TD.AssetManifest };
        results.forEach(function (pair) {
          if (pair[0] in (TD.AssetManifest.images || {})) assets.images[pair[0]] = pair[1];
          else assets.audio[pair[0]] = pair[1];
        });
        return assets;
      });
    }
  }

  TD.AssetLoader = AssetLoader;
})();
