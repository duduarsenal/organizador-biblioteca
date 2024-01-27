import { BadRequestException, Injectable } from '@nestjs/common';
import { BookDTO } from 'src/dto/books.dto';
import { Book } from 'src/mongo/interfaces/book.interface';
import { BookRepository } from 'src/mongo/repository/book.repository';

@Injectable()
export class BooksService {

    constructor(
        private readonly bookRepository : BookRepository
    ){}

    async saveBook(newBook: BookDTO): Promise<Book>{
        const savedBook = await this.bookRepository.saveBook(newBook);
        return savedBook;
    }

    async getAllBooks(): Promise<Book[]> {
        const allBooks = await this.bookRepository.getAllBooks();
        
        if (!allBooks.length){
            throw new BadRequestException('não tem nenhum livro')
        }

        return allBooks;
    }

    async getBookById(bookID: string): Promise<Book>{
        try {
            const existingBook = await this.bookRepository.getBookById(bookID);
            if (!existingBook) throw new BadRequestException('esse livro não existe');

            return existingBook;
        } catch (error) {
            // console.log(error);
            throw new BadRequestException('erro na busca do livro por id')
        }
    }

    async deleteBookById(bookID: string): Promise<Book>{
        try {
            return await this.bookRepository.deleteBookById(bookID)
        } catch (error) {
            throw new BadRequestException(error.message || 'esse livro não existe')
        }
    }

    async updateBookById(bookID: string, newBook: BookDTO | object): Promise<Book>{
        try {
            const existingBook = await this.bookRepository.getBookById(bookID);
            if (!existingBook) throw new BadRequestException('esse livro não existe');

            const updatedBook = await this.bookRepository.updateBookById(bookID, newBook);

            if (!updatedBook){
                throw new BadRequestException('erro ao atualizar o livro');
            }
            
            return updatedBook;
        } catch (error) {
            // console.log(error);
            throw new BadRequestException(error.message || 'erro na busca do livro por id')
        }
    }

    async getBookByAuthor(authorName: string): Promise<Book[]>{
        try {
            const splitedAuthorName = authorName.toLowerCase().split(' ');

            const foundBooks = await this.bookRepository.getBookByAuthor(splitedAuthorName);

            if (!foundBooks.length) throw new BadRequestException('Nenhum livro registrado por esse autor')

            return foundBooks;
        } catch (error) {
            throw new BadRequestException(error.message || 'Erro na busca de livros por esse autor')
        }
    }

}
