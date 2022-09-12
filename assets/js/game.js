import { screen } from "./screen.js";
import { words } from "./words.js";

export const game = {
    wrong_letters: [],
    right_letters: [],

    choose_word: () => {
        let word = words.dict[Math.floor(Math.random() * words.dict.length)];

        console.log(word);
    },

    run: () => {
        screen.controller();
    },
};
