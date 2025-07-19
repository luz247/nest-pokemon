import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from './entities/pokemon.entity';
import { isValidObjectId, Model } from 'mongoose';
import { isNumber } from 'class-validator';

@Injectable()
export class PokemonService {
  constructor(@InjectModel(Pokemon.name) private pokemoModel: Model<Pokemon>) {}

  async create(createPokemonDto: CreatePokemonDto) {
    try {
      const createPokemon = await this.pokemoModel.create(createPokemonDto);
      return createPokemon.save();
    } catch (error) {
     this.handleExceptions(error)
    }
  }

  findAll(): Promise<Pokemon[]> {
    return this.pokemoModel.find({});
  }

  async findOne(term: string): Promise<Pokemon> {
    let pokemon: Pokemon | null;

    if (isNumber(+term)) {
      pokemon = await this.pokemoModel.findOne({ no: term });
    } else if (isValidObjectId(term)) {
      pokemon = await this.pokemoModel.findById(term);
    } else {
      pokemon = await this.pokemoModel.findOne({
        name: term,
      });
    }

    if (!pokemon)
      throw new NotFoundException(
        `pokemon with name or id ${term} no fue encontrado`,
      );
    return pokemon;
  }

  async update(term: string, updatePokemonDto: UpdatePokemonDto) {
    try {
      const pokemon = await this.findOne(term);
      console.log(pokemon);
      if (updatePokemonDto.name) {
        updatePokemonDto.name = updatePokemonDto.name.toLocaleLowerCase();
        console.log(pokemon);
        await pokemon.updateOne(updatePokemonDto, { new: true });
        return { ...pokemon.toJSON(), ...updatePokemonDto };
      }
    } catch (error) {
      this.handleExceptions(error)
    }
  }

 async remove(id: string){
 const {deletedCount} = await this.pokemoModel.deleteOne({_id:id})

 if(deletedCount ===  0) throw new NotFoundException(`pokemo with id ${id} not found`)
  

    return
  }

  private handleExceptions(error: any) {
    if (error.code === 11000) {
      throw new ConflictException(
        `Pokemon already exists in the database: ${JSON.stringify(error.keyValue)}`,
      );
    }
    console.log(error);

    throw new InternalServerErrorException(
      `Can't create Pokemon - Check server logs`,
    );
  }
}
