# Nocturne: Moonlit Garden — third-party notices

## Three.js r170 / 0.170.0

- Project: https://github.com/mrdoob/three.js
- Exact source: https://raw.githubusercontent.com/mrdoob/three.js/r170/build/three.module.min.js
- License: MIT. Copyright 2010–2024 Three.js Authors.
- Complete license is retained at `vendor/THREE-LICENSE.txt`; the distributed JavaScript retains its license header.
- Used for WebGL rendering, geometry, materials, animation transforms and ray casting. The sky and water shaders are original code in `world.js`.

## J. S. Bach — Open Goldberg Variations, BWV 988 (2012)

- Piano: Kimiko Ishizaka. Producer: Anne-Marie Sylvestre. Recorded at Teldex Studio, Berlin, on a Bösendorfer 290 Imperial.
- Official project and rights statement: https://opengoldbergvariations.org/
- Distributed recording: https://archive.org/details/The_Open_Goldberg_Variations-11823
- Machine-readable recording license: https://archive.org/metadata/The_Open_Goldberg_Variations-11823 (`metadata.licenseurl` identifies CC0).
- License: CC0 1.0 Universal, https://creativecommons.org/publicdomain/zero/1.0/
- All 32 complete MP3 tracks are referenced in `tracks.json`, including the opening Aria, Variations 1–30, and the final Aria da Capo. Files are streamed unchanged, not reconstructed or extended with generated note loops. The underlying Bach composition is public domain.
- Recording duration and audio files were inspected from the archive metadata on 2026-11-14. Internet access to the external media host is necessary; availability and download performance depend on that host. No subscription, API key or payment is required by this app.

## Original assets and code

The cat model, procedural joint animation, utility behaviour, garden geometry, visual effects, puzzle rules and AI, UI and shaders were made for this project. No third-party character models, screenshots, images, animation clips, fonts, game assets or commercial game code are bundled. The existing root app is preserved independently; its own older asset notices still apply to that older app.

This notices file documents third-party rights; it does not assign a new license to the owner's original project.

## Musopen orchestral recordings (development 0.3)

25 complete recordings/movements by Musopen Symphony Orchestra were added from the 2012 Kickstarter project: Mozart's Magic Flute and Marriage of Figaro overtures and Symphony No. 40; Beethoven's Coriolan and Egmont overtures and Symphony No. 3; Grieg's Peer Gynt Suite No. 1; Smetana's Vltava; Brahms's Symphony No. 4; Tchaikovsky's Symphony No. 6. Each selected movement has its own URL and duration in `tracks.json`.

Rights evidence: the rights-holder's project completion statement explicitly permits sharing, editing and remixing as public-domain music: https://musopen.org/blog/musopen-kickstarter-project-1-complete/ . That page links the official archive DVD release: https://archive.org/details/musopen-dvd . The derivative MP3 files used here are in https://archive.org/details/MusopenCollectionAsFlac, whose metadata identifies https://creativecommons.org/publicdomain/mark/1.0/ . This public-domain marking is distinct from the CC0 dedication for the Ishizaka piano album. No claim that all Musopen uploads are freely reusable is made.

## Official anime-song videos

The app offers ordinary visible YouTube embedded players, instantiated only when a user chooses a video. Video/audio content is not downloaded into the repository, extracted, re-hosted, remixed or passed into the Web Audio analyser. Rights remain with the respective owners. Official player branding, controls and source links remain visible. No claim of a redistribution license for these songs is made.

- YOASOBI, アイドル: https://www.youtube.com/watch?v=ZRtdQ81jPUQ . Verified through artist announcement https://www.yoasobi-music.jp/news/551361 .
- Kenshi Yonezu, ピースサイン: https://www.youtube.com/watch?v=9aJVr5tTTWk . Verified through https://reissuerecords.net/2024/10/18/peacesign_mv_300million/ and the artist's official YouTube channel.
- Official embedding documentation: https://developers.google.com/youtube/player_parameters .

Availability, regional restrictions, ads and embed permissions are controlled by YouTube and the rights-holder; an external official-page link is provided. YouTube audio is not analysed or represented as synchronised to the cat.

## User-selected audio

Users may select audio files on their own device. Object URLs are used for local playback and analysis; file contents are not uploaded by the app. These files are not included in the public library, are not persisted across reloads and do not grant the app any redistribution rights. Clearing local files revokes their object URLs.
