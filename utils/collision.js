(function () {
  const TD = (window.TD = window.TD || {});
  TD.Collision = {
    circleHitsCircle(a, b) {
      const dx = a.x - b.x;
      const dy = a.y - b.y;
      const total = a.radius + b.radius;
      return dx * dx + dy * dy <= total * total;
    }
  };
})();
