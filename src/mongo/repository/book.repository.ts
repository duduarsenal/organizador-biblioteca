import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BookDTO } from 'src/dto/books.dto';
import { Book } from '../interfaces/book.interface';

@Injectable()
//Classe que chamam o Model para buscar os dados do banco e inserir dados no banco
export class BookRepository {
  
    constructor(@InjectModel('book') private readonly bookModel: Model<Book>) {}

    async saveBook(newBook: BookDTO): Promise<Book> {
        //Chama a função direto do banco de dados para o CRUD
        const savedBook = await this.bookModel.create(newBook);
        return savedBook;
    }

    async getAllBooks(): Promise<Book[]> {
        return await this.bookModel.find().sort({ name: +1 });
    }

    async getBookById(bookID: string): Promise<Book> {
        return await this.bookModel.findById({ _id: bookID });
    }

    async deleteBookById(bookID: string): Promise<Book> {
        return await this.bookModel.findOneAndDelete({ _id: bookID });
    }

    async updateBookById(bookID: string, newBook: BookDTO | object): Promise<Book> {
        return await this.bookModel.findByIdAndUpdate(
            { _id: bookID },
            { ...newBook },
            { new: true },
        );
    }

    async getBookByAuthor(authorName: string[]): Promise<Book[]>{
        return await this.bookModel.find({
            $or: [
                { "author.name": { $in: authorName } },
                { "author.surname": { $in: authorName } }
            ],
        })
    }

    async getBookByName(bookName: string): Promise<Book[]>{
        return await this.bookModel.find({
            name: { '$regex' : bookName, '$options': 'i'}
        })
    }
}
