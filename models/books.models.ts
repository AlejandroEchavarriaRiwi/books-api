export interface RequestLoginBooks {
    email: string,
    password: string
}

export interface BodyRequestCreateUser {
    name: string,
    lastName: string,
    email: string,
    password: string,
}

export interface ResponseLoginBooks {
    message: string,
    data: {
        token: string
    }
}

export interface Book {
    title: string,
    author: string,
    description: string,
    summary: string,
    publicationDate: string
}

export interface BodyResponseBooks {
    message: string,
    data: Book[]
}