import { BooksController } from "./controllers/books.controller.js";
import { Book, BodyResponseBooks, ResponseLoginBooks } from "./models/books.models.js";

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
            console.error('Error fetching books:', error);
            throw error;
        }
    }


    deleteForm.addEventListener('submit', async (ev: Event) => {
        ev.preventDefault();
        const searchDeleteTitle = (document.getElementById('searchDeleteTitle') as HTMLInputElement).value;
        console.log('Search initiated for:', searchDeleteTitle);
        
        try {
            if (!token) {
                await login();
            }
            
            const book = await searchBook(searchDeleteTitle);
            if (book) {
                console.log('Book found:', book);
                bookIdToDelete = book.id;
                try {
                    console.log(`Attempting to delete book with ID: ${bookIdToDelete}`);
                    await booksController.deleteBook(bookIdToDelete, token);
                    deleteForm.reset()
                    alert('Book deletion succeeded');
                } catch (error) {
                    console.error(`Error deleting book:`, error);
                }
            } else {
                alert('Book not found');
            }
        } catch (error) {
            console.error('Error during search:', error);
            alert('An error occurred while searching for the book');
        }
    });

});