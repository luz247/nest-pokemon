import { BadRequestException, Injectable } from '@nestjs/common';
import { pokemonApi } from 'src/api/pokemonApi';
import { PokemonService } from 'src/pokemon/pokemon.service';
import { PokeResponse } from './interface/pokemon.interface';

@Injectable()
export class SeedService {
  constructor(private pokemonService: PokemonService) {}

  async loadinData(limit: number) {
    try {
      const data = (
        await pokemonApi.get<PokeResponse>(`pokemon?limit=${limit}`)
      ).data.results;
      const dataDB = data.map((poke) => {
        let no = poke.url.split('/').at(6);
        const pokemon = { no:Number(no), name: poke.name };
        this.pokemonService.create(pokemon);
        return pokemon;
      });

      return dataDB;

      return;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
