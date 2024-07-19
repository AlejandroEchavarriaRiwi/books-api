var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { BooksController } from "./controllers/books.controller.js";
document.addEventListener('DOMContentLoaded', () => __awaiter(void 0, void 0, void 0, function* () {
    const booksController = new BooksController('http://190.147.64.47:5155');
    let token;
    yield login();
    function login() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const loginResult = yield booksController.postLogin({
                    email: 'prueba@prueba.pru',
                    password: 'C0ntr4S3gu++r4'
                });
                token = loginResult.data.token;
                console.log(token);
                console.log('Login successful');
                yield fetchAndRenderBooks();
            }
            catch (error) {
                console.error('Login error:', error);
                throw error;
            }
        });
    }
    function fetchAndRenderBooks() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const booksResponse = yield booksController.getBooks(token);
                console.log('Books:', booksResponse.data);
                const data = booksResponse.data;
                data.forEach(book => {
                    renderBooks(book.title, book.author, book.description);
                });
            }
            catch (error) {
                console.log(`Error fetching books: ${error}`);
            }
        });
    }
    function renderBooks(title, author, description) {
        const cardsContainer = document.querySelector('.cardsContainer');
        const card = document.createElement('div');
        card.classList.add('cardBook');
        const bookTitle = document.createElement('h3');
        bookTitle.textContent = title;
        const bookAuthor = document.createElement('h5');
        bookAuthor.textContent = author;
        const bookDescription = document.createElement('p');
        bookDescription.textContent = description;
        card.appendChild(bookTitle);
        card.appendChild(bookAuthor);
        card.appendChild(bookDescription);
        cardsContainer.appendChild(card);
    }
}));
