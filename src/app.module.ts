import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BooksController } from './controllers/books/books.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { BooksService } from './services/books/books.service';
import { BookRepository } from './mongo/repository/book.repository';
import { BookSchema } from './mongo/schemas/book.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.DB_URI),
    MongooseModule.forFeature([
      { name: 'book', schema: BookSchema }
    ])
  ],
  controllers: [BooksController],
  providers: [BooksService, BookRepository],
})
export class AppModule {}
