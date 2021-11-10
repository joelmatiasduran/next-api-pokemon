import axios from "axios";

interface Props {}

export const pokemonApi = axios.create({
  baseURL: "https://pokeapi.co/api/v2/",
});
