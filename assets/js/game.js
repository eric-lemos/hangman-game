import { helper } from "./helper.js";
import { screen } from "./screen.js";
import { words } from "./words.js";
import { html } from "./dom.js";

export let game = {
    wrong_letters: [],
    right_letters: [],
    secret_word: null,
    was_chose: false,
    result: null,
    status: null,
    input: null,

    choose_word: () => {
        if (!game.was_chose) {
            html.input.rightLetters.innerHTML = "";
            html.input.wrongLetters.innerHTML = "";
            game.secret_word = words.dict[Math.floor(Math.random() * words.dict.length)];
            game.status = "running";
            game.was_chose = true;
        }
    },

    get_strokes: () => {
        for (let i = 0; i < game.secret_word.length; i++) {
            html.input.rightLetters.innerHTML += `<input id="l${i}" type="text" disabled />`;
        }
    },

    hide_hanged: () => {
        for (let i = 1; i <= 6; i++) {
            helper.hide(document.getElementById(`error-${i}`));
        }
    },

    draw_hanged: () => {
        if (game.wrong_letters.length <= 6) {
            for (let i = 1; i <= game.wrong_letters.length; i++) {
                helper.show(document.getElementById(`error-${i}`));
            }
        } else {
            for (let i = 1; i <= game.wrong_letters.length; i++) {
                if (i < 7) document.getElementById(`error-${i}`).classList.add("fail");
            }
        }
    },

    check_match: () => {
        if (game.secret_word == game.right_letters.join("")) {
            game.status = "stopped";
            game.result = "victory";
            game.victory();
        } else if (game.wrong_letters.length > 6) {
            game.status = "stopped";
            game.result = "defeat";
            game.defeat();
        }
    },

    victory: () => {
        helper.show(html.modal.alert);
        html.modal.msg.innerHTML = `
            <div>
                <p>FIM DO JOGO</p>
                <h3>Parabéns, você acertou!</h3> 
                <p>A palavra secreta era <strong>${game.secret_word}</strong></p>
            </div>
            <button id="btnNewGameConfirm" class="btn btn-md dark">Novo jogo</button>
            <button id="btnBackToMainMenu" class="btn btn-md light">Voltar ao Menu</button>
        `;
    },

    defeat: () => {
        helper.show(html.modal.alert);
        html.modal.msg.innerHTML = `
            <div>
                <p>FIM DO JOGO</p>
                <h3>Que pena... você errou!</h3> 
                <p>A palavra secreta era <strong>${game.secret_word}</strong></p>
            </div>
            <button id="btnNewGameConfirm" class="btn btn-md dark">Novo jogo</button>
            <button id="btnBackToMainMenu" class="btn btn-md light">Voltar ao Menu</button>
        `;
    },

    controller: () => {
        document.addEventListener("keydown", (event) => {
            game.input = helper.normalize(event.key);

            if (game.status === "running" && event.keyCode >= 65 && event.keyCode <= 90) {
                if (game.secret_word.includes(game.input) && !game.right_letters.includes(game.input)) {
                    for (let i = 0; i < game.secret_word.length; i++) {
                        if (game.input === game.secret_word[i]) {
                            document.getElementById(`l${i}`).value = game.input;
                            game.right_letters[i] = game.input;
                        }
                    }
                } else if (!game.secret_word.includes(game.input) && !game.wrong_letters.includes(game.input)) {
                    html.input.wrongLetters.innerHTML += `<span>${game.input}</span> `;
                    game.wrong_letters.push(game.input);
                    game.draw_hanged();
                }
                game.check_match();
            }
        });
    },

    start: () => {
        game.reset();
        game.choose_word();
        game.get_strokes();
        game.controller();
    },

    restart: () => {
        game.start();
    },

    reset: () => {
        game.wrong_letters = [];
        game.right_letters = [];
        game.secret_word = null;
        game.was_chose = false;
        game.status = null;
        game.hide_hanged();
    },

    run: () => {
        screen.controller();
    },
};
