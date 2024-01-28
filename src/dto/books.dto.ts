import { IsNotEmpty, IsString, MinLength, MaxLength, IsNumber, IsPositive, ArrayMinSize, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

import { AuthorDTO } from "./author.dto";

//Data to Object - Definindo o valores que meu item 'book' vai ter
export class BookDTO {

    @IsNotEmpty()
    @IsString()
    @MinLength(2)
    @MaxLength(100)
    readonly name: string;

    @IsNotEmpty()
    @Type(() => AuthorDTO)
    @ArrayMinSize(1)
    //Valide minha classe principal, mas também valide minha tipagem do author, BookDTO -> AuthorDTO
    @ValidateNested({each: true})
    readonly author: AuthorDTO[];

    @IsNotEmpty()
    @IsString()
    @MinLength(2)
    @MaxLength(100)
    readonly language: string;

    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    readonly releaseYear: number;

    @IsNotEmpty()
    @IsString()
    @MinLength(2)
    @MaxLength(100)
    readonly publisher: string;

    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    readonly pages: number;

}