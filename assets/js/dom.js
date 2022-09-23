export const html = {
    page: {
        addWord: {
            main: document.getElementById("pageAddWord"),
            displayWords: document.getElementById("displayWords"),
            wordFound: document.getElementById("pageWordFound"),
            notFound: document.getElementById("pageNotFound"),
        },
        mainMenu: document.getElementById("pageMainMenu"),
        newGame: document.getElementById("pageNewGame"),
    },

    btn: {
        // MainMenu
        startGame: document.getElementById("btnStartGame"),
        addWord: document.getElementById("btnAddWord"),

        // StartGame
        startNewGame: document.getElementById("btnStartNewGame"),
        stopCurrentGame: document.getElementById("btnStopCurrentGame"),

        // AddWord
        saveWord: document.getElementById("btnSaveWord"),
        cancelWord: document.getElementById("btnCancelWord"),
    },

    input: {
        addWordInput: document.getElementById("addWordInput"),
        displayWords: document.getElementById("displayWords"),
        rightLetters: document.getElementById("right-letters"),
        wrongLetters: document.getElementById("wrong-letters"),
    },

    modal: {
        alert: document.getElementById("alert"),
        close: document.getElementById("close"),
        msg: document.getElementById("msg"),
    },
};
