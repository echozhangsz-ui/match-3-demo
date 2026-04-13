(function () {
  const TD = (window.TD = window.TD || {});

  function buildGrid(slots, radius) {
    return slots.map(function (rowSlots, row) {
      return rowSlots.map(function (slot, col) {
        return { row: row, col: col, x: slot.x, y: slot.y, radius: radius };
      });
    });
  }

  const forestSlots = [
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

  const beachSlots = [
    [
      { x: 314, y: 246 },
      { x: 630, y: 224 },
      { x: 890, y: 247 }
    ],
    [
      { x: 226, y: 338 },
      { x: 302, y: 436 },
      { x: 566, y: 410 },
      { x: 764, y: 378 }
    ],
    [
      { x: 186, y: 516 },
      { x: 338, y: 552 },
      { x: 560, y: 550 },
      { x: 898, y: 540 }
    ],
    [
      { x: 676, y: 648 }
    ]
  ];

  TD.SceneConfig = {
    order: ["forest", "beach", "mystery", "summit"],
    scenes: {
      forest: {
        id: "forest",
        title: "Forest",
        label: "forest",
        state: "completed",
        theme: "forest",
        map: {
          width: 1280,
          height: 720,
          groundY: 560,
          rows: 3,
          cols: 7,
          baseX: 1192,
          baseY: 298,
          spawnX: 84,
          spawnY: 370,
          baseLife: 12,
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
          ],
          grid: buildGrid(forestSlots, 24)
        },
        waves: [
          { label: "Wave 1", entries: [ { type: "monkey", count: 5, interval: 1.24 }, { type: "boar", count: 1, interval: 2.2 } ] },
          { label: "Wave 2", entries: [ { type: "monkey", count: 7, interval: 1.08 }, { type: "boar", count: 2, interval: 1.72 } ] },
          { label: "Wave 3", entries: [ { type: "monkey", count: 8, interval: 0.96 }, { type: "boar", count: 3, interval: 1.52 }, { type: "bear", count: 1, interval: 2.62 } ] },
          { label: "Wave 4", entries: [ { type: "monkey", count: 9, interval: 0.86 }, { type: "boar", count: 5, interval: 1.12 }, { type: "bear", count: 1, interval: 2.2 } ] },
          { label: "Wave 5", entries: [ { type: "monkey", count: 10, interval: 0.8 }, { type: "boar", count: 6, interval: 1.04 }, { type: "bear", count: 2, interval: 2.0 } ] },
          { label: "Wave 6", entries: [ { type: "monkey", count: 11, interval: 0.74 }, { type: "boar", count: 7, interval: 0.98 }, { type: "bear", count: 2, interval: 1.88 }, { type: "gorilla", count: 1, interval: 3.08 } ] },
          { label: "Wave 7", entries: [ { type: "monkey", count: 12, interval: 0.7 }, { type: "boar", count: 7, interval: 0.94 }, { type: "bear", count: 3, interval: 1.78 }, { type: "gorilla", count: 1, interval: 2.9 } ] },
          { label: "Wave 8", entries: [ { type: "monkey", count: 12, interval: 0.66 }, { type: "boar", count: 8, interval: 0.9 }, { type: "bear", count: 3, interval: 1.68 }, { type: "gorilla", count: 1, interval: 2.7 }, { type: "bat", count: 5, interval: 1.04 } ] },
          { label: "Wave 9", entries: [ { type: "monkey", count: 14, interval: 0.62 }, { type: "boar", count: 9, interval: 0.86 }, { type: "bear", count: 4, interval: 1.6 }, { type: "gorilla", count: 1, interval: 2.56 }, { type: "bat", count: 6, interval: 0.94 } ] },
          { label: "Wave 10", entries: [ { type: "monkey", count: 16, interval: 0.58 }, { type: "boar", count: 10, interval: 0.82 }, { type: "bear", count: 5, interval: 1.5 }, { type: "gorilla", count: 2, interval: 2.38 }, { type: "bat", count: 8, interval: 0.86 } ] }
        ]
      },
      beach: {
        id: "beach",
        title: "Beach",
        label: "beach",
        state: "unlocked",
        theme: "beach",
        map: {
          width: 1280,
          height: 720,
          groundY: 560,
          rows: 4,
          cols: 4,
          baseX: 1134,
          baseY: 664,
          spawnX: 122,
          spawnY: 162,
          baseLife: 15,
          initialGold: 130,
          slotRadius: 24,
          pathWidth: 46,
          pathPoints: [
            { x: 107, y: 188 },
            { x: 142, y: 208 },
            { x: 179, y: 230 },
            { x: 216, y: 254 },
            { x: 252, y: 278 },
            { x: 279, y: 304 },
            { x: 318, y: 334 },
            { x: 284, y: 370 },
            { x: 251, y: 406 },
            { x: 232, y: 442 },
            { x: 226, y: 460 },
            { x: 247, y: 502 },
            { x: 290, y: 513 },
            { x: 340, y: 515 },
            { x: 404, y: 515 },
            { x: 474, y: 515 },
            { x: 540, y: 508 },
            { x: 583, y: 505 },
            { x: 602, y: 489 },
            { x: 620, y: 466 },
            { x: 627, y: 428 },
            { x: 618, y: 386 },
            { x: 618, y: 346 },
            { x: 650, y: 314 },
            { x: 690, y: 299 },
            { x: 748, y: 297 },
            { x: 818, y: 302 },
            { x: 886, y: 311 },
            { x: 948, y: 324 },
            { x: 985, y: 350 },
            { x: 984, y: 374 },
            { x: 983, y: 410 },
            { x: 952, y: 442 },
            { x: 902, y: 466 },
            { x: 861, y: 488 },
            { x: 802, y: 544 },
            { x: 771, y: 580 },
            { x: 780, y: 618 },
            { x: 806, y: 640 },
            { x: 856, y: 646 },
            { x: 922, y: 658 },
            { x: 1102, y: 710 }
          ],
          grid: buildGrid(beachSlots, 24)
        },
        waves: [
          { label: "Wave 1", entries: [ { type: "hermit", count: 5, interval: 1.16 } ] },
          { label: "Wave 2", entries: [ { type: "hermit", count: 6, interval: 1.08 }, { type: "crab", count: 2, interval: 1.72 } ] },
          { label: "Wave 3", entries: [ { type: "hermit", count: 6, interval: 1.0 }, { type: "crab", count: 2, interval: 1.48 }, { type: "blackcat", count: 1, interval: 2.3 } ] },
          { label: "Wave 4", entries: [ { type: "crab", count: 3, interval: 1.36 }, { type: "blackcat", count: 2, interval: 1.86 }, { type: "seal", count: 1, interval: 3.34 } ] },
          { label: "Wave 5", entries: [ { type: "crab", count: 4, interval: 1.2 }, { type: "blackcat", count: 3, interval: 1.58 }, { type: "seal", count: 1, interval: 2.82 } ] },
          { label: "Wave 6", entries: [ { type: "crab", count: 4, interval: 1.28 }, { type: "blackcat", count: 3, interval: 1.6 }, { type: "seal", count: 2, interval: 2.96 } ] },
          { label: "Wave 7", entries: [ { type: "blackcat", count: 4, interval: 1.44 }, { type: "gull", count: 2, interval: 1.42 }, { type: "seal", count: 2, interval: 2.62 }, { type: "octopus", count: 1, interval: 3.6 } ] },
          { label: "Wave 8", entries: [ { type: "blackcat", count: 4, interval: 1.3 }, { type: "gull", count: 3, interval: 1.24 }, { type: "seal", count: 2, interval: 2.38 }, { type: "octopus", count: 1, interval: 3.12 } ] },
          { label: "Wave 9", entries: [ { type: "crab", count: 5, interval: 1.16 }, { type: "blackcat", count: 5, interval: 1.18 }, { type: "gull", count: 4, interval: 1.1 }, { type: "seal", count: 3, interval: 2.14 }, { type: "octopus", count: 1, interval: 2.84 } ] },
          { label: "Wave 10", entries: [ { type: "crab", count: 6, interval: 1.08 }, { type: "blackcat", count: 6, interval: 1.12 }, { type: "gull", count: 4, interval: 1.04 }, { type: "seal", count: 3, interval: 1.98 }, { type: "octopus", count: 2, interval: 2.58 } ] }
        ]
      },
      mystery: {
        id: "mystery",
        title: "Mystery",
        label: "?",
        state: "locked",
        theme: "mystery",
        map: null,
        waves: []
      },
      summit: {
        id: "summit",
        title: "Summit",
        label: "?",
        state: "locked",
        theme: "summit",
        map: null,
        waves: []
      }
    }
  };
})();
























