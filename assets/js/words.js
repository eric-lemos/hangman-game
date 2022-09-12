import { helper } from "./helper.js";
import { screen } from "./screen.js";
import { html } from "./dom.js";

export const words = {
    dict: ["alura", "oracle", "cursos", "tecnologia"],

    get: () => {
        if (words.dict.length > 0) {
            html.input.displayWords.innerHTML = "";
            screen.set(html.page.addWord.notFound, html.page.addWord.wordFound);
            Object.keys(words.dict).forEach((i) => {
                html.input.displayWords.innerHTML += `<span id="word-${i}" class="del">
                ${words.dict[i]} </span>`;
            });
        } else screen.set(html.page.addWord.wordFound, html.page.addWord.notFound);
    },

    put: () => {
        words.dict.push(html.input.addWordInput.value);
        helper.focus(html.input.addWordInput);
        html.input.addWordInput.value = "";
        words.get();
    },
};
