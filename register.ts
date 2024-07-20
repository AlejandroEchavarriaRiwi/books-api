import { BooksController } from "./controllers/books.controller.js";
declare const Swal: any;

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registerForm') as HTMLFormElement;
    const booksController = new BooksController('http://190.147.64.47:5155');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const name = document.getElementById('name') as HTMLInputElement;
        const lastName = document.getElementById('lastName') as HTMLInputElement;
        const email = document.getElementById('email') as HTMLInputElement;
        const password = document.getElementById('password') as HTMLInputElement;

        const newUser = {
            name : name.value,
            lastName : lastName.value,
            email : email.value,
            password : password.value
        };

        try {
            // Primero, obtén el token haciendo login
            const loginResult = await booksController.postLogin({
                email: 'prueba@prueba.pru',
                password: 'C0ntr4S3gu++r4'
            });
            const token = loginResult.data.token;

            // Luego, crea el usuario
            await booksController.createUser(newUser, token);
            Swal.fire({
                title: 'Cool!',
                text: 'the user was successfully created',
                icon: 'success',
                confirmButtonText: 'Continue'
            })
            form.reset();
        } catch (error) {
            Swal.fire({
                title: 'Error',
                text: 'Error registering user. Please try again.',
                icon: 'warning',
                confirmButtonText: 'ok'
            });
        }
    });
});