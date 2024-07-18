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
const domain = 'http://190.147.64.47:5155/';
const endpointLogin = 'api/v1/auth/login';
const endPointCreateBooks = 'api/v1/books';
function postLogin(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const headers = {
            'Content-Type': 'application/json',
        };
        const reqOptions = {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(data)
        };
        const url = domain + endpointLogin;
        const result = yield fetch(url, reqOptions);
        console.log(`Status code: ${result.status}`);
        if (result.status !== 201) {
            console.log(`Response body: ${(yield result.json()).message}`);
            throw new Error('Not authenticated: ');
        }
        const responseBodyLogin = yield result.json();
        console.log(`Result token: ${responseBodyLogin.data.token}`);
        return responseBodyLogin;
    });
}
function createBook(book, token) {
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
        const url = domain + endPointCreateBooks;
        const result = yield fetch(url, reqOptions);
        console.log(`Status code: ${result.status}`);
        if (result.status !== 201) {
            console.log(`Response body: ${(yield result.json()).message}`);
            throw new Error('Failed to create book');
        }
        console.log('Book created successfully');
    });
}
const dataToLogin = {
    email: 'prueba@prueba.pru',
    password: 'C0ntr4S3gu++r4'
};
postLogin(dataToLogin).then((result) => {
    console.log(result);
    const token = result.data.token;
    const newBook = {
        title: 'Nuevo Libro',
        author: 'Autor del Libro',
        description: '',
        summary: '',
        publicationDate: "2024-07-17T13:01:11.7542"
    };
    createBook(newBook, token).then(() => {
        console.log('Book creation succeeded');
    }).catch((error) => {
        console.log(`Error creating book: ${error}`);
    });
}).catch((error) => {
    console.log(`Error logging in: ${error}`);
});
