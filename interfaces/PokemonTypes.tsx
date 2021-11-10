export interface FetchAllPokemonResponse {
  count: number;
  next: null;
  previous: null;
  results: SinglePokemon[];
}

export interface SinglePokemon {
  name: string;
  url: string;
}

export interface PokemonTypes {
  filter?: any;
  id: string;
  name: string;
  image: string;
}
