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
    const form = document.getElementById('bookForm');
    const booksController = new BooksController('http://190.147.64.47:5155');
    form.addEventListener('submit', (event) => __awaiter(void 0, void 0, void 0, function* () {
        event.preventDefault();
        const title = document.getElementById('title');
        const author = document.getElementById('author');
        const description = document.getElementById('description');
        const summary = document.getElementById('summary');
        const publicationDate = document.getElementById('date');
        const newBook = {
            title: title.value,
            author: author.value,
            description: description.value,
            summary: summary.value,
            publicationDate: publicationDate.value
        };
        try {
            // Primero, obtén el token haciendo login
            const loginResult = yield booksController.postLogin({
                email: 'prueba@prueba.pru',
                password: 'C0ntr4S3gu++r4'
            });
            const token = loginResult.data.token;
            // Luego, crea el libro
            try {
                yield booksController.createBook(newBook, token);
                Swal.fire({
                    title: 'Cool!',
                    text: 'the book was successfully created',
                    icon: 'success',
                    confirmButtonText: 'Continue'
                });
                form.reset();
            }
            catch (error) {
                console.log(`Error creating book: ${error}`);
            }
        }
        catch (error) {
            console.log(`Error logging in: ${error}`);
        }
    }));
});
