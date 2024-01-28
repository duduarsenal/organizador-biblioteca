import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BooksController } from './controllers/books/books.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { BooksService } from './services/books/books.service';
import { BookRepository } from './mongo/repository/book.repository';
import { BookSchema } from './mongo/schemas/book.schema';

@Module({
  imports: [
    //Configuração do .env
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    //Configuração do connect do MongoDB
    MongooseModule.forRoot(process.env.DB_URI),

    //Configurando os schemas a serem utilizados na minha aplicação
    MongooseModule.forFeature([
      { name: 'book', schema: BookSchema }
    ])
  ],
  //Controllers que estão sendo usados na aplicação
  controllers: [BooksController],
  //Services e repositorys que estão sendo usados na aplicação
  providers: [BooksService, BookRepository],
})
export class AppModule {}
