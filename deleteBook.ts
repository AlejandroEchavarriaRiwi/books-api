import { BooksController } from "./controllers/books.controller.js";
import { Book, BodyResponseBooks, ResponseLoginBooks } from "./models/books.models.js";
declare const Swal: any;

document.addEventListener('DOMContentLoaded', () => {
    const deleteForm = document.getElementById('deleteForm') as HTMLFormElement;
    const booksController = new BooksController('http://190.147.64.47:5155');
    let token: string;
    let bookIdToDelete: string;

    async function login(): Promise<void> {
        try {
            const loginResult: ResponseLoginBooks = await booksController.postLogin({
                email: 'prueba@prueba.pru',
                password: 'C0ntr4S3gu++r4'
            });
            token = loginResult.data.token;
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    }

    async function searchBook(searchTitle: string): Promise<Book | undefined> {
        try {
            const booksResponse: BodyResponseBooks = await booksController.getBooks(token);
            return booksResponse.data.find(book => 
                book.title.toLowerCase().includes(searchTitle.toLowerCase())
            );
        } catch (error) {
            console.error('Error fetching books:', error);
            throw error;
        }
    }


    deleteForm.addEventListener('submit', async (ev: Event) => {
        ev.preventDefault();
        const searchDeleteTitle = (document.getElementById('searchDeleteTitle') as HTMLInputElement).value;
        
        try {
            if (!token) {
                await login();
            }
            
            const book = await searchBook(searchDeleteTitle);
            if (book) {
                bookIdToDelete = book.id;
                try {
                    await booksController.deleteBook(bookIdToDelete, token);
                    deleteForm.reset()
                    Swal.fire({
                        title: 'Cool!',
                        text: 'the book was successfully deleted',
                        icon: 'success',
                        confirmButtonText: 'Continue'
                    })
                } catch (error) {
                    console.error(`Error deleting book:`, error);
                }
            } else {
                Swal.fire({
                    title: 'Error',
                    text: 'the book was not found',
                    icon: 'warning',
                    confirmButtonText: 'ok'
                });
            }
        } catch (error) {
            console.error('Error during search:', error);
            alert('An error occurred while searching for the book');
        }
    });

});