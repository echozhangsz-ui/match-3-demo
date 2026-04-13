(function () {
  const TD = (window.TD = window.TD || {});
  TD.UnitConfig = {
    soldier: { id: "soldier", name: "Infantry", cost: 50, damage: 2, cooldown: 1.0, rangeFactor: 2, height: 42, projectileSpeed: 390, projectileType: "stone", color: "#547a3d", icon: "soldier", canTargetFlying: false },
    archer: { id: "archer", name: "Archer", cost: 150, damage: 4, cooldown: 1.2, rangeFactor: 5, height: 44, projectileSpeed: 550, projectileType: "arrow", color: "#4377a8", icon: "archer", canTargetFlying: false },
    tower: { id: "tower", name: "Tower", cost: 300, damage: 8, cooldown: 1.8, rangeFactor: 10, height: 48, projectileSpeed: 310, projectileType: "cannon", splashRadius: 60, color: "#7f6652", icon: "tower", canTargetFlying: true }
  };
})();
