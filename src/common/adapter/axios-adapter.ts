import { HttpAdapter } from '../interfaces/http-adapter.interfaces';
import { Injectable } from '@nestjs/common';
import { pokemonApi } from '../../api/pokemonApi';


@Injectable()
export class AxiosAdapter implements HttpAdapter {

  async get<T>(url: string): Promise<T> {
    try {
      const data = (await pokemonApi.get<T>(url)).data;

      return data;
    } catch (error) {
      throw new Error(error)
    }
  }
}
