# Moonlit Garden — independent development edition 0.3

## Preservation and publishing

The existing root `index.html` (v1.8 at the start of this work) is not modified. A snapshot is retained in Git branch `archive/v1.8-before-nocturne-next` at commit `14b8c8d8f623dd276a67494910451f0c9911ea9c`. New files are under `dev/`; GitHub Pages serves them at `/nocturne-piano/dev/` without a build, backend, account, paid service or additional deployment product. A copy of the old page is also saved under `versions/v1.8/index.html`.

## Architecture

- `core.js`: seeded pair stream, collision/rotation with kicks, reachable placement search, score/chain/garbage/cancellation state machine, CPU evaluation. No DOM, renderer or audio dependency.
- `cat.js`: utility selection and bounded navigation driven by curiosity, energy, trust and excitement. Behaviours include wandering, approaching, sniffing, sitting, watching, grooming, sleeping, nuzzling and pouncing. Time-based transitions and bounded steps avoid frame-rate-dependent decision probability.
- `world.js`: Three.js r170, original articulated quadruped mesh, joint gait, tail wave, breathing, blink, easing between poses, shadows, original sky/water GLSL, fireflies, lanterns, a physically integrated toy ball with bounce/friction, slow lighting cycle and camera drift.
- `music.js`: unaltered full-length CC0 piano recordings through HTMLAudioElement, one MediaElementSource and Web Audio analyser. A reusable media element permits native streaming rather than decoding an entire album into memory. No synthesized stand-in is used for a full work.
- `app.js`: application state, input, touch and keyboard, CPU reaction scheduling, Canvas2D board rendering, dialogs, safe preference persistence, pause/lifecycle handling, quality adaptation.

## Research and implementation decisions

Reviewed primary sources:

- Three.js: https://github.com/mrdoob/three.js and the r170 MIT license. Chosen for a focused 3D garden with a small static deployment. Vendored at a fixed version; no runtime CDN dependency for code.
- Phaser: https://github.com/phaserjs/phaser (MIT). Useful for 2D games; a second full renderer was unnecessary alongside the 3D garden. The puzzle uses a separate deterministic core and lightweight Canvas2D renderer.
- cannon-es: https://github.com/pmndrs/cannon-es (MIT). Evaluated, not shipped. Full rigid-body simulation was not needed for the cat; kinematic navigation and explicit toy bounce/friction give bounded mobile cost.
- Kenney Cube Pets: https://kenney.nl/assets/cube-pets (CC0). Evaluated, not bundled. An original articulated cat allows more control over four-legged locomotion, face, resting and care poses without imposing a cubic visual style.
- Open Goldberg Variations: https://opengoldbergvariations.org/ and Archive item metadata. CC0 recording confirmed for the specific release, rather than assuming every modern performance of Bach is public domain.
- Musopen FAQ: https://musopen.org/faq/ . Used to distinguish composition rights from recording rights; no unverified Musopen recording is bundled.

## Interactions and fairness

Recorded audio level and detected energy rises affect the garden's light/water and the cat's attention. Player chains add light, fireflies and cat curiosity/play, while losses bring the cat closer. Cat trust and state persist locally; rest recovers energy. Day/night influences fatigue. Music affects the board's glow, while neither audio volume nor affection secretly changes competitive rules. Both players get the same seeded colour sequence, separate from nuisance randomness, and the same gravity acceleration. CPU difficulty changes reaction time, error rate and search depth, not its score or pieces.

## Running and testing

From this directory: `npm test`. Serve with `python3 -m http.server 4173`, then open `http://localhost:4173/dev/`. There is no install step: the only runtime library is vendored. Tests use the Node built-in test runner. `tests/browser.cjs` uses a locally available Playwright installation and Chromium; supply `PLAYWRIGHT_MODULE` and `CHROMIUM_PATH` for another workstation.

## Current limits and acceptance

This is a playable development edition, not a claim of shipping-quality parity with a commercial indie game. The cat has procedural animation and rule-based autonomy, not a photorealistic scanned model or a trained animal policy. Human play-testing and tuning remain necessary. Browser responsive checks are not a substitute for real iPhone/iPad Safari profiling, thermal/battery tests or accessibility review. Audio streams from Internet Archive; it is not an offline soundtrack. No online multiplayer or cloud saves are provided.

WebGL failure falls back to a static scene while keeping music and the puzzle available. Context loss reports an actionable message. Visibility changes pause the match and audio. Reduced-motion and lower-quality modes are offered; portrait and tablet layouts use touch targets and capped render resolution. Offscreen 3D rendering and board drawing are suspended while cat time and match logic remain independent. Trust gradually changes how often the cat approaches and the garden's firefly glow. The older root app remains the stable choice during development.

## Luna care and play (0.2)

Eight activities are available below the garden: food, water, ball, feather wand, scratching post, cushion rest, three-stop exploration and stretching. Props and animations are original geometry. Travel and arrival are separate from eating/drinking/resting, so needs change at the destination rather than on a button press. The wand target can be moved by tapping the garden; ball play follows a bouncing toy and includes timed paw taps. Food and water left out can be chosen autonomously later.

Satiety and hydration are gentle local preferences, not a neglect/death mechanic. Sleepiness can decline toy play, fullness can leave a prepared portion for later, and a stop action returns the cat to its own routine. Chain celebrations preserve care tasks. Energy, satiety, hydration and familiarity are stored locally with backwards-compatible restoration; away time restores rest without draining needs. No new network services or third-party assets are introduced.

## Music library (0.3)

The native library now contains 57 complete recordings/movements: 32 Ishizaka piano tracks and 25 Musopen orchestral tracks (214:05 additional audio). Filtering and search separate piano, orchestra, official anime videos and device files. Performer/composer/source/license are recorded per built-in audio track.

Two official anime-song videos are presented through a normal, visible YouTube player. Selecting a video pauses native audio; selecting native audio closes the video. The game does not auto-start native audio while a video is selected. Leaving the page closes the video. Native timeline/previous/next controls are disabled in video mode, and the native volume control is labelled separately. The video cannot feed the audio-reactive scene; this is stated in the interface. If a user supplies a playable local audio file, it can use the native analyser without any upload.

Local files use blob URLs and do not survive a page reload. Their URLs are revoked on explicit clearing, and a local file added during a slow catalog fetch is retained. No music-conversion, unlicensed orchestration, audio extraction from streaming services or backend is introduced.

All 25 added orchestral URLs were checked with HTTP HEAD and returned status 200. Content types and CORS headers are retained in `ORCHESTRA_SOURCES.json`.
