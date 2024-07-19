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
    const form = document.getElementById('registerForm');
    const booksController = new BooksController('http://190.147.64.47:5155');
    form.addEventListener('submit', (event) => __awaiter(void 0, void 0, void 0, function* () {
        event.preventDefault();
        const name = document.getElementById('name');
        const lastName = document.getElementById('lastName');
        const email = document.getElementById('email');
        const password = document.getElementById('password');
        const newUser = {
            name: name.value,
            lastName: lastName.value,
            email: email.value,
            password: password.value
        };
        try {
            // Primero, obtén el token haciendo login
            const loginResult = yield booksController.postLogin({
                email: 'prueba@prueba.pru',
                password: 'C0ntr4S3gu++r4'
            });
            const token = loginResult.data.token;
            // Luego, crea el usuario
            yield booksController.createUser(newUser, token);
            console.log('User creation succeeded');
            alert('User registered successfully!');
            form.reset();
        }
        catch (error) {
            console.error('Error creating user:', error);
            alert('Error registering user. Please try again.');
        }
    }));
});
