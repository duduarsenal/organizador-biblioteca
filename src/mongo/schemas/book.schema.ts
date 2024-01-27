import { Schema } from "mongoose";
import { AuthorSchema } from "./author.schema";

//Formato dos items que vou salvar/consultar no banco de dados
export const BookSchema = new Schema({
    name: String,
    author: [AuthorSchema],
    language: String,
    releaseYear: Number,
    publisher: String,
    pages: Number,
    __v: {
        type: Number,
        select: false
    }
})