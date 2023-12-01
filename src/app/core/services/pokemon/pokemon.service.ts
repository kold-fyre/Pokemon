import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor() { }

  async getAllPokemon$(pageNum?: number): Promise<Response> {
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
    return await fetch('https://beta.pokeapi.co/graphql/v1beta', {
      method: 'POST',
      body: JSON.stringify({ query })
    }).then((res) => res.json())
  }

  async getPokemonById$(id: number): Promise<Response> {
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
    return await fetch('https://beta.pokeapi.co/graphql/v1beta', {
      method: 'POST',
      body: JSON.stringify({ query })
    }).then((res) => res.json())
  }

  async getPokemonBioById$(id: number): Promise<Response> {
    const query = `
      query species {
        pokemon_v2_pokemonspecies_by_pk(id: ${id}) {
          pokemon_v2_pokemonspeciesflavortexts(distinct_on: language_id, where: {language_id: {_eq: 9}}) {
            flavor_text
          }
        }
      }`
    ;
    return await fetch('https://beta.pokeapi.co/graphql/v1beta', {
      method: 'POST',
      body: JSON.stringify({ query })
    }).then((res) => res.json())
  }

  async getPokemonByName$(name: string, limit: number): Promise<Response> {
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
    return await fetch('https://beta.pokeapi.co/graphql/v1beta', {
      method: 'POST',
      body: JSON.stringify({ query })
    }).then((res) => res.json())
  }



}
