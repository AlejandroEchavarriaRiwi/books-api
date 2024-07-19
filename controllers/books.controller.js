var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export class BooksController {
    constructor(urlApi) {
        this.urlApi = urlApi;
        this.domain = urlApi;
    }
    postLogin(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const endpointLogin = '/api/v1/auth/login';
            const headers = {
                'Content-Type': 'application/json',
            };
            const reqOptions = {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(data)
            };
            const url = this.urlApi + endpointLogin;
            const result = yield fetch(url, reqOptions);
            console.log(`Status code: ${result.status}`);
            if (result.status !== 201) {
                console.log(`Response body: ${(yield result.json()).message}`);
                throw new Error('Not authenticated: ');
            }
            const responseBodyLogin = yield result.json();
            return responseBodyLogin;
        });
    }
    createUser(user, token) {
        return __awaiter(this, void 0, void 0, function* () {
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            };
            const reqOptions = {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(user)
            };
            const url = this.domain + '/api/v1/users';
            const result = yield fetch(url, reqOptions);
            console.log(`Status code: ${result.status}`);
            if (result.status !== 201) {
                console.log(`Response body: ${(yield result.json()).message}`);
                throw new Error('Failed to create user');
            }
            console.log('User created successfully');
        });
    }
    createBook(book, token) {
        return __awaiter(this, void 0, void 0, function* () {
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            };
            const reqOptions = {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(book)
            };
            const url = this.domain + '/api/v1/books';
            const result = yield fetch(url, reqOptions);
            console.log(`Status code: ${result.status}`);
            if (result.status !== 201) {
                console.log(`Response body: ${(yield result.json()).message}`);
                throw new Error('Failed to create book');
            }
            console.log('Book created successfully');
        });
    }
    getBooks(token) {
        return __awaiter(this, void 0, void 0, function* () {
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            };
            const reqOptions = {
                method: 'GET',
                headers: headers
            };
            const url = this.domain + '/api/v1/books?limit=10000&page=1';
            const result = yield fetch(url, reqOptions);
            console.log(`Status code: ${result.status}`);
            if (result.status !== 200) {
                console.log(`Response body: ${(yield result.json()).message}`);
                throw new Error('Failed to get books');
            }
            const responseBodyBooks = yield result.json();
            console.log('Books fetched successfully');
            return responseBodyBooks;
        });
    }
    updateBook(id, bookUpdate, token) {
        return __awaiter(this, void 0, void 0, function* () {
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            };
            const reqOptions = {
                method: 'PATCH',
                headers: headers,
                body: JSON.stringify(bookUpdate)
            };
            const url = `${this.domain}/api/v1/books/${id}`;
            const result = yield fetch(url, reqOptions);
            console.log(`Status code: ${result.status}`);
            if (result.status !== 200) {
                console.log(`Response body: ${(yield result.json()).message}`);
                throw new Error('Failed to update book');
            }
            console.log('Book updated successfully');
        });
    }
    deleteBook(id, token) {
        return __awaiter(this, void 0, void 0, function* () {
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            };
            const reqOptions = {
                method: 'DELETE',
                headers: headers
            };
            const url = `${this.domain}/api/v1/books/${id}`;
            try {
                const result = yield fetch(url, reqOptions);
                if (result.status !== 204 && result.status !== 200) {
                    throw new Error(`Failed to delete book`);
                }
                console.log('Book deleted successfully');
            }
            catch (error) {
                console.error('Error in deleteBook:', error);
                throw error;
            }
        });
    }
}
