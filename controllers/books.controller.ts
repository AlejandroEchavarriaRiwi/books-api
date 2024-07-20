import { RequestLoginBooks, ResponseLoginBooks, BodyRequestCreateUser, BodyResponseBooks, Book } from '../models/books.models'

export class BooksController {
    private domain: string;

    constructor(private urlApi: string) {
        this.domain = urlApi;
    }

    async postLogin(data: RequestLoginBooks): Promise<ResponseLoginBooks> {
        const endpointLogin: string = '/api/v1/auth/login';
        const headers: Record<string, string> = {
            'Content-Type': 'application/json',
        }
        
        const reqOptions: RequestInit = {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(data)
        }
        const url = this.urlApi + endpointLogin;
        const result: Response = await fetch(url, reqOptions);

        console.log(`Status code: ${result.status}`);
        if (result.status !== 201) {
            console.log(`Response body: ${(await result.json()).message}`);
            throw new Error('Not authenticated: ');
        }
        const responseBodyLogin: ResponseLoginBooks = await result.json();
        return responseBodyLogin;
    }

    async createUser(user: BodyRequestCreateUser, token: string): Promise<void> {
        const headers: Record<string, string> = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }

        const reqOptions: RequestInit = {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(user)
        }
        const url = this.domain + '/api/v1/users';
        const result: Response = await fetch(url, reqOptions);

        console.log(`Status code: ${result.status}`);
        if (result.status !== 201) {
            console.log(`Response body: ${(await result.json()).message}`);
            throw new Error('Failed to create user');
        }
        console.log('User created successfully');
    }

    async createBook(book: Book, token: string): Promise<void> {
        const headers: Record<string, string> = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }

        const reqOptions: RequestInit = {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(book)
        }
        const url = this.domain + '/api/v1/books';
        const result: Response = await fetch(url, reqOptions);

        console.log(`Status code: ${result.status}`);
        if (result.status !== 201) {
            console.log(`Response body: ${(await result.json()).message}`);
            throw new Error('Failed to create book');
        }
        console.log('Book created successfully');
    }

    async getBooks(token: string): Promise<BodyResponseBooks> {
        const headers: Record<string, string> = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }

        const reqOptions: RequestInit = {
            method: 'GET',
            headers: headers
        }
        const url = this.domain + '/api/v1/books?limit=1000&page=1';
        const result: Response = await fetch(url, reqOptions);

        console.log(`Status code: ${result.status}`);
        if (result.status !== 200) {
            console.log(`Response body: ${(await result.json()).message}`);
            throw new Error('Failed to get books');
        }
        const responseBodyBooks: BodyResponseBooks = await result.json();
        console.log('Books fetched successfully');
        return responseBodyBooks;
    }

    async updateBook(id: string, bookUpdate: Partial<Book>, token: string): Promise<void> {
        const headers: Record<string, string> = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }

        const reqOptions: RequestInit = {
            method: 'PATCH',
            headers: headers,
            body: JSON.stringify(bookUpdate)
        }
        const url = `${this.domain}/api/v1/books/${id}`;
        const result: Response = await fetch(url, reqOptions);

        console.log(`Status code: ${result.status}`);
        if (result.status !== 200) {
            console.log(`Response body: ${(await result.json()).message}`);
            throw new Error('Failed to update book');
        }
        console.log('Book updated successfully');
    }

    async deleteBook(id: string, token: string): Promise<void> {
        const headers: Record<string, string> = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    
        const reqOptions: RequestInit = {
            method: 'DELETE',
            headers: headers
        }
        const url = `${this.domain}/api/v1/books/${id}`;
    
        try {
            const result: Response = await fetch(url, reqOptions);
    
            if (result.status !== 204 && result.status !== 200) {
                throw new Error(`Failed to delete book`);
            }
            console.log('Book deleted successfully');
        } catch (error) {
            console.error('Error in deleteBook:', error);
            throw error;
        }
    }

}