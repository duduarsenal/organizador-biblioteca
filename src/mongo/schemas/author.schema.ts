import { Schema } from "mongoose";

//Formato dos items que vou salvar/consultar no banco de dados
export const AuthorSchema = new Schema({
    name: String,   
    surname: String,
})