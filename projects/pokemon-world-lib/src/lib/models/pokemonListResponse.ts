export interface PokemonListResponse<T> {
  count: number;
  next: string;
  previous: string;
  results: T[];
}
