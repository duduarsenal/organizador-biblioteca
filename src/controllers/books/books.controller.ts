import { Body, Controller, Delete, Get, Patch, Post, Param } from '@nestjs/common';

import { BookDTO } from 'src/dto/books.dto';
import { Book } from 'src/mongo/interfaces/book.interface';
import { BooksService } from 'src/services/books/books.service';


@Controller('books')
export class BooksController {

    constructor(
        private readonly bookService: BooksService
    ){}

    @Get()
    async getAllBooks(): Promise<Book[]> {
        return await this.bookService.getAllBooks();
    }

    @Get(':bookid')
    //Função assincrona precisa de tipagem de Promise
    async getBookById(@Param('bookid') bookID: string): Promise<Book>{
        return await this.bookService.getBookById(bookID);
    }
    
    @Get('author/:authorName')
    //<Book[]> quer dizer que pode retornar 1 ou mais items do tipo Book
    async getBookByAuthor(@Param('authorName') authorName: string): Promise<Book[]>{
        return await this.bookService.getBookByAuthor(authorName);
    }
    
    @Get('name/:bookname')
    async getBookByName(@Param('bookname') bookName: string): Promise<Book[]>{
        return await this.bookService.getBookByName(bookName);
    }
    @Post()
    //Valida se o newBook via @Body tem os tipos corretos descritos em BookDTO
    async saveBook(@Body() newBook: BookDTO): Promise<Book>{
        return await this.bookService.saveBook(newBook);
    }

    @Patch(':bookid')
    //Capta o id do book via @Param e a atualização do book via @Body
    //BookDTO | object precisa ser revisto..
    async updateBookById(@Param('bookid') bookID: string, @Body() newBook: BookDTO | object): Promise<Book>{
        return await this.bookService.updateBookById(bookID, newBook);
    }

    @Delete(':bookid')
    async deleteBookById(@Param('bookid') bookID: string): Promise<Book> {
        return await this.bookService.deleteBookById(bookID); 
    }
}
