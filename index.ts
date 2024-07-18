const domain: string = 'http://190.147.64.47:5155/';
const endpointLogin: string = 'api/v1/auth/login';
const endPointCreateBooks: string = 'api/v1/books';

interface BodyRequestLogin {
    email: string,
    password: string
}

interface BodyResponseLogin {
    message: string,
    data: {
        token: string
    }
}

interface Book {
    title: string,
    author: string,
    description: string,
    summary: string,
    publicationDate: string
}

async function postLogin(data: BodyRequestLogin): Promise<BodyResponseLogin> {
    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
    }

    const reqOptions: RequestInit = {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data)
    }
    const url = domain + endpointLogin;
    const result: Response = await fetch(url, reqOptions);

    console.log(`Status code: ${result.status}`);
    if (result.status !== 201) {
        console.log(`Response body: ${(await result.json()).message}`);
        throw new Error('Not authenticated: ');
    }
    const responseBodyLogin: BodyResponseLogin = await result.json();
    console.log(`Result token: ${responseBodyLogin.data.token}`);
    return responseBodyLogin;
}

async function createBook(book: Book, token: string): Promise<void> {
    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    }

    const reqOptions: RequestInit = {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(book)
    }
    const url = domain + endPointCreateBooks;
    const result: Response = await fetch(url, reqOptions);

    console.log(`Status code: ${result.status}`);
    if (result.status !== 201) {
        console.log(`Response body: ${(await result.json()).message}`);
        throw new Error('Failed to create book');
    }
    console.log('Book created successfully');
}

const dataToLogin: BodyRequestLogin = {
    email: 'prueba@prueba.pru',
    password: 'C0ntr4S3gu++r4'
}

postLogin(dataToLogin).then((result: BodyResponseLogin) => {
    console.log(result);
    const token = result.data.token;

    const newBook: Book = {
        title: 'Nuevo Libro',
        author: 'Autor del Libro',
        description : '',
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
