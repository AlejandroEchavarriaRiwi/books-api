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
document.addEventListener('DOMContentLoaded', () => {
    const deleteForm = document.getElementById('deleteForm');
    const booksController = new BooksController('http://190.147.64.47:5155');
    let token;
    let bookIdToDelete;
    function login() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const loginResult = yield booksController.postLogin({
                    email: 'prueba@prueba.pru',
                    password: 'C0ntr4S3gu++r4'
                });
                token = loginResult.data.token;
            }
            catch (error) {
                console.error('Login error:', error);
                throw error;
            }
        });
    }
    function searchBook(searchTitle) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const booksResponse = yield booksController.getBooks(token);
                return booksResponse.data.find(book => book.title.toLowerCase().includes(searchTitle.toLowerCase()));
            }
            catch (error) {
                console.error('Error fetching books:', error);
                throw error;
            }
        });
    }
    deleteForm.addEventListener('submit', (ev) => __awaiter(void 0, void 0, void 0, function* () {
        ev.preventDefault();
        const searchDeleteTitle = document.getElementById('searchDeleteTitle').value;
        try {
            if (!token) {
                yield login();
            }
            const book = yield searchBook(searchDeleteTitle);
            if (book) {
                bookIdToDelete = book.id;
                try {
                    yield booksController.deleteBook(bookIdToDelete, token);
                    deleteForm.reset();
                    Swal.fire({
                        title: 'Cool!',
                        text: 'the book was successfully deleted',
                        icon: 'success',
                        confirmButtonText: 'Continue'
                    });
                }
                catch (error) {
                    console.error(`Error deleting book:`, error);
                }
            }
            else {
                Swal.fire({
                    title: 'Error',
                    text: 'the book was not found',
                    icon: 'warning',
                    confirmButtonText: 'ok'
                });
            }
        }
        catch (error) {
            console.error('Error during search:', error);
            alert('An error occurred while searching for the book');
        }
    }));
});
