import { helper } from "./helper.js";
import { screen } from "./screen.js";
import { html } from "./dom.js";

export const words = {
    dict: ["alura", "oracle", "cursos", "git", "github", "html", "css", "emprego"],

    get: () => {
        if (words.dict.length > 0) {
            html.input.displayWords.innerHTML = "";
            screen.set(html.page.addWord.notFound, html.page.addWord.wordFound);
            Object.keys(words.dict).forEach((i) => {
                html.input.displayWords.innerHTML += `
                <span class="del">
                    <img id="word-${i}" src="${window.location.origin}/${
                    window.location.pathname.split("/")[1]
                }/assets/img/delete.svg" />${words.dict[i]}</span>`;
            });
        } else screen.set(html.page.addWord.wordFound, html.page.addWord.notFound);
    },

    put: () => {
        if (!words.dict.includes(html.input.addWordInput.value)) {
            words.dict.push(html.input.addWordInput.value);
        } else {
            helper.show(html.modal.alert);
            html.modal.msg.innerHTML = `
                <div>
                    <h3>ATENÇÃO!</h3> 
                    <p>A palavra <strong>${html.input.addWordInput.value}</strong> já existe!</p>
                </div>
                <button id="btnModalConfirm" class="btn btn-md dark">OK</button>
            `;
        }

        helper.focus(html.input.addWordInput);
        html.input.addWordInput.value = "";
        words.get();
    },

    del: () => {
        document.addEventListener("click", (e) => {
            Object.keys(words.dict).forEach((i) => {
                if (e.composedPath()[0].id === `word-${i}`) {
                    console.log(`del => ${words.dict[i]}`);
                    words.dict.splice(i, 1);
                    words.get();
                }
            });
        });
    },
};
