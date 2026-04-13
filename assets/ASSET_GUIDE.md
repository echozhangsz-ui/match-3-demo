# Asset Guide

Put replaceable resources in this folder structure.
The game will automatically use these files when they exist, and fall back to the built-in canvas art and generated audio when they do not.

## Audio
- `assets/audio/bgm.mp3`
  - Recommended: stereo, 44.1kHz or 48kHz, seamless loop
- `assets/audio/bgm.ogg`
  - Optional fallback for browsers that prefer OGG
- `assets/audio/throw.wav`
- `assets/audio/arrow.wav`
- `assets/audio/cannon.wav`
- `assets/audio/hit.wav`
- `assets/audio/base_hurt.wav`
- `assets/audio/enemy_die.wav`
- `assets/audio/place.wav`
- `assets/audio/wave_start.wav`
- `assets/audio/victory.wav`
- `assets/audio/celebrate.wav`
- `assets/audio/defeat.wav`
  - Recommended for SFX: mono or stereo, 44.1kHz, short clips

## Images
All PNG files should use transparent backgrounds unless noted.

- `assets/images/background.png` - 1280x720
  - Full background image
- `assets/images/route.png` - 1280x720
  - Route overlay only, transparent background
- `assets/images/props.png` - 1280x720
  - Trees, rocks, fences, props overlay only, transparent background
- `assets/images/slot_empty.png` - 48x48
  - Empty build marker
- `assets/images/slot_filled.png` - 48x48
  - Occupied build marker
- `assets/images/spawn.png` - 160x180
  - Spawn point art
- `assets/images/base.png` - 180x180
  - Player base art
- `assets/images/soldier.png` - 72x72
  - Infantry sprite
- `assets/images/archer.png` - 72x72
  - Archer sprite
- `assets/images/tower.png` - 96x120
  - Tower sprite
- `assets/images/monkey.png` - 72x72
  - Monkey enemy sprite
- `assets/images/boar.png` - 92x72
  - Boar enemy sprite
- `assets/images/bear.png` - 108x92
  - Bear enemy sprite
- `assets/images/stone.png` - 20x20
  - Stone projectile
- `assets/images/arrow.png` - 28x10
  - Arrow projectile
- `assets/images/shell.png` - 26x26
  - Cannon shell projectile

## Notes
- Keep the exact file names if you want direct replacement with no code changes.
- The current game treats unit and enemy images as single-frame sprites. Motion is still applied through code transforms.
- The current route, props, and background images are drawn as full-screen overlays, so they should match the game canvas size exactly.


