import { BadRequestException, Injectable } from '@nestjs/common';
import { PokeResponse } from './interface/pokemon.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { Model } from 'mongoose';
import { AxiosAdapter } from 'src/common/adapter/axios-adapter';

@Injectable()
export class SeedService {
  constructor(@InjectModel(Pokemon.name) private pokemoModel: Model<Pokemon>,private readonly http: AxiosAdapter) {}

  async loadinData(limit: number) {
    try {
      const data =  await this.http.get<PokeResponse>(`pokemon?limit=${limit}`)
      

      const pokemonToInsert = data.results.map((poke) => {
        let no = poke.url.split('/').at(6);
        const pokemon = { no: Number(no), name: poke.name };

        return pokemon;
      });

      await this.pokemoModel.insertMany(pokemonToInsert);

      return 'inserrtado'

      
    } catch (error) {
      console.log(error)
      throw new BadRequestException(error);
    }
  }
}

// @Injectable()
// export class SeedService {
//   constructor(private pokemonService: PokemonService) {}

//   async loadinData(limit: number) {
//     try {
//       const data = (
//         await pokemonApi.get<PokeResponse>(`pokemon?limit=${limit}`)
//       ).data.results;
//       const dataDB = data.map((poke) => {
//         let no = poke.url.split('/').at(6);
//         const pokemon = { no:Number(no), name: poke.name };
//         this.pokemonService.create(pokemon);
//         return pokemon;
//       });

//       return dataDB;

//       return;
//     } catch (error) {
//       throw new BadRequestException(error);
//     }
//   }
// }
