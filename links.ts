document.addEventListener('DOMContentLoaded', () => {
    const home = document.querySelector("#home") as HTMLLIElement;
    const register = document.querySelector("#register") as HTMLLIElement;
    const createBook = document.querySelector("#createBook") as HTMLLIElement;
    const editBook = document.querySelector("#editBook") as HTMLLIElement;
    const deleteBook = document.querySelector("#deleteBook") as HTMLLIElement;

    home.addEventListener("click", (ev:Event) => {
        ev.preventDefault();
        window.location.href = "./index.html"
    })

    register.addEventListener("click", (ev:Event) => {
        ev.preventDefault();
        window.location.href = "./register.html"
    })

    createBook.addEventListener("click", (ev:Event) => {
        ev.preventDefault();
        window.location.href = "./createBook.html"
    })

    editBook.addEventListener("click", (ev:Event) => {
        ev.preventDefault();
        window.location.href = "./editBook.html"
    })

    deleteBook.addEventListener("click", (ev:Event) => {
        ev.preventDefault();
        window.location.href = "./deleteBook.html"
    })
});