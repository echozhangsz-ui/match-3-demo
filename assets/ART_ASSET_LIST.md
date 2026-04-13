# Art Asset List

## Forest Scene

| File | Path | Size | Format |
|---|---|---|---|
| background.png | `assets/images/scenes/forest/background.png` | 1280x720 | PNG |
| route.png | `assets/images/scenes/forest/route.png` | 1280x720 | PNG |
| props.png | `assets/images/scenes/forest/props.png` | 1280x720 | PNG |
| spawn.png | `assets/images/scenes/forest/spawn.png` | 160x180 | PNG |
| base.png | `assets/images/scenes/forest/base.png` | 180x180 | PNG |
| slot_empty.png | `assets/images/scenes/forest/slot_empty.png` | 48x48 | PNG |
| units/soldier.png | `assets/images/scenes/forest/units/soldier.png` | 72x72 | PNG |
| units/archer.png | `assets/images/scenes/forest/units/archer.png` | 72x72 | PNG |
| units/tower.png | `assets/images/scenes/forest/units/tower.png` | 96x120 | PNG |
| enemies/monkey.png | `assets/images/scenes/forest/enemies/monkey.png` | 72x72 | PNG |
| enemies/boar.png | `assets/images/scenes/forest/enemies/boar.png` | 92x72 | PNG |
| enemies/bear.png | `assets/images/scenes/forest/enemies/bear.png` | 108x92 | PNG |
| enemies/gorilla.png | `assets/images/scenes/forest/enemies/gorilla.png` | 132x118 | PNG |
| enemies/bat.png | `assets/images/scenes/forest/enemies/bat.png` | 84x58 | PNG |
| bgm.mp3 | `assets/audio/scenes/forest/bgm.mp3` | loop | MP3 |
| bgm.ogg | `assets/audio/scenes/forest/bgm.ogg` | loop | OGG |

## Beach Scene

| File | Path | Size | Format |
|---|---|---|---|
| background.png | `assets/images/scenes/beach/background.png` | 1280x720 | PNG |
| route.png | `assets/images/scenes/beach/route.png` | 1280x720 | PNG |
| props.png | `assets/images/scenes/beach/props.png` | 1280x720 | PNG |
| spawn.png | `assets/images/scenes/beach/spawn.png` | 160x180 | PNG |
| base.png | `assets/images/scenes/beach/base.png` | 180x180 | PNG |
| slot_empty.png | `assets/images/scenes/beach/slot_empty.png` | 48x48 | PNG |
| units/soldier.png | `assets/images/scenes/beach/units/soldier.png` | 72x72 | PNG |
| units/archer.png | `assets/images/scenes/beach/units/archer.png` | 72x72 | PNG |
| units/tower.png | `assets/images/scenes/beach/units/tower.png` | 96x120 | PNG |
| enemies/hermit.png | `assets/images/scenes/beach/enemies/hermit.png` | 70x56 | PNG |
| enemies/crab.png | `assets/images/scenes/beach/enemies/crab.png` | 82x60 | PNG |
| enemies/blackcat.png | `assets/images/scenes/beach/enemies/blackcat.png` | 86x62 | PNG |
| enemies/gull.png | `assets/images/scenes/beach/enemies/gull.png` | 92x56 | PNG |
| enemies/octopus.png | `assets/images/scenes/beach/enemies/octopus.png` | 96x86 | PNG |
| enemies/seal.png | `assets/images/scenes/beach/enemies/seal.png` | 118x82 | PNG |
| bgm.mp3 | `assets/audio/scenes/beach/bgm.mp3` | loop | MP3 |
| bgm.ogg | `assets/audio/scenes/beach/bgm.ogg` | loop | OGG |

## Shared Assets

| File | Path | Size | Format |
|---|---|---|---|
| slot_filled.png | `assets/images/slot_filled.png` | 48x48 | PNG |
| soldier.png | `assets/images/soldier.png` | 72x72 | PNG |
| archer.png | `assets/images/archer.png` | 72x72 | PNG |
| tower.png | `assets/images/tower.png` | 96x120 | PNG |
| stone.png | `assets/images/stone.png` | 20x20 | PNG |
| arrow.png | `assets/images/arrow.png` | 28x10 | PNG |
| shell.png | `assets/images/shell.png` | 26x26 | PNG |
| bgm.mp3 | `assets/audio/bgm.mp3` | loop | MP3 |
| bgm.ogg | `assets/audio/bgm.ogg` | loop | OGG |
| hud_gold.png | `assets/images/ui/hud_gold.png` | 32x32 | PNG |
| hud_life.png | `assets/images/ui/hud_life.png` | 32x32 | PNG |
| hud_wave.png | `assets/images/ui/hud_wave.png` | 32x32 | PNG |
| button_soldier.png | `assets/images/ui/button_soldier.png` | 64x64 | PNG |
| button_archer.png | `assets/images/ui/button_archer.png` | 64x64 | PNG |
| button_tower.png | `assets/images/ui/button_tower.png` | 64x64 | PNG |
| panel_victory.png | `assets/images/ui/panel_victory.png` | 520x320 | PNG |
| panel_defeat.png | `assets/images/ui/panel_defeat.png` | 520x320 | PNG |

## Notes
- Scene-specific BGM overrides shared BGM when present.
- Scene-specific unit, enemy, and `slot_empty` assets override shared art when present.
- If a scene file is missing, the game falls back to shared art or built-in Canvas art.
