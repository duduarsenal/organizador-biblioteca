import { Document } from "mongoose";
import * as mongoose from 'mongoose';
import { AuthorDTO } from "src/dto/author.dto";

//Interface do item que vou receber/buscar no banco de dados
export interface Book extends Document {

    readonly id: mongoose.Schema.Types.ObjectId,
    readonly name: string,
    readonly author: AuthorDTO[],
    readonly language: string,
    readonly releaseYear: number,
    readonly publisher: string,
    readonly pages: number,

}