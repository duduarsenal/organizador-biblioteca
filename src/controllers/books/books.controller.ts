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
    async getBookById(@Param('bookid') bookID: string): Promise<Book>{
        return await this.bookService.getBookById(bookID);
    }
    
    @Get('author/:authorName')
    async getBookByAuthor(@Param('authorName') authorName: string): Promise<Book[]>{
        return await this.bookService.getBookByAuthor(authorName);
    }
    
    //Valida o conteudo que esta sendo enviado via tipagem/interface/dto
    @Post()
    async saveBook(@Body() newBook: BookDTO): Promise<Book>{
        return await this.bookService.saveBook(newBook);
    }

    @Patch(':bookid')
    async updateBookById(@Param('bookid') bookID: string, @Body() newBook: BookDTO | object): Promise<Book>{
        return await this.bookService.updateBookById(bookID, newBook);
    }

    @Delete(':bookid')
    async deleteBookById(@Param('bookid') bookID: string): Promise<Book> {
        return await this.bookService.deleteBookById(bookID); 
    }
}
