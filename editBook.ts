import { BooksController } from "./controllers/books.controller.js";
import { Book, BodyResponseBooks, ResponseLoginBooks } from "./models/books.models.js";
declare const Swal: any;

document.addEventListener('DOMContentLoaded', () => {
    const searchForm = document.getElementById('searchForm') as HTMLFormElement;
    const editForm = document.getElementById('editForm') as HTMLFormElement;
    const booksController = new BooksController('http://190.147.64.47:5155');
    let token: string;

    async function login(): Promise<void> {
        try {
            const loginResult: ResponseLoginBooks = await booksController.postLogin({
                email: 'prueba@prueba.pru',
                password: 'C0ntr4S3gu++r4'
            });
            token = loginResult.data.token;
            console.log('Login successful');
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    }

    async function searchBook(searchTitle: string): Promise<Book | undefined> {
        try {
            const booksResponse: BodyResponseBooks = await booksController.getBooks(token);
            console.log('Books received:', booksResponse.data);

            return booksResponse.data.find(book =>
                book.title.toLowerCase().includes(searchTitle.toLowerCase())
            );
        } catch (error) {
            Swal.fire({
                title: 'Error',
                text: 'the book was not found',
                icon: 'warning',
                confirmButtonText: 'ok'
            });
            throw error;
        }
    }

    function populateForm(book: Book): void {
        console.log('Populating form with book:', book);
        (document.getElementById('bookId') as HTMLInputElement).value = book.id;
        (document.getElementById('title') as HTMLInputElement).value = book.title;
        (document.getElementById('author') as HTMLInputElement).value = book.author;
        (document.getElementById('description') as HTMLInputElement).value = book.description || '';
        (document.getElementById('summary') as HTMLInputElement).value = book.summary || '';
        (document.getElementById('publicationDate') as HTMLInputElement).value = book.publicationDate.split('T')[0];
        editForm.style.display = 'flex';
        editForm.reset();
        editForm.style.flexDirection = "column";
    }

    searchForm.addEventListener('submit', async (ev: Event) => {
        ev.preventDefault();
        const searchTitle = (document.getElementById('searchTitle') as HTMLInputElement).value;
        console.log('Search initiated for:', searchTitle);

        try {
            if (!token) {
                console.log('No token, logging in...');
                await login();
            }

            const book = await searchBook(searchTitle);
                if (book) {
                    searchForm.style.display = 'none'
                    populateForm(book);
                } else {
                    Swal.fire({
                        title: 'Error',
                        text: 'the book was not found',
                        icon: 'warning',
                        confirmButtonText: 'ok'
                    });
                }
            } catch (error) {
                Swal.fire({
                    title: 'Error',
                    text: 'the book was not found',
                    icon: 'warning',
                    confirmButtonText: 'ok'
                });
            }
    });

    editForm.addEventListener('submit', async (event: Event) => {
        event.preventDefault();
        const bookId = (document.getElementById('bookId') as HTMLInputElement).value;
        const updatedBook: Partial<Book> = {
            title: (document.getElementById('title') as HTMLInputElement).value,
            author: (document.getElementById('author') as HTMLInputElement).value,
            description: (document.getElementById('description') as HTMLInputElement).value,
            summary: (document.getElementById('summary') as HTMLInputElement).value,
            publicationDate: (document.getElementById('publicationDate') as HTMLInputElement).value
        };

        try {
            await booksController.updateBook(bookId, updatedBook, token);
            Swal.fire({
                title: 'Cool!',
                text: 'the book was successfully deleted',
                icon: 'success',
                confirmButtonText: 'Continue'
            })
            editForm.reset();
            editForm.style.display = 'none';
            searchForm.style.display = 'flex';

        } catch (error) {
            console.error('Error updating book:', error);
            alert('Error updating book');
        }
    });
});