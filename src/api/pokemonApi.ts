import axios, { AxiosInstance } from "axios";



export const pokemonApi:AxiosInstance = axios.create({
    baseURL:'https://pokeapi.co/api/v2/'
})