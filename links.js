"use strict";
document.addEventListener('DOMContentLoaded', () => {
    const home = document.querySelector("#home");
    const register = document.querySelector("#register");
    const createBook = document.querySelector("#createBook");
    const editBook = document.querySelector("#editBook");
    const deleteBook = document.querySelector("#deleteBook");
    home.addEventListener("click", (ev) => {
        ev.preventDefault();
        window.location.href = "./index.html";
    });
    register.addEventListener("click", (ev) => {
        ev.preventDefault();
        window.location.href = "./register.html";
    });
    createBook.addEventListener("click", (ev) => {
        ev.preventDefault();
        window.location.href = "./createBook.html";
    });
    editBook.addEventListener("click", (ev) => {
        ev.preventDefault();
        window.location.href = "./editBook.html";
    });
    deleteBook.addEventListener("click", (ev) => {
        ev.preventDefault();
        window.location.href = "./deleteBook.html";
    });
});
