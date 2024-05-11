/*
 *  Emoji Minesweeper
 *  Copyright (c) 2024 Michael Kolesidis
 *  GNU Affero General Public License v3.0
 *
 */

const themes = {
  mine: {
    name: 'mine',
    title: 'Emoji Minesweeper',
    mine: '../emoji/bomb_flat.png', // 💣
    detonation: '../emoji/collision_flat.png', // 💥
    won: '../emoji/grinning_face_with_smiling_eyes_flat.png', // 😄
    lost: '../emoji/knocked-out_face_flat.png', // 😵
  },
  flower: {
    name: 'flower',
    title: 'Emoji Flower Field',
    mine: '../emoji/hibiscus_flat.png', // 🌺
    detonation: '../emoji/bug_flat.png', // 🐛
    won: '../emoji/smiling_face_with_smiling_eyes_flat.png', // 😊
    lost: '../emoji/pensive_face_flat.png', // 😔
  },
  mushroom: {
    name: 'mushroom',
    title: 'Emoji Shroom Picker',
    mine: '../emoji/mushroom_flat.png', // 🍄
    detonation: '../emoji/unicorn_flat.png', // 🦄
    won: '../emoji/smiling_face_with_sunglasses_flat.png', // 😎
    lost: '../emoji/face_with_spiral_eyes_flat.png', // 😵‍💫
  },
  bear: {
    name: 'bear',
    title: 'Emoji Bearspotting',
    mine: '../emoji/bear_flat.png', // 🐻
    detonation: '../emoji/paw_prints_flat.png', // 🐾
    won: '../emoji/deciduous_tree_flat.png', // 🌳
    lost: '../emoji/wood_flat.png', // 🪵
  },
  surf: {
    name: 'surf',
    title: 'Emoji Surfsweeper',
    mine: '../emoji/person_surfing_flat_default.png', // 🏄
    detonation: '../emoji/squid_flat.png', // 🦑
    won: '../emoji/water_wave_flat.png', // 🌊
    lost: '../emoji/shark_flat.png', // 🦈
  },
  japan: {
    name: 'japan',
    title: '絵文字マインスイーパー',
    mine: '../emoji/japanese_castle_flat.png', // 🏯
    detonation: '../emoji/goblin_flat.png', // 👺
    won: '../emoji/cherry_blossom_flat.png', // 🌸
    lost: '../emoji/confounded_face_flat.png', // 😖
  },
};

const darkTheme = {
  closed: '../emoji/white_square_button_flat.png', // 🔳
  empty: '../emoji/black_large_square_flat.png', // ⬛
};
