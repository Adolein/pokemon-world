import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { forkJoin, map, Observable, switchMap, tap } from 'rxjs';
import { PokemonList } from '../models/pokemonList';

@Injectable({
  providedIn: 'root',
})
export class PokemonWorldLibService {
  PokemonAPIUrl = 'https://pokeapi.co/api/v2/pokemon?limit=100&offset=0';
  private httpCient = inject(HttpClient);

  getPokemonList(): any {
    return this.httpCient.get<any>(this.PokemonAPIUrl).pipe(
      map((response: any) =>
        response.results.map((pokemon: any) => ({ ...pokemon }))
      ),
      switchMap((pokemons: any) => {
        const pokemonDetailsRequests = pokemons.map((p: PokemonList) =>
          this.httpCient.get<PokemonList>(p.url).pipe(
            map((details: any) => ({
              name: details.name,
              url: details.url,
              id: details.id,
              height: details.height,
              weight: details.weight,
              types: details.types.map((type: any) => type.type.name),
            }))
          )
        );
        return forkJoin(pokemonDetailsRequests);
      })
      //tap((pokemon) => console.log('Fetched Pokemon:', pokemon))
    );
  }

  getPokemonById(id: Number): any {
    return this.httpCient.get<any>('https://pokeapi.co/api/v2/pokemon/1').pipe(
      map((response: any) =>
        response.results.map((pokemon: any) => ({ ...pokemon }))
      ),
      switchMap((pokemons: any) => {
        const pokemonDetailsRequests = pokemons.map((p: PokemonList) =>
          this.httpCient.get<PokemonList>(p.url).pipe(
            map((details: any) => ({
              name: details.name,
              url: details.url,
              id: details.id,
              height: details.height,
              weight: details.weight,
              types: details.types.map((type: any) => type.type.name),
            }))
          )
        );
        return forkJoin(pokemonDetailsRequests);
      })
      //tap((pokemon) => console.log('Fetched Pokemon:', pokemon))
    );
  }
}
