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
        // Buttons in MainMenu
        html.btn.startGame.addEventListener("click", (e) => {
            screen.set(html.page.mainMenu, html.page.newGame);
            game.start();
        });

        html.btn.addWord.addEventListener("click", (e) => {
            screen.set(html.page.mainMenu, html.page.addWord.main);
            helper.focus(html.input.addWordInput);
            words.get();
            words.del();
        });

        // Buttons in NewGame
        html.btn.startNewGame.addEventListener("click", (e) => {
            helper.show(html.modal.alert);
            html.modal.msg.innerHTML = `
                <div>
                    <h3>ATENÇÃO!</h3> 
                    <p>O seu jogo está em andamento...</p>
                    <p>Você tem certeza que deseja criar um novo jogo?</p>
                </div>
                <button id="btnNewGameConfirm" class="btn btn-md dark">Recriar jogo</button>
                <button id="btnNewGameCancel" class="btn btn-md light">Continuar no atual</button>
            `;
        });

        html.btn.stopCurrentGame.addEventListener("click", (e) => {
            helper.show(html.modal.alert);
            html.modal.msg.innerHTML = `
                <div>
                    <h3>ATENÇÃO!</h3> 
                    <p>Você tem certeza que deseja desistir?</p>
                </div>
                <button id="btnStopConfirm" class="btn btn-md dark">Desistir</button>
                <button id="btnStopCancel" class="btn btn-md light">Continuar jogo</button>
            `;

            document.getElementById("btnStopConfirm").addEventListener("click", () => {
                screen.set(html.page.newGame, html.page.mainMenu);
                helper.hide(html.modal.alert);
                game.reset();
            });

            document.getElementById("btnStopCancel").addEventListener("click", () => {
                helper.hide(html.modal.alert);
            });
        });

        // Buttons in AddWord
        html.btn.saveWord.addEventListener("click", (e) => {
            if (html.input.addWordInput.value.length >= 2 && html.input.addWordInput.value.length <= 8) words.put();
            else if (html.input.addWordInput.value.length == 0) {
                helper.show(html.modal.alert);
                html.modal.msg.innerHTML = `
                    <div>
                        <h3>ATENÇÃO!</h3> 
                        <p>Você precisar digitar uma palavra antes de adicionar-la a lista de palavras cadastradas.</p>
                    </div>
                    <button id="btnModalConfirm" class="btn btn-md dark">OK</button>
                `;
            } else if (html.input.addWordInput.value.length > 8) {
                helper.show(html.modal.alert);
                html.modal.msg.innerHTML = `
                    <div>
                        <h3>ATENÇÃO!</h3> 
                        <p>A palavra digitada tem mais de 8 letras.</p>
                    </div>
                    <button id="btnModalConfirm" class="btn btn-md dark">OK</button>
                `;
            }
        });

        html.btn.cancelWord.addEventListener("click", (e) => {
            screen.set(html.page.addWord.main, html.page.mainMenu);
        });

        // Buttons in Modal - Alert;
        document.addEventListener("click", (e) => {
            switch (e.composedPath()[0].id) {
                case "btnBackToMainMenu":
                    screen.set(html.page.newGame, html.page.mainMenu);
                    helper.hide(html.modal.alert);
                    break;

                case "btnNewGameConfirm":
                    helper.hide(html.modal.alert);
                    game.restart();
                    break;

                case "btnNewGameCancel":
                    helper.hide(html.modal.alert);
                    break;

                case "btnModalConfirm":
                    helper.hide(html.modal.alert);
                    break;
            }
        });
    },
};
