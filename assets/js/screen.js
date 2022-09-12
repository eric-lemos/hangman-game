import { helper } from "./helper.js";
import { words } from "./words.js";
import { game } from "./game.js";
import { html } from "./dom.js";

export const screen = {
    set: (h, s) => {
        helper.hide(h);
        helper.show(s);
    },

    controller: () => {
        addEventListener("click", (event) => {
            switch (event.path[0].id) {
                // MainMenu
                case "btnStartGame":
                    screen.set(html.page.mainMenu, html.page.newGame);
                    game.scene_mount();
                    break;

                case "btnAddWord":
                    screen.set(html.page.mainMenu, html.page.addWord.main);
                    helper.focus(html.input.addWordInput);
                    words.get();
                    break;

                // StartGame
                case "btnStartNewGame":
                    console.log("Confirm Start New Game!");
                    game.restart();
                    break;

                case "btnStopCurrentGame":
                    console.log("Confirm Strop Current Game!");
                    screen.set(html.page.newGame, html.page.mainMenu);
                    game.reset();
                    break;

                // AddWord
                case "btnSaveWord":
                    if (html.input.addWordInput.value.length >= 2 && html.input.addWordInput.value.length <= 8)
                        words.put();
                    else if (html.input.addWordInput.value.length == 0) console.log("Input vazio!");
                    else if (html.input.addWordInput.value.length > 8) console.log("Input > 8");
                    break;

                case "btnCancelWord":
                    screen.set(html.page.addWord.main, html.page.mainMenu);
                    break;
            }
        });
    },
};
