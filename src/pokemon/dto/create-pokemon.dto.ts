import { IsNumber, IsString } from "class-validator"


export class CreatePokemonDto {

    @IsNumber()
    no:number

    @IsString()
    name:string
}
