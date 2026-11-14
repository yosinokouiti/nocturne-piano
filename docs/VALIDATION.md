# Validation — 2026-11-14

## Automated rules and behaviour checks

`npm test` passes 22 tests (12 game/core checks and 10 Luna-care checks):

- identical pair streams for identical seeds;
- orthogonal four-piece group detection;
- gravity and ordering;
- multi-stage chains and adjacent nuisance removal;
- valid wall kicks;
- blocked-spawn loss;
- attack cancellation;
- reachable CPU movement paths and no mutation during search;
- bounded CPU simulation through 100 turns or a completed loss;
- cat care response, bounded movement and needs over ten simulated minutes;
- nuisance randomisation does not alter pair order;
- nuisance cap and carry-over between turns.

Measured 40-move CPU planning simulations for normal and hard modes completed in less than 250 ms total on this development machine. This is not a phone performance claim.

## Browser regression

`node tests/browser.cjs` passes in installed Chromium using software WebGL at:

- 1365 × 1000 desktop;
- 390 × 844 phone portrait;
- 820 × 1180 tablet portrait;
- 844 × 390 phone landscape.

Checks include 3D initialisation, no page/runtime/shader errors, no horizontal overflow, 32-track listing, pet/call response, match start, keyboard movement and rotation, hard drop, touch control activation, paused-state stability, listening mode, settings and reduced-motion/low-quality selection. Screenshots were inspected for desktop and phone layouts. A water-shader uniform precision mismatch found during testing was fixed before publication.

A real cross-origin MP3 from the released CC0 recording played successfully through the Web Audio analyser. The first track reported duration 299.52 seconds and a non-zero audio energy reading. Seeking to its end advanced to track 2 and resumed playback. The full 82-minute album was not listened through end to end. Other tracks are catalogued from the same archive's metadata; their download availability has not all been individually verified.

Additional browser checks passed for a blocked 3D module (static fallback with playable music/puzzle), defeat results, match restart and pause. The GitHub Pages publication succeeded; the live HTML hash matched the validated local HTML.

## Limits

Viewport emulation uses Chromium, not Safari or actual iPhone/iPad hardware. No claim of real-device frame rate, battery life, thermal stability or full assistive-technology compatibility is made. No subjective listening evaluation or commercial-release-level play-testing has been completed. The external audio host remains a runtime dependency. This is an independent, playable development edition.

## Luna activities (development 0.2)

Additional deterministic tests cover arrival before eating, hydration recovery, autonomous use of prepared food, cushion rest, declining play when sleepy, scratching/stretching/exploration completion, bounded toy sessions, cancellation, preserving care during chain celebrations, and safe needs restoration including zero values. The activities introduce no new third-party resources.

`tests/luna-browser.cjs` passed at 390 × 844 and 820 × 1180 in touch-enabled Chromium. All eight activity buttons, wand target taps, cancellation, physical travel/eating, needs recovery, reload persistence and no horizontal overflow/runtime/shader errors were checked. The phone layout screenshot was inspected. These remain emulated viewports, not real iOS hardware tests.
