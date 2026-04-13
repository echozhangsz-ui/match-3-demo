(function () {
  const TD = (window.TD = window.TD || {});

  const slots = [
    [
      { x: 290, y: 220 },
      { x: 780, y: 220 }
    ],
    [
      { x: 280, y: 380 },
      { x: 430, y: 380 },
      { x: 610, y: 380 },
      { x: 780, y: 380 }
    ],
    [
      { x: 350, y: 575 },
      { x: 510, y: 575 },
      { x: 780, y: 575 }
    ]
  ];

  TD.MapConfig = {
    width: 1280,
    height: 720,
    groundY: 560,
    rows: 3,
    cols: 7,
    baseX: 1192,
    baseY: 298,
    spawnX: 84,
    spawnY: 370,
    baseLife: 15,
    initialGold: 100,
    slotRadius: 24,
    pathWidth: 44,
    pathPoints: [
      { x: 104, y: 298 },
      { x: 360, y: 298 },
      { x: 360, y: 495 },
      { x: 700, y: 495 },
      { x: 700, y: 298 },
      { x: 1088, y: 298 },
      { x: 1142, y: 218 },
      { x: 1188, y: 218 },
      { x: 1188, y: 298 },
      { x: 1204, y: 298 }
    ]
  };

  TD.MapConfig.grid = slots.map(function (rowSlots, row) {
    return rowSlots.map(function (slot, col) {
      return {
        row: row,
        col: col,
        x: slot.x,
        y: slot.y,
        radius: TD.MapConfig.slotRadius
      };
    });
  });
})();
