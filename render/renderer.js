(function () {
  const TD = (window.TD = window.TD || {});
  const MapConfig = TD.MapConfig;

  function drawPine(ctx, x, y, scale) {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(scale, scale);
    ctx.fillStyle = "#6a452f";
    ctx.fillRect(-4, 18, 8, 24);
    ctx.strokeStyle = "#2f261f";
    ctx.lineWidth = 2;
    ctx.strokeRect(-4, 18, 8, 24);
    ctx.fillStyle = "#34704a";
    ctx.beginPath();
    ctx.moveTo(0, -26); ctx.lineTo(-24, 10); ctx.lineTo(24, 10); ctx.closePath();
    ctx.fill(); ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, -8); ctx.lineTo(-20, 20); ctx.lineTo(20, 20); ctx.closePath();
    ctx.fill(); ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, 8); ctx.lineTo(-16, 30); ctx.lineTo(16, 30); ctx.closePath();
    ctx.fill(); ctx.stroke();
    ctx.restore();
  }

  function drawRoundTree(ctx, x, y, scale) {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(scale, scale);
    ctx.fillStyle = "#6b4a2f";
    ctx.fillRect(-5, 8, 10, 26);
    ctx.strokeStyle = "#2e241c";
    ctx.lineWidth = 2;
    ctx.strokeRect(-5, 8, 10, 26);
    ctx.fillStyle = "#63a94e";
    ctx.beginPath();
    ctx.arc(-12, 0, 14, 0, Math.PI * 2);
    ctx.arc(0, -10, 18, 0, Math.PI * 2);
    ctx.arc(14, 0, 14, 0, Math.PI * 2);
    ctx.arc(0, 8, 16, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  }

  function drawBush(ctx, x, y, scale) {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(scale, scale);
    ctx.fillStyle = "#4d924e";
    ctx.strokeStyle = "#285332";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(-14, 0, 12, 0, Math.PI * 2);
    ctx.arc(0, -4, 14, 0, Math.PI * 2);
    ctx.arc(16, 0, 12, 0, Math.PI * 2);
    ctx.arc(4, 8, 14, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  }

  function drawRock(ctx, x, y, scale) {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(scale, scale);
    ctx.fillStyle = "#9f9b90";
    ctx.strokeStyle = "#5e5c57";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(-16, 8);
    ctx.lineTo(-8, -10);
    ctx.lineTo(10, -12);
    ctx.lineTo(18, 4);
    ctx.lineTo(8, 14);
    ctx.lineTo(-12, 14);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  }

  function drawFence(ctx, x, y, width) {
    ctx.save();
    ctx.translate(x, y);
    ctx.strokeStyle = "#7b5b3b";
    ctx.lineWidth = 3;
    for (let i = 0; i <= width; i += 18) {
      ctx.beginPath();
      ctx.moveTo(i, -10);
      ctx.lineTo(i, 10);
      ctx.stroke();
    }
    ctx.beginPath();
    ctx.moveTo(0, -4);
    ctx.lineTo(width, -4);
    ctx.moveTo(0, 6);
    ctx.lineTo(width, 6);
    ctx.stroke();
    ctx.restore();
  }

  function drawCamp(ctx, x, y) {
    ctx.save();
    ctx.translate(x, y);
    drawRock(ctx, -22, 8, 0.65);
    drawRock(ctx, 18, 10, 0.75);
    ctx.fillStyle = "#c7b589";
    ctx.strokeStyle = "#6b5438";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(-10, 12); ctx.lineTo(0, -12); ctx.lineTo(12, 12); ctx.closePath();
    ctx.fill(); ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(8, 10); ctx.lineTo(18, -8); ctx.lineTo(28, 10); ctx.closePath();
    ctx.fill(); ctx.stroke();
    ctx.restore();
  }

  function drawMarker(ctx, x, y, occupied) {
    ctx.save();
    ctx.translate(x, y);
    ctx.fillStyle = occupied ? "rgba(96, 145, 84, 0.28)" : "rgba(235, 215, 161, 0.9)";
    ctx.strokeStyle = occupied ? "#406340" : "#90754f";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.ellipse(0, 10, 18, 10, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.strokeStyle = occupied ? "#406340" : "#765a39";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(0, 6);
    ctx.lineTo(0, -18);
    ctx.stroke();
    ctx.fillStyle = occupied ? "#8db47b" : "#fff7df";
    ctx.beginPath();
    ctx.moveTo(0, -18);
    ctx.lineTo(14, -14);
    ctx.lineTo(0, -6);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  }

  function drawCloud(ctx, x, y, scale) {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(scale, scale);
    ctx.fillStyle = "rgba(255,255,255,0.9)";
    ctx.beginPath();
    ctx.arc(-22, 0, 18, 0, Math.PI * 2);
    ctx.arc(0, -10, 24, 0, Math.PI * 2);
    ctx.arc(26, 0, 18, 0, Math.PI * 2);
    ctx.arc(2, 10, 20, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  function drawUmbrella(ctx, x, y, scale, colors) {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(scale, scale);
    ctx.strokeStyle = "#6b5037";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(0, -6);
    ctx.lineTo(0, 34);
    ctx.stroke();
    ctx.fillStyle = colors[0];
    ctx.beginPath();
    ctx.moveTo(-28, -6);
    ctx.quadraticCurveTo(0, -34, 28, -6);
    ctx.lineTo(-28, -6);
    ctx.fill();
    ctx.stroke();
    ctx.strokeStyle = colors[1];
    ctx.beginPath();
    ctx.moveTo(-14, -20); ctx.lineTo(-8, -6);
    ctx.moveTo(0, -26); ctx.lineTo(0, -6);
    ctx.moveTo(14, -20); ctx.lineTo(8, -6);
    ctx.stroke();
    ctx.restore();
  }

  function drawSailBoat(ctx, x, y, scale) {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(scale, scale);
    ctx.fillStyle = "#6a4d34";
    ctx.strokeStyle = "#3f2d21";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(-26, 8); ctx.lineTo(26, 8); ctx.lineTo(16, 18); ctx.lineTo(-18, 18); ctx.closePath();
    ctx.fill(); ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, -34); ctx.lineTo(0, 8);
    ctx.stroke();
    ctx.fillStyle = "rgba(255,255,255,0.92)";
    ctx.beginPath();
    ctx.moveTo(0, -30); ctx.lineTo(0, -2); ctx.lineTo(18, -8); ctx.closePath();
    ctx.fill(); ctx.stroke();
    ctx.restore();
  }

  function drawTent(ctx, x, y, scale) {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(scale, scale);
    ctx.fillStyle = "#d9ba72";
    ctx.strokeStyle = "#7b5b37";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(-34, 18); ctx.lineTo(0, -28); ctx.lineTo(34, 18); ctx.closePath();
    ctx.fill(); ctx.stroke();
    ctx.fillStyle = "#b48c4b";
    ctx.beginPath();
    ctx.moveTo(-8, 18); ctx.lineTo(0, 0); ctx.lineTo(8, 18); ctx.closePath();
    ctx.fill(); ctx.stroke();
    ctx.restore();
  }

  class Renderer {
    constructor(game, ctx) {
      this.game = game;
      this.ctx = ctx;
    }

    getImage(name) {
      return this.game.assets && this.game.assets.images ? this.game.assets.images[name] : null;
    }

    getSceneAssetName(name) {
      const theme = this.game.scene && this.game.scene.theme ? this.game.scene.theme : "forest";
      return theme + "_" + name;
    }

    getSceneImage(name) {
      return this.getImage(this.getSceneAssetName(name));
    }

    getSceneOrSharedAssetName(name) {
      const sceneAssetName = this.getSceneAssetName(name);
      return this.getImage(sceneAssetName) ? sceneAssetName : name;
    }

    getImageSize(name, fallbackWidth, fallbackHeight) {
      const manifest = TD.AssetManifest && TD.AssetManifest.images ? TD.AssetManifest.images[name] : null;
      return {
        width: manifest ? manifest.width : fallbackWidth,
        height: manifest ? manifest.height : fallbackHeight
      };
    }

    drawCenteredImage(name, x, y, fallbackWidth, fallbackHeight) {
      const image = this.getImage(name);
      if (!image) return false;
      const size = this.getImageSize(name, fallbackWidth, fallbackHeight);
      this.ctx.drawImage(image, x - size.width / 2, y - size.height / 2, size.width, size.height);
      return true;
    }

    drawBottomImage(name, x, y, fallbackWidth, fallbackHeight) {
      const image = this.getImage(name);
      if (!image) return false;
      const size = this.getImageSize(name, fallbackWidth, fallbackHeight);
      this.ctx.drawImage(image, x - size.width / 2, y - size.height, size.width, size.height);
      return true;
    }

    drawBottomSpriteFrame(name, frameIndex, cols, rows, x, y, destWidth, destHeight) {
      const image = this.getImage(name);
      if (!image) return false;
      const frameWidth = Math.floor(image.width / cols);
      const frameHeight = Math.floor(image.height / rows);
      const col = frameIndex % cols;
      const row = Math.floor(frameIndex / cols) % rows;
      this.ctx.drawImage(
        image,
        col * frameWidth,
        row * frameHeight,
        frameWidth,
        frameHeight,
        x - destWidth / 2,
        y - destHeight,
        destWidth,
        destHeight
      );
      return true;
    }

    drawBottomSpriteFrameFitHeight(name, frameIndex, cols, rows, x, y, destHeight) {
      const image = this.getImage(name);
      if (!image) return false;
      const frameWidth = Math.floor(image.width / cols);
      const frameHeight = Math.floor(image.height / rows);
      const destWidth = destHeight * (frameWidth / frameHeight);
      return this.drawBottomSpriteFrame(name, frameIndex, cols, rows, x, y, destWidth, destHeight);
    }

    render() {
      const ctx = this.ctx;
      ctx.clearRect(0, 0, MapConfig.width, MapConfig.height);
      this.drawBackground();
      this.drawRoute();
      this.drawProps();
      this.drawPlacementRanges();
      this.drawGrid();
      this.drawSpawn();
      this.drawBase();
      const groundDrawables = [];
      const flyingEnemies = [];
      this.game.units.forEach((unit) => {
        const sortY = unit.gridCell && unit.gridCell.y != null ? unit.gridCell.y : unit.y;
        groundDrawables.push({ kind: "unit", entity: unit, sortY: sortY });
      });
      this.game.enemies.forEach((enemy) => {
        const sortY = enemy.targetY != null ? enemy.targetY : enemy.y;
        if (enemy.flying) flyingEnemies.push(enemy);
        else groundDrawables.push({ kind: "enemy", entity: enemy, sortY: sortY });
      });
      groundDrawables.sort((a, b) => a.sortY - b.sortY);
      groundDrawables.forEach((entry) => {
        if (entry.kind === "unit") this.drawUnit(entry.entity);
        else this.drawEnemy(entry.entity);
      });
      flyingEnemies.forEach((enemy) => this.drawEnemy(enemy));
      this.game.projectiles.forEach((projectile) => this.drawProjectile(projectile));
      this.game.effects.forEach((effect) => this.drawEffect(effect));
    }

    drawBackground() {
      const ctx = this.ctx;
      const theme = this.game.scene && this.game.scene.theme ? this.game.scene.theme : "forest";
      if (theme === "beach" && !this.getSceneImage("background")) {
        ctx.save();
        const sky = ctx.createLinearGradient(0, 0, 0, MapConfig.height);
        sky.addColorStop(0, "#a9ddff");
        sky.addColorStop(0.55, "#dff5ff");
        sky.addColorStop(0.56, "#57b9db");
        sky.addColorStop(0.68, "#3e9bc5");
        sky.addColorStop(0.69, "#efd59c");
        sky.addColorStop(1, "#e8c77e");
        ctx.fillStyle = sky;
        ctx.fillRect(0, 0, MapConfig.width, MapConfig.height);
        drawCloud(ctx, 190, 104, 1.1);
        drawCloud(ctx, 980, 126, 0.9);
        drawCloud(ctx, 1140, 86, 0.7);
        drawSailBoat(ctx, 216, 318, 1.05);
        ctx.fillStyle = "rgba(255,255,255,0.35)";
        ctx.fillRect(0, 392, MapConfig.width, 6);
        ctx.restore();
        return;
      }
      if (this.getSceneImage("background")) {
        ctx.drawImage(this.getSceneImage("background"), 0, 0, MapConfig.width, MapConfig.height);
        return;
      }
      ctx.save();
      const sky = ctx.createLinearGradient(0, 0, 0, MapConfig.height);
      sky.addColorStop(0, "#d8f2dc");
      sky.addColorStop(0.45, "#b7dc88");
      sky.addColorStop(1, "#6f9a4a");
      ctx.fillStyle = sky;
      ctx.fillRect(0, 0, MapConfig.width, MapConfig.height);
      ctx.fillStyle = "rgba(255,255,255,0.42)";
      ctx.beginPath();
      ctx.arc(170, 105, 38, 0, Math.PI * 2);
      ctx.arc(214, 98, 50, 0, Math.PI * 2);
      ctx.arc(262, 112, 34, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#83b45b";
      ctx.fillRect(0, 520, MapConfig.width, 200);
      for (let y = 0; y < 6; y += 1) {
        for (let x = 0; x < 4; x += 1) drawBush(ctx, 1080 + x * 48, 170 + y * 42, 1.2);
      }
      [[140, 548, 1.1], [260, 592, 1.1], [1060, 548, 1.15], [1140, 600, 1.2], [96, 620, 0.95]].forEach((tree) => drawRoundTree(ctx, tree[0], tree[1], tree[2]));
      [[420, 610, 0.95], [560, 615, 1.05], [700, 610, 0.9], [840, 615, 1.05], [980, 612, 0.92]].forEach((tree) => drawPine(ctx, tree[0], tree[1], tree[2]));
      ctx.restore();
    }

    drawRoute() {
      const ctx = this.ctx;
      const points = MapConfig.pathPoints;
      const theme = this.game.scene && this.game.scene.theme ? this.game.scene.theme : "forest";
      if (this.getSceneImage("route")) {
        ctx.drawImage(this.getSceneImage("route"), 0, 0, MapConfig.width, MapConfig.height);
        return;
      }
      ctx.save();
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      if (theme === "beach") {
        ctx.strokeStyle = "#c9a45d";
        ctx.lineWidth = MapConfig.pathWidth + 24;
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length; i += 1) ctx.lineTo(points[i].x, points[i].y);
        ctx.stroke();
        ctx.strokeStyle = "#f0db9d";
        ctx.lineWidth = MapConfig.pathWidth + 8;
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length; i += 1) ctx.lineTo(points[i].x, points[i].y);
        ctx.stroke();
        ctx.strokeStyle = "#f9eab9";
        ctx.lineWidth = MapConfig.pathWidth - 8;
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length; i += 1) ctx.lineTo(points[i].x, points[i].y);
        ctx.stroke();
        ctx.restore();
        return;
      }
      ctx.strokeStyle = "#74a34a";
      ctx.lineWidth = MapConfig.pathWidth + 26;
      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);
      for (let i = 1; i < points.length; i += 1) ctx.lineTo(points[i].x, points[i].y);
      ctx.stroke();
      ctx.strokeStyle = "#d1c27a";
      ctx.lineWidth = MapConfig.pathWidth + 8;
      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);
      for (let i = 1; i < points.length; i += 1) ctx.lineTo(points[i].x, points[i].y);
      ctx.stroke();
      ctx.strokeStyle = "#e8d99b";
      ctx.lineWidth = MapConfig.pathWidth - 6;
      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);
      for (let i = 1; i < points.length; i += 1) ctx.lineTo(points[i].x, points[i].y);
      ctx.stroke();
      ctx.restore();
    }

    drawProps() {
      const ctx = this.ctx;
      const theme = this.game.scene && this.game.scene.theme ? this.game.scene.theme : "forest";
      if (this.getSceneImage("props")) {
        ctx.drawImage(this.getSceneImage("props"), 0, 0, MapConfig.width, MapConfig.height);
        return;
      }
      ctx.save();
      if (theme === "beach") {
        drawRock(ctx, 130, 336, 1.1);
        drawRock(ctx, 172, 362, 0.9);
        drawRock(ctx, 214, 332, 0.7);
        drawUmbrella(ctx, 392, 232, 0.92, ["#ff8c72", "#fff2db"]);
        drawUmbrella(ctx, 894, 254, 0.85, ["#5bb9ff", "#fff7d8"]);
        drawUmbrella(ctx, 1048, 424, 0.75, ["#ffdb6f", "#fff7d8"]);
        drawBush(ctx, 1088, 536, 0.55);
        drawBush(ctx, 1132, 564, 0.48);
        drawRock(ctx, 614, 614, 0.58);
        ctx.restore();
        return;
      }
      drawCamp(ctx, 265, 250);
      drawRock(ctx, 230, 290, 0.6);
      drawRock(ctx, 310, 308, 0.7);
      drawRock(ctx, 505, 265, 0.55);
      drawRock(ctx, 584, 342, 0.6);
      drawRock(ctx, 830, 265, 0.55);
      drawRock(ctx, 1015, 350, 0.6);
      drawBush(ctx, 470, 235, 0.72);
      drawBush(ctx, 935, 255, 0.78);
      drawBush(ctx, 865, 470, 0.72);
      drawFence(ctx, 935, 455, 110);
      drawFence(ctx, 955, 435, 70);
      drawPine(ctx, 1040, 230, 0.75);
      ctx.restore();
    }

    drawPlacementRanges() {
      const ctx = this.ctx;
      if (!this.game.units || this.game.units.length === 0) return;
      ctx.save();
      for (let i = 0; i < this.game.units.length; i += 1) {
        const unit = this.game.units[i];
        const range = unit.range;
        const fill =
          unit.type === "tower" ? "rgba(130, 102, 82, 0.045)" :
          unit.type === "archer" ? "rgba(67, 119, 168, 0.045)" :
          "rgba(84, 122, 61, 0.045)";
        ctx.fillStyle = fill;
        ctx.beginPath();
        ctx.arc(unit.x, unit.y, range, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }

    drawGrid() {
      const ctx = this.ctx;
      ctx.save();
      for (let rowIndex = 0; rowIndex < MapConfig.grid.length; rowIndex += 1) {
        for (let colIndex = 0; colIndex < MapConfig.grid[rowIndex].length; colIndex += 1) {
          const cell = MapConfig.grid[rowIndex][colIndex];
          const occupied = this.game.gridOccupancy[cell.row][cell.col];
          const assetName = occupied ? "slot_filled" : this.getSceneOrSharedAssetName("slot_empty");
          if (!this.drawCenteredImage(assetName, cell.x, cell.y - 8, 48, 48)) drawMarker(ctx, cell.x, cell.y - 8, occupied);
        }
      }
      ctx.restore();
    }

    drawBase() {
      const ctx = this.ctx;
      const theme = this.game.scene && this.game.scene.theme ? this.game.scene.theme : "forest";
      const shake = this.game.baseHitTimer > 0 ? Math.sin(this.game.baseHitTimer * 70) * 7 : 0;
      const flash = this.game.baseFlashTimer > 0;
      ctx.save();
      const baseOffsetX = theme === "beach" ? 30 : 0;
      const baseOffsetY = theme === "beach" ? 40 : 0;
      ctx.translate(MapConfig.baseX + baseOffsetX + shake, MapConfig.baseY + baseOffsetY);
      if (theme === "beach" && !this.getSceneImage("base")) {
        drawTent(ctx, 0, 6, 1.45);
        if (flash) {
          ctx.fillStyle = "rgba(255, 92, 92, 0.18)";
          ctx.fillRect(-86, -108, 172, 130);
        }
        ctx.restore();
        return;
      }
      if (this.getSceneImage("base")) {
        const image = this.getSceneImage("base");
        const size = this.getImageSize((this.game.scene && this.game.scene.theme ? this.game.scene.theme : "forest") + "_base", 180, 180);
        const drawX = -size.width / 2;
        const drawY = 20 - size.height;
        ctx.drawImage(image, drawX, drawY, size.width, size.height);
        if (flash) {
          ctx.fillStyle = "rgba(255, 92, 92, 0.22)";
          ctx.fillRect(drawX, drawY, size.width, size.height);
        }
        ctx.restore();
        return;
      }
      drawPine(ctx, -70, 52, 1.15);
      drawPine(ctx, 88, 52, 1.1);
      ctx.fillStyle = flash ? "#f7ceb8" : "#8e6847";
      ctx.strokeStyle = flash ? "#b43a32" : "#3c2c1e";
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.rect(-64, -92, 128, 108);
      ctx.fill();
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(-74, -92); ctx.lineTo(0, -152); ctx.lineTo(74, -92); ctx.closePath();
      ctx.fillStyle = flash ? "#ea8e72" : "#5e7a39";
      ctx.fill(); ctx.stroke();
      ctx.fillStyle = "#f8e9c5";
      ctx.fillRect(-12, -34, 28, 42);
      ctx.strokeRect(-12, -34, 28, 42);
      ctx.fillRect(-48, -42, 20, 18);
      ctx.fillRect(28, -42, 20, 18);
      ctx.strokeRect(-48, -42, 20, 18);
      ctx.strokeRect(28, -42, 20, 18);
      ctx.fillStyle = "#5a3e28";
      for (let i = -52; i <= 36; i += 18) ctx.fillRect(i, -92, 6, 108);
      if (flash) {
        ctx.fillStyle = "rgba(255, 92, 92, 0.22)";
        ctx.fillRect(-68, -116, 140, 126);
      }
      ctx.restore();
    }

    drawSpawn() {
      const ctx = this.ctx;
      const theme = this.game.scene && this.game.scene.theme ? this.game.scene.theme : "forest";
      ctx.save();
      ctx.translate(MapConfig.spawnX, MapConfig.spawnY);
      if (theme === "beach" && !this.getSceneImage("spawn")) {
        drawRock(ctx, -10, 10, 1.2);
        drawRock(ctx, 22, -4, 0.9);
        drawRock(ctx, 36, 22, 0.75);
        ctx.restore();
        return;
      }
      if (this.getSceneImage("spawn")) {
        const image = this.getSceneImage("spawn");
        const size = this.getImageSize((this.game.scene && this.game.scene.theme ? this.game.scene.theme : "forest") + "_spawn", 160, 180);
        ctx.drawImage(image, -10 - size.width / 2, -18 - size.height, size.width, size.height);
        ctx.restore();
        return;
      }
      ctx.fillStyle = "#493629";
      ctx.beginPath();
      ctx.ellipse(0, 0, 74, 92, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#1d1713";
      ctx.beginPath();
      ctx.ellipse(12, 8, 46, 58, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "#70533c";
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.arc(0, 0, 74, Math.PI * 0.85, Math.PI * 1.82);
      ctx.stroke();
      ctx.restore();
    }

    drawUnit(unit) {
      const ctx = this.ctx;
      const attack = Math.max(0, unit.attackAnim || 0);
      const pulse = unit.attackPulse || 0;
      const breath = Math.sin(unit.idleTime || 0) * 1.6;
      const torsoBob = breath - pulse * 4.2;
      const armSwing = pulse * 22;
      const facing = unit.type === "tower" ? 1 : (unit.facing || 1);
      const theme = this.game.scene && this.game.scene.theme ? this.game.scene.theme : "forest";
      const sharedSpriteName = unit.type === "tower" ? "tower" : unit.type === "archer" ? "archer" : "soldier";
      const spriteName = this.getSceneOrSharedAssetName(sharedSpriteName);
      const isBeachSoldier = theme === "beach" && unit.type === "soldier";
      const idleSheetName = "beach_soldier_idle_sheet";
      const attackSheetName = "beach_soldier_attack_sheet";
      const hasIdleSheet = isBeachSoldier && !!this.getImage(idleSheetName);
      const hasAttackSheet = isBeachSoldier && !!this.getImage(attackSheetName);

      ctx.save();
      ctx.translate(unit.x, unit.y);

      const shadowDiameter = unit.type === "tower"
        ? Math.max(34, unit.config.height * 0.58)
        : Math.max(20, unit.config.height * 0.44);
      ctx.save();
      ctx.fillStyle = "rgba(18, 28, 24, 0.14)";
      ctx.beginPath();
      ctx.ellipse(0, unit.type === "tower" ? 20 : 16, shadowDiameter * 0.5, shadowDiameter * 0.18, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      if (unit.type === "tower" && this.getImage(spriteName)) {
        const recoil = pulse * 8;
        ctx.translate(-recoil, -pulse * 2);
        this.drawBottomImage(spriteName, 4, 50, 100, 100);
        ctx.restore();
        return;
      }

      if (isBeachSoldier && (hasIdleSheet || hasAttackSheet || this.getImage(spriteName))) {
        ctx.save();
        ctx.scale(facing, 1);
                const drawAttack = attack > 0.001 && hasAttackSheet;
        if (drawAttack) {
          const attackProgress = Math.max(0, 1 - attack);
          const attackFrame = Math.min(15, Math.floor(attackProgress * 16));
          this.drawBottomSpriteFrameFitHeight(attackSheetName, attackFrame, 4, 4, 0, 42, 72);
        } else if (hasIdleSheet) {
          const idleFrame = Math.floor(((unit.idleTime || 0) * 6) % 16);
          this.drawBottomSpriteFrameFitHeight(idleSheetName, idleFrame, 4, 4, 0, 42, 72);
        } else if (this.getImage(spriteName)) {
          ctx.translate(0, torsoBob);
          ctx.rotate(-0.12 * pulse * facing);
          ctx.scale(1 + pulse * 0.04, 1 - pulse * 0.04);
          this.drawBottomImage(spriteName, 0, 42 + pulse * -8, 72, 72);
        }
        ctx.restore();
        ctx.restore();
        return;
      }

      if (this.getImage(spriteName)) {
        ctx.save();
        ctx.scale(facing, 1);
        ctx.translate(0, torsoBob);
        ctx.rotate((unit.type === "archer" ? -0.08 : -0.12) * pulse * facing);
        ctx.scale(1 + pulse * 0.04, 1 - pulse * 0.04);
        this.drawBottomImage(spriteName, 0, 42 + pulse * (unit.type === "archer" ? -12 : -8), 72, 72);
        ctx.restore();
        ctx.restore();
        return;
      }

      if (unit.type === "tower") {
        const recoil = pulse * 8;
        ctx.translate(-recoil, -pulse * 2);
        this.drawTower(ctx, 0, 0, unit, pulse);
        ctx.restore();
        return;
      }

      ctx.save();
      ctx.scale(facing, 1);
      this.drawBody(ctx, unit.type, torsoBob, armSwing, pulse);
      ctx.restore();
      ctx.restore();
    }
    drawEnemy(enemy) {
      const ctx = this.ctx;
      const drawY = enemy.targetY != null ? enemy.targetY : enemy.y;
      const walk = enemy.walkBob || 0;
      const limb = enemy.legSwing || 0;
      const wing = enemy.wingSwing || 0;
      const spawnT = enemy.spawnAnim > 0 ? 1 - enemy.spawnAnim / 0.32 : 1;
      const spawnScale = 0.68 + spawnT * 0.32;
      const spawnAlpha = 0.25 + spawnT * 0.75;
      const sharedSpriteName = ({ monkey: "monkey", boar: "boar", bear: "bear", gorilla: "gorilla", bat: "bat", hermit: "hermit", crab: "crab", blackcat: "blackcat", gull: "gull", octopus: "octopus", seal: "seal" })[enemy.type] || null;
      const spriteName = sharedSpriteName ? this.getSceneOrSharedAssetName(sharedSpriteName) : null;
      const forceFallback = this.game.scene && this.game.scene.theme === "forest" && (enemy.type === "gorilla" || enemy.type === "bat");
      ctx.save();
      ctx.translate(enemy.x, drawY + (enemy.flying ? 0 : walk) + (1 - spawnT) * 18);
      ctx.scale(spawnScale, spawnScale);
      ctx.globalAlpha = spawnAlpha;
      if (!forceFallback && this.getImage(spriteName)) {
        const sway = enemy.bodyTilt || 0;
        const gullSway = Math.sin((enemy.moveCycle || 0) * 3.0) * 0.06;
        const sealSway = Math.sin((enemy.moveCycle || 0) * 2.2) * 0.14;
        ctx.rotate(enemy.type === "gull" ? gullSway * 0.25 : enemy.type === "seal" ? sealSway * 0.2 : sway);
        if (enemy.type === "gull") {
          const gullBob = Math.sin((enemy.moveCycle || 0) * 3.0) * 3.15;
          ctx.translate(0, gullBob);
        } else if (enemy.type === "seal") {
          const sealBob = Math.sin((enemy.moveCycle || 0) * 2.6) * 12;
          ctx.translate(0, sealBob);
        } else if (enemy.type === "bat") {
          ctx.translate(0, Math.sin((enemy.moveCycle || 0) * 2.4) * 2.5);
        } else {
          const spriteHasOwnLegs = enemy.type === "hermit" || enemy.type === "crab" || enemy.type === "blackcat" || enemy.type === "seal" || enemy.type === "octopus";
          const steppingSprite = enemy.type === "hermit" || enemy.type === "crab" || enemy.type === "blackcat" || enemy.type === "octopus";
          if (steppingSprite) {
            ctx.translate(limb * 0.26, Math.abs(limb) * 0.075);
            ctx.rotate(limb * 0.01);
          } else if (spriteHasOwnLegs) {
            ctx.translate(Math.sin((enemy.moveCycle || 0) * 1.4) * 0.4, Math.abs(limb) * 0.025);
            ctx.rotate(Math.sin((enemy.moveCycle || 0) * 1.2) * 0.008);
          } else {
            ctx.translate(0, Math.abs(limb) * 0.025);
          }
        }
        const size =
          sharedSpriteName === "gorilla" ? { w: 132, h: 118 } :
          sharedSpriteName === "bat" ? { w: 84, h: 58 } :
          sharedSpriteName === "hermit" ? { w: 35, h: 28 } :
          sharedSpriteName === "crab" ? { w: 53, h: 42 } :
          sharedSpriteName === "blackcat" ? { w: 70, h: 56 } :
          sharedSpriteName === "gull" ? { w: 88, h: 70 } :
          sharedSpriteName === "octopus" ? { w: 88, h: 70 } :
          sharedSpriteName === "seal" ? { w: 105, h: 84 } :
          sharedSpriteName === "bear" ? { w: 108, h: 92 } :
          sharedSpriteName === "boar" ? { w: 92, h: 72 } :
          { w: 72, h: 72 };
        if (enemy.type === "gorilla") this.drawGorillaSpriteArms(limb);
        const spriteHasOwnLegs = enemy.type === "hermit" || enemy.type === "crab" || enemy.type === "blackcat" || enemy.type === "seal" || enemy.type === "octopus";
        if (!enemy.flying && !spriteHasOwnLegs) this.drawEnemySpriteLegs(enemy, limb);
        const spriteOffsetX =
          enemy.type === "octopus" ? 2 :
          enemy.type === "seal" ? 2 :
          enemy.type === "blackcat" ? 1 :
          enemy.type === "crab" ? 1 :
          enemy.type === "hermit" ? 1 :
          0;
        const spriteOffsetY =
          enemy.type === "gorilla" ? 40 :
          enemy.type === "bat" ? 24 :
          enemy.type === "gull" ? 24 :
          enemy.type === "octopus" ? 18 :
          enemy.type === "seal" ? 18 :
          enemy.type === "blackcat" ? 16 :
          enemy.type === "crab" ? 14 :
          enemy.type === "hermit" ? 12 :
          34;
        if (enemy.type === "gull") {
          ctx.save();
          ctx.translate(-size.w * 0.34, -10);
          ctx.rotate(gullSway);
          ctx.translate(size.w * 0.34, 10);
          this.drawBottomImage(spriteName, 0, spriteOffsetY, size.w, size.h);
          ctx.restore();
        } else if (enemy.type === "seal") {
          ctx.save();
          ctx.translate(-size.w * 0.46, -4);
          ctx.rotate(sealSway * 1.4);
          ctx.translate(size.w * 0.46, 4);
          this.drawBottomImage(spriteName, spriteOffsetX, spriteOffsetY, size.w, size.h);
          ctx.restore();
        } else {
          this.drawBottomImage(spriteName, spriteOffsetX, spriteOffsetY, size.w, size.h);
        }
        this.drawHealthBar(enemy);
        ctx.restore();
        return;
      }
      ctx.fillStyle = enemy.config.color;
      ctx.strokeStyle = "#2a211e";
      ctx.lineWidth = 3.5;
      if (enemy.type === "monkey") {
        ctx.beginPath(); ctx.arc(0, -10, 18, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
        ctx.fillStyle = "#caa27e";
        ctx.beginPath(); ctx.ellipse(0, -6, 10, 8, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
        ctx.fillStyle = enemy.config.color;
        ctx.beginPath(); ctx.arc(-16, -22, 7, 0, Math.PI * 2); ctx.arc(16, -22, 7, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(-10, 8); ctx.lineTo(-14 - limb * 0.6, 30);
        ctx.moveTo(10, 8); ctx.lineTo(14 + limb * 0.6, 30);
        ctx.moveTo(12, -2); ctx.quadraticCurveTo(38, 10 + limb * 0.3, 30, 32);
        ctx.stroke();
        ctx.fillStyle = "#1f1f1f";
        ctx.beginPath(); ctx.arc(-4, -10, 1.5, 0, Math.PI * 2); ctx.arc(4, -10, 1.5, 0, Math.PI * 2); ctx.fill();
      } else if (enemy.type === "boar") {
        ctx.beginPath(); ctx.ellipse(0, 0, 28, 20, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
        ctx.fillStyle = "#8a6b5c";
        ctx.beginPath(); ctx.ellipse(20, -2, 12, 10, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
        ctx.fillStyle = enemy.config.color;
        ctx.beginPath(); ctx.moveTo(12, -14); ctx.lineTo(28, -26); ctx.lineTo(24, -10); ctx.closePath(); ctx.moveTo(-2, -14); ctx.lineTo(12, -24); ctx.lineTo(10, -10); ctx.closePath(); ctx.fill(); ctx.stroke();
        ctx.strokeStyle = "#f3ebd1";
        ctx.lineWidth = 2.5;
        ctx.beginPath(); ctx.moveTo(28, 2); ctx.lineTo(38, 6); ctx.moveTo(28, 4); ctx.lineTo(38, 10); ctx.stroke();
        ctx.strokeStyle = "#2a211e";
        ctx.lineWidth = 3.5;
        ctx.beginPath();
        ctx.moveTo(-10, 14); ctx.lineTo(-10 - limb * 0.4, 32);
        ctx.moveTo(8, 14); ctx.lineTo(8 + limb * 0.4, 32);
        ctx.stroke();
      } else if (enemy.type === "bear") {
        ctx.beginPath(); ctx.ellipse(0, 0, 36, 28, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
        ctx.beginPath(); ctx.arc(18, -16, 14, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
        ctx.beginPath(); ctx.arc(8, -30, 6, 0, Math.PI * 2); ctx.arc(25, -30, 6, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
        ctx.fillStyle = "#8a6a55";
        ctx.beginPath(); ctx.ellipse(20, -10, 8, 6, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
        ctx.fillStyle = "#1f1f1f";
        ctx.beginPath(); ctx.arc(18, -18, 1.5, 0, Math.PI * 2); ctx.arc(25, -18, 1.5, 0, Math.PI * 2); ctx.fill();
        ctx.strokeStyle = "#2a211e";
        ctx.lineWidth = 3.5;
        ctx.beginPath();
        ctx.moveTo(-12, 18); ctx.lineTo(-14 - limb * 0.3, 40);
        ctx.moveTo(8, 18); ctx.lineTo(10 + limb * 0.3, 40);
        ctx.stroke();
      } else if (enemy.type === "gorilla") {
        this.drawGorillaFallback(enemy, limb);
      } else if (enemy.type === "bat") {
        this.drawBatFallback(enemy, wing);
      } else if (enemy.type === "gull") {
        this.drawGullFallback(enemy, wing);
      } else if (enemy.type === "hermit") {
        this.drawHermitFallback(enemy);
      } else if (enemy.type === "crab") {
        this.drawCrabFallback(enemy, limb);
      } else if (enemy.type === "blackcat") {
        this.drawBlackCatFallback(enemy, limb);
      } else if (enemy.type === "octopus") {
        this.drawOctopusFallback(enemy, limb);
      } else if (enemy.type === "seal") {
        this.drawSealFallback(enemy);
      } else {
        this.drawBatFallback(enemy, wing);
      }
      this.drawHealthBar(enemy);
      ctx.restore();
    }

    drawGorillaSpriteArms(limb) {
      const ctx = this.ctx;
      const swing = limb * 0.34;
      ctx.save();
      ctx.strokeStyle = "#2f2520";
      ctx.lineWidth = 7;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(-22, -30); ctx.lineTo(-28 - swing, 0);
      ctx.moveTo(22, -30); ctx.lineTo(28 + swing, 2);
      ctx.stroke();
      ctx.strokeStyle = "#201915";
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.moveTo(-30 - swing, 0); ctx.lineTo(-34 - swing, 18);
      ctx.moveTo(30 + swing, 2); ctx.lineTo(34 + swing, 20);
      ctx.stroke();
      ctx.restore();
    }

    drawGorillaFallback(enemy, limb) {
      const ctx = this.ctx;
      const armSwing = limb * 0.32;
      ctx.beginPath(); ctx.ellipse(0, -2, 42, 32, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
      ctx.beginPath(); ctx.arc(18, -24, 16, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
      ctx.beginPath(); ctx.arc(10, -40, 6, 0, Math.PI * 2); ctx.arc(24, -40, 6, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
      ctx.fillStyle = "#70584a";
      ctx.beginPath(); ctx.ellipse(18, -18, 10, 8, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
      ctx.fillStyle = "#1f1f1f";
      ctx.beginPath(); ctx.arc(15, -25, 1.5, 0, Math.PI * 2); ctx.arc(22, -25, 1.5, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = "#2a211e";
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.moveTo(-22, -18); ctx.lineTo(-28 - armSwing, 10);
      ctx.moveTo(20, -18); ctx.lineTo(30 + armSwing, 12);
      ctx.moveTo(-16, 22); ctx.lineTo(-18 - limb * 0.24, 48);
      ctx.moveTo(10, 22); ctx.lineTo(12 + limb * 0.24, 48);
      ctx.stroke();
    }

    drawBatFallback(enemy, wing) {
      const ctx = this.ctx;
      const flap = wing * 0.12;
      ctx.save();
      ctx.fillStyle = enemy.config.color;
      ctx.strokeStyle = "#2a211e";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(-10, -4);
      ctx.quadraticCurveTo(-34, -28 - flap, -44, -2);
      ctx.quadraticCurveTo(-30, -2, -14, 12 + flap * 0.25);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(10, -4);
      ctx.quadraticCurveTo(34, -28 - flap, 44, -2);
      ctx.quadraticCurveTo(30, -2, 14, 12 + flap * 0.25);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      ctx.beginPath(); ctx.ellipse(0, 4, 14, 18, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
      ctx.fillStyle = "#cfc6db";
      ctx.beginPath(); ctx.arc(-4, 0, 2, 0, Math.PI * 2); ctx.arc(4, 0, 2, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = "#2a211e";
      ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(-2, 18); ctx.lineTo(-4, 28); ctx.moveTo(2, 18); ctx.lineTo(4, 28); ctx.stroke();
      ctx.restore();
    }

    drawGullFallback(enemy, wing) {
      const ctx = this.ctx;
      const bodySwing = Math.sin((enemy.moveCycle || 0) * 2.8) * 0.12;
      const bob = Math.sin((enemy.moveCycle || 0) * 2.8) * 3.5;
      ctx.save();
      ctx.translate(0, bob);
      ctx.translate(-18, 2);
      ctx.rotate(bodySwing);
      ctx.translate(18, -2);
      ctx.fillStyle = enemy.config.color;
      ctx.strokeStyle = "#2a211e";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(-18, 4);
      ctx.quadraticCurveTo(-4, -14, 20, -6);
      ctx.quadraticCurveTo(36, 0, 18, 10);
      ctx.quadraticCurveTo(0, 18, -18, 4);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(-18, 4);
      ctx.lineTo(-30, -2);
      ctx.lineTo(-22, 8);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      ctx.strokeStyle = "#766a5e";
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(-4, 0); ctx.quadraticCurveTo(-14, -16 - wing * 0.05, -28, -10);
      ctx.moveTo(2, 0); ctx.quadraticCurveTo(10, -14 - wing * 0.04, 22, -10);
      ctx.stroke();
      ctx.fillStyle = "#fff8ea";
      ctx.beginPath();
      ctx.ellipse(8, 0, 10, 7, 0.1, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "#d19049";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(28, 0); ctx.lineTo(40, 3); ctx.lineTo(28, 8); ctx.closePath();
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = "#1f1f1f";
      ctx.beginPath();
      ctx.arc(18, -4, 1.8, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    drawHermitFallback(enemy) {
      const ctx = this.ctx;
      ctx.beginPath(); ctx.arc(0, 4, 16, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
      ctx.fillStyle = "#d8bc93";
      ctx.beginPath(); ctx.ellipse(6, 5, 12, 10, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
      ctx.strokeStyle = "#7a3d28";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(-12, 12); ctx.lineTo(-20, 20);
      ctx.moveTo(-2, 16); ctx.lineTo(-8, 24);
      ctx.moveTo(8, 16); ctx.lineTo(14, 24);
      ctx.stroke();
    }

    drawCrabFallback(enemy, limb) {
      const ctx = this.ctx;
      ctx.beginPath(); ctx.ellipse(0, 0, 20, 14, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
      ctx.strokeStyle = "#8f3026";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(-10, 8); ctx.lineTo(-18 - limb * 0.2, 18);
      ctx.moveTo(10, 8); ctx.lineTo(18 + limb * 0.2, 18);
      ctx.moveTo(-12, -2); ctx.lineTo(-24, -12);
      ctx.moveTo(12, -2); ctx.lineTo(24, -12);
      ctx.stroke();
    }

    drawBlackCatFallback(enemy, limb) {
      const ctx = this.ctx;
      ctx.beginPath(); ctx.ellipse(0, 0, 22, 12, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
      ctx.beginPath(); ctx.arc(16, -10, 10, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(10, -16); ctx.lineTo(14, -28); ctx.lineTo(18, -14); ctx.closePath(); ctx.moveTo(20, -14); ctx.lineTo(24, -28); ctx.lineTo(28, -12); ctx.closePath(); ctx.fill(); ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(-10, 8); ctx.lineTo(-12 - limb * 0.18, 26);
      ctx.moveTo(4, 8); ctx.lineTo(6 + limb * 0.18, 26);
      ctx.moveTo(-18, -2); ctx.quadraticCurveTo(-36, -14 - limb * 0.1, -28, 16);
      ctx.stroke();
    }

    drawOctopusFallback(enemy, limb) {
      const ctx = this.ctx;
      ctx.beginPath(); ctx.ellipse(0, -6, 24, 22, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
      ctx.strokeStyle = "#5b2f63";
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(-16, 10); ctx.quadraticCurveTo(-30, 24, -22 - limb * 0.15, 40);
      ctx.moveTo(-6, 12); ctx.quadraticCurveTo(-14, 30, -10, 44);
      ctx.moveTo(6, 12); ctx.quadraticCurveTo(14, 30, 10, 44);
      ctx.moveTo(16, 10); ctx.quadraticCurveTo(30, 24, 22 + limb * 0.15, 40);
      ctx.stroke();
    }

    drawSealFallback(enemy) {
      const ctx = this.ctx;
      const bob = Math.sin((enemy.moveCycle || 0) * 1.8) * 3.8;
      const sway = Math.sin((enemy.moveCycle || 0) * 1.6) * 0.05;
      ctx.save();
      ctx.translate(0, bob);
      ctx.translate(-22, 0);
      ctx.rotate(sway);
      ctx.translate(22, 0);
      ctx.beginPath(); ctx.ellipse(0, 4, 34, 18, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
      ctx.beginPath(); ctx.arc(26, -6, 12, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(-30, 2); ctx.lineTo(-48, -8); ctx.lineTo(-42, 10); ctx.closePath(); ctx.fill(); ctx.stroke();
      ctx.restore();
    }

    drawEnemySpriteLegs(enemy, limb) {
      const ctx = this.ctx;
      const isGorilla = enemy.type === "gorilla";
      const isBear = enemy.type === "bear";
      const isBoar = enemy.type === "boar";
      const yStart = isGorilla ? 18 : isBear ? 10 : isBoar ? 10 : 14;
      const yEnd = isGorilla ? 38 : isBear ? 24 : isBoar ? 28 : 22;
      const spacing = isGorilla ? 15 : isBear ? 13 : isBoar ? 11 : 8;
      const legColor = isGorilla ? "#2f2520" : isBear ? "#4f4036" : isBoar ? "#5a463d" : "#5b4636";
      const hoofColor = "#2e2622";
      ctx.save();
      ctx.strokeStyle = legColor;
      ctx.lineWidth = isGorilla ? 6 : isBear ? 5 : 4;
      ctx.lineCap = "round";
      const swingA = isGorilla ? limb * 0.22 : isBear ? limb * 0.26 : isBoar ? limb * 0.42 : limb * 0.58;
      const swingB = -swingA;
      ctx.beginPath();
      ctx.moveTo(-spacing, yStart); ctx.lineTo(-spacing + swingA, yEnd);
      ctx.moveTo(spacing, yStart); ctx.lineTo(spacing + swingB, yEnd);
      if (isBear || isBoar || isGorilla) {
        const innerSwingA = isGorilla ? swingA * 0.55 : isBear ? swingA * 0.45 : swingA * 0.8;
        const innerSwingB = isGorilla ? swingB * 0.55 : isBear ? swingB * 0.45 : swingB * 0.8;
        ctx.moveTo(-spacing * 0.35, yStart + 1); ctx.lineTo(-spacing * 0.35 + innerSwingB, yEnd - 1);
        ctx.moveTo(spacing * 0.35, yStart + 1); ctx.lineTo(spacing * 0.35 + innerSwingA, yEnd - 1);
      }
      ctx.stroke();
      ctx.strokeStyle = hoofColor;
      ctx.lineWidth = isGorilla ? 5 : isBear ? 4 : 3;
      ctx.beginPath();
      ctx.moveTo(-spacing - 4 + swingA, yEnd); ctx.lineTo(-spacing + 4 + swingA, yEnd);
      ctx.moveTo(spacing - 4 + swingB, yEnd); ctx.lineTo(spacing + 4 + swingB, yEnd);
      if (isBear || isBoar || isGorilla) {
        const innerSwingA = isGorilla ? swingA * 0.55 : isBear ? swingA * 0.45 : swingA * 0.8;
        const innerSwingB = isGorilla ? swingB * 0.55 : isBear ? swingB * 0.45 : swingB * 0.8;
        ctx.moveTo(-spacing * 0.35 - 4 + innerSwingB, yEnd - 1); ctx.lineTo(-spacing * 0.35 + 4 + innerSwingB, yEnd - 1);
        ctx.moveTo(spacing * 0.35 - 4 + innerSwingA, yEnd - 1); ctx.lineTo(spacing * 0.35 + 4 + innerSwingA, yEnd - 1);
      }
      ctx.stroke();
      ctx.restore();
    }

    drawHealthBar(enemy) {
      const ctx = this.ctx;
      const width = enemy.radius * 2;
      const ratio = Math.max(0, enemy.health / enemy.maxHealth);
      const barHeight = enemy.config.healthBarHeight || 7;
      ctx.fillStyle = "rgba(19, 32, 22, 0.4)";
      ctx.fillRect(-width / 2, -enemy.radius - 22, width, barHeight);
      ctx.fillStyle = "#8dd17d";
      ctx.fillRect(-width / 2, -enemy.radius - 22, width * ratio, barHeight);
    }

    drawProjectile(projectile) {
      const ctx = this.ctx;
      const spriteName = projectile.type === "stone" ? "stone" : projectile.type === "arrow" ? "arrow" : "shell";
      ctx.save();
      ctx.translate(projectile.x, projectile.y);
      if (this.getImage(spriteName)) {
        const aimY = projectile.target && projectile.target.alive ? ((projectile.target.targetY != null ? projectile.target.targetY : projectile.target.y) - 10) : projectile.y;
        const angle = projectile.target && projectile.target.alive ? Math.atan2(aimY - projectile.y, projectile.target.x - projectile.x) : 0;
        ctx.rotate(angle);
        const size = spriteName === "arrow" ? { w: 28, h: 10 } : spriteName === "shell" ? { w: 26, h: 26 } : { w: 20, h: 20 };
        this.drawCenteredImage(spriteName, 0, 0, size.w, size.h);
        ctx.restore();
        return;
      }
      ctx.strokeStyle = "#2a3441";
      ctx.fillStyle = projectile.type === "arrow" ? "#ebf2da" : projectile.type === "cannon" ? "#4a4a49" : "#7e7b75";
      ctx.lineWidth = 2;
      if (projectile.type === "arrow") {
        ctx.beginPath(); ctx.moveTo(-9, 0); ctx.lineTo(8, 0); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(8, 0); ctx.lineTo(2, -4); ctx.lineTo(2, 4); ctx.closePath(); ctx.fill();
        ctx.beginPath(); ctx.moveTo(-7, 0); ctx.lineTo(-11, -3); ctx.moveTo(-7, 0); ctx.lineTo(-11, 3); ctx.stroke();
      } else if (projectile.type === "stone") {
        ctx.beginPath(); ctx.ellipse(0, 0, projectile.radius, projectile.radius - 1, 0.4, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
      } else {
        ctx.beginPath(); ctx.arc(0, 0, projectile.radius, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
        ctx.fillStyle = "rgba(255, 201, 110, 0.35)";
        ctx.beginPath(); ctx.arc(-3, -3, 3, 0, Math.PI * 2); ctx.fill();
      }
      ctx.restore();
    }

    drawEffect(effect) {
      const ctx = this.ctx;
      const progress = 1 - effect.life / effect.maxLife;
      ctx.save();
      ctx.globalAlpha = 1 - progress;
      ctx.strokeStyle = effect.color;
      ctx.fillStyle = effect.color;
      if (effect.mode === "explosion") {
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.arc(effect.x, effect.y, effect.radius * progress, 0, Math.PI * 2);
        ctx.stroke();
      } else {
        ctx.beginPath();
        ctx.arc(effect.x, effect.y, 10 + effect.radius * progress, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }
  }

  TD.Renderer = Renderer;
})();






























