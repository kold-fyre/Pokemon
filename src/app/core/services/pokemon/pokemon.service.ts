import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private http: HttpClient = inject(HttpClient);

  getAllPokemon$(pageNum?: number): Observable<any> {
    const query = `
      query {
        pokemon_v2_pokemon(limit: 10, offset: ${pageNum ? (pageNum - 1) * 10 : 0}) {
          id
          name
          weight
          height
          pokemon_v2_pokemontypes {
            pokemon_v2_type {
              name
            }
          }
          pokemon_v2_pokemonsprites {
            sprites
          }
        }
      }`;

    return this.http.post<any>('/pokemon', { query });
  }

  getPokemonById$(id: number): Observable<any> {
    const query = `
      query {
        pokemon_v2_pokemon_by_pk(id: ${id}) {
          id
          name
          height
          weight
          pokemon_v2_pokemontypes {
            pokemon_v2_type {
              name
            }
          }
          pokemon_v2_pokemonsprites {
            sprites
          }
          pokemon_v2_pokemonstats {
            base_stat
            pokemon_v2_stat {
              name
            }
          }
          pokemon_v2_pokemonabilities {
            pokemon_v2_ability {
              name
            }
          }
        }
      }`;

    return this.http.post<any>('/pokemon', { query });
  }

  getPokemonBioById$(id: number): Observable<any> {
    const query = `
      query species {
        pokemon_v2_pokemonspecies_by_pk(id: ${id}) {
          pokemon_v2_pokemonspeciesflavortexts(distinct_on: language_id, where: {language_id: {_eq: 9}}) {
            flavor_text
          }
        }
      }`;

    return this.http.post<any>('/pokemon', { query });
  }

  getPokemonByName$(name: string, limit: number): Observable<any> {
    const query = `
      query {
        pokemon_v2_pokemon(where: {name: {_regex: "^${name}"}}, limit: ${limit}) {
          id
          name
          pokemon_v2_pokemonsprites {
            sprites
          }
        }
      }`;

    return this.http.post<any>('/pokemon', { query });
  }
}
