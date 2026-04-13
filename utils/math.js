(function () {
  const TD = (window.TD = window.TD || {});
  TD.Math = {
    clamp(value, min, max) { return Math.max(min, Math.min(max, value)); },
    lerp(a, b, t) { return a + (b - a) * t; },
    distance(x1, y1, x2, y2) { return Math.hypot(x2 - x1, y2 - y1); },
    randomRange(min, max) { return min + Math.random() * (max - min); },
    angleTo(x1, y1, x2, y2) { return Math.atan2(y2 - y1, x2 - x1); }
  };
})();
