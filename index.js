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
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const booksController = new BooksController('http://190.147.64.47:5155');
        const dataToLogin = {
            email: 'prueba@prueba.pru',
            password: 'C0ntr4S3gu++r4'
        };
        try {
            const resultLogin = yield booksController.postLogin(dataToLogin);
            console.log(resultLogin);
            const token = resultLogin.data.token;
            // Get books
        }
        catch (error) {
            console.log(`Error logging in: ${error}`);
        }
    });
}
