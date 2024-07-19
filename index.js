"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const books_controller_1 = require("./controllers/books.controller");
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const booksController = new books_controller_1.BooksController('http://190.147.64.47:5155');
        const dataToLogin = {
            email: 'prueba@prueba.pru',
            password: 'C0ntr4S3gu++r4'
        };
        try {
            const resultLogin = yield booksController.postLogin(dataToLogin);
            console.log(resultLogin);
            const token = resultLogin.data.token;
            // Get books
            try {
                const booksResponse = yield booksController.getBooks(token);
                console.log('Books:', booksResponse.data);
            }
            catch (error) {
                console.log(`Error fetching books: ${error}`);
            }
            // Create user
            const newUser = {
                name: 'Alejandro',
                lastName: 'Echavarria',
                email: 'aec45849848754j@gmail.com',
                password: 'S3cur3P@ssw0rd',
            };
            try {
                yield booksController.createUser(newUser, token);
                console.log('User creation succeeded');
            }
            catch (error) {
                console.log(`Error creating user: ${error}`);
            }
            // Create book
            const newBook = {
                title: 'Nuevo Libro DE RIWI gates',
                author: 'Autor del Libro',
                description: '',
                summary: '',
                publicationDate: "2024-07-17T13:01:11.7542"
            };
            try {
                yield booksController.createBook(newBook, token);
                console.log('Book creation succeeded');
            }
            catch (error) {
                console.log(`Error creating book: ${error}`);
            }
            // Update a book
            const bookIdToUpdate = 'c0bfd373-ee5b-4161-bd21-5dadaee33b9b';
            const bookUpdate = {
                title: 'El libro de riwi recharged',
                description: 'Vida y lucha'
            };
            try {
                yield booksController.updateBook(bookIdToUpdate, bookUpdate, token);
                console.log('Book update succeeded');
            }
            catch (error) {
                console.log(`Error updating book: ${error}`);
            }
            // Delete a book
            const bookIdToDelete = '12fec388-ff8c-49d6-9366-91e3e30ded6b';
            try {
                console.log(`Attempting to delete book with ID: ${bookIdToDelete}`);
                yield booksController.deleteBook(bookIdToDelete, token);
                console.log('Book deletion succeeded');
            }
            catch (error) {
                console.error(`Error deleting book:`, error);
            }
        }
        catch (error) {
            console.log(`Error logging in: ${error}`);
        }
    });
}
main();
