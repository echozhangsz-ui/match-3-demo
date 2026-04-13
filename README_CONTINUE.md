# Continue Notes

This file is a quick restart guide for continuing development on this tower defense demo later.

## Project Folder
- `C:\Users\Sandbox\Downloads\Codex\Codex tower defense 2`

## How To Run
Open PowerShell in the project folder and run:

```powershell
cd "C:\Users\Sandbox\Downloads\Codex\Codex tower defense 2"
& "C:\Program Files\nodejs\node.exe" local-server.js
```

Then open:
- `http://127.0.0.1:8000/`

If the browser seems cached, use:
- `Ctrl + F5`
- or add a query string like `?v=test`

## Main Files
- `index.html`
  Page structure and script loading order
- `style.css`
  UI styles, Victory/Defeat panel styles, animation styles
- `main.js`
  Startup flow and asset loading entry
- `config/map.js`
  Route points, spawn/base positions, placement slots
- `config/assets.js`
  External asset manifest
- `entities/unit.js`
  Unit logic
- `entities/enemy.js`
  Enemy movement and enemy animation state values
- `render/renderer.js`
  Main drawing logic, unit/enemy visual animation
- `audio/audioManager.js`
  BGM and SFX loading / fallback generation
- `ui/hudUI.js`
  Top HUD and unit buttons
- `ui/victoryUI.js`
  Victory panel behavior and confetti
- `ui/defeatUI.js`
  Defeat panel behavior

## Art Assets
Important references:
- `assets/ART_ASSET_LIST.md`
- `assets/ART_PROMPTS.md`
- `assets/path-layout-reference.png`

Asset folders:
- `assets/images/`
- `assets/images/ui/`
- `assets/audio/`

## Current State
- Browser-playable 2D tower defense prototype
- Forest theme
- External art/audio replacement supported
- Left-side spawn cave, right-side base
- Curved route with fixed placement slots
- Unit attack projectiles and simple combat animations
- Enemy walk leg animation
- Victory / Defeat UI implemented

## Good Next Steps
Examples of future improvements:
- Better enemy hit / death animation
- Better soldier attack animation
- Start menu / pause / speed controls
- More polished route-side decorations
- Better wave pacing and balancing
- Asset pipeline cleanup for Unity migration
- Exporting map/path data in Unity-friendly format

## Suggestion
Before big changes, make a backup copy of the whole project folder.
