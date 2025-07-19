// import { PartialType } from '@nestjs/mapped-types';
import { IsOptional } from 'class-validator';
// import { CreatePokemonDto } from './create-pokemon.dto';

// export class UpdatePokemonDto extends PartialType(CreatePokemonDto) {}

export class UpdatePokemonDto {
    @IsOptional()
    name:string

    
    @IsOptional()
    no:number
}
