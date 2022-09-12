import { screen } from "./screen.js";
import { words } from "./words.js";

export let game = {
    wrong_letters: [],
    right_letters: [],
    random_word: null,
    was_chose: false,

    choose_word: () => {
        if (!game.was_chose) {
            game.word = words.dict[Math.floor(Math.random() * words.dict.length)];
            game.was_chose = true;
        }
    },

    scene_mount: () => {
        game.choose_word();
        console.log(game.word);
    },

    restart: () => {},

    reset: () => {
        game.wrong_letters = [];
        game.right_letters = [];
        game.random_word = null;
        game.was_chose = false;
    },

    run: () => {
        screen.controller();
    },
};
