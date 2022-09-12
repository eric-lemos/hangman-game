export const helper = {
    show: (e) => {
        e.classList.remove("hide");
        e.classList.add("show");
    },

    hide: (e) => {
        e.classList.remove("show");
        e.classList.add("hide");
    },

    focus: (e) => {
        e.focus();
    },
};
