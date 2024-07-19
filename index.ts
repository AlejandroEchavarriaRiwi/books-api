import { BooksController } from "./controllers/books.controller.js";
import { BodyRequestCreateUser, RequestLoginBooks, ResponseLoginBooks, Book, BodyResponseBooks } from "./models/books.models";

async function main(): Promise<void> {
    const booksController: BooksController = new BooksController('http://190.147.64.47:5155');
    
    const dataToLogin: RequestLoginBooks = {
        email: 'prueba@prueba.pru',
        password: 'C0ntr4S3gu++r4'
    }

    try {
        const resultLogin: ResponseLoginBooks = await booksController.postLogin(dataToLogin);
        console.log(resultLogin);

        const token = resultLogin.data.token;

        // Get books
        try {
            const booksResponse: BodyResponseBooks = await booksController.getBooks(token);
            console.log('Books:', booksResponse.data);
        } catch (error) {
            console.log(`Error fetching books: ${error}`);
        }

        // Update a book
        const bookIdToUpdate = 'c0bfd373-ee5b-4161-bd21-5dadaee33b9b';
        const bookUpdate: Partial<Book> = {
            title: 'El libro de riwi recharged',
            description: 'Vida y lucha'
        };
        try {
            await booksController.updateBook(bookIdToUpdate, bookUpdate, token);
            console.log('Book update succeeded');
        } catch (error) {
            console.log(`Error updating book: ${error}`);
        }

        // Delete a book
        const bookIdToDelete = '12fec388-ff8c-49d6-9366-91e3e30ded6b'; 



    } catch (error) {
        console.log(`Error logging in: ${error}`);
    }
}

main();