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
    const searchForm = document.getElementById('searchForm');
    const editForm = document.getElementById('editForm');
    const booksController = new BooksController('http://190.147.64.47:5155');
    let token;
    function login() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const loginResult = yield booksController.postLogin({
                    email: 'prueba@prueba.pru',
                    password: 'C0ntr4S3gu++r4'
                });
                token = loginResult.data.token;
                console.log('Login successful');
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
                console.log('Books received:', booksResponse.data);
                return booksResponse.data.find(book => book.title.toLowerCase().includes(searchTitle.toLowerCase()));
            }
            catch (error) {
                Swal.fire({
                    title: 'Error',
                    text: 'the book was not found',
                    icon: 'warning',
                    confirmButtonText: 'ok'
                });
                throw error;
            }
        });
    }
    function populateForm(book) {
        console.log('Populating form with book:', book);
        document.getElementById('bookId').value = book.id;
        document.getElementById('title').value = book.title;
        document.getElementById('author').value = book.author;
        document.getElementById('description').value = book.description || '';
        document.getElementById('summary').value = book.summary || '';
        document.getElementById('publicationDate').value = book.publicationDate.split('T')[0];
        editForm.style.display = 'flex';
        editForm.reset();
        editForm.style.flexDirection = "column";
    }
    searchForm.addEventListener('submit', (ev) => __awaiter(void 0, void 0, void 0, function* () {
        ev.preventDefault();
        const searchTitle = document.getElementById('searchTitle').value;
        console.log('Search initiated for:', searchTitle);
        try {
            if (!token) {
                console.log('No token, logging in...');
                yield login();
            }
            const book = yield searchBook(searchTitle);
            if (book) {
                searchForm.style.display = 'none';
                populateForm(book);
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
            Swal.fire({
                title: 'Error',
                text: 'the book was not found',
                icon: 'warning',
                confirmButtonText: 'ok'
            });
        }
    }));
    editForm.addEventListener('submit', (event) => __awaiter(void 0, void 0, void 0, function* () {
        event.preventDefault();
        const bookId = document.getElementById('bookId').value;
        const updatedBook = {
            title: document.getElementById('title').value,
            author: document.getElementById('author').value,
            description: document.getElementById('description').value,
            summary: document.getElementById('summary').value,
            publicationDate: document.getElementById('publicationDate').value
        };
        try {
            yield booksController.updateBook(bookId, updatedBook, token);
            Swal.fire({
                title: 'Cool!',
                text: 'the book was successfully deleted',
                icon: 'success',
                confirmButtonText: 'Continue'
            });
            editForm.reset();
            editForm.style.display = 'none';
            searchForm.style.display = 'flex';
        }
        catch (error) {
            console.error('Error updating book:', error);
            alert('Error updating book');
        }
    }));
});
