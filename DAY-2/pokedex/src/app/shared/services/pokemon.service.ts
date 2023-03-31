import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  pokemonColor: any = {};
  genderPokemons: any = {};

  private rootURL: string = environment.config.apiUrl;
  
  constructor(private httpClient: HttpClient) {
    this.setPokemonColor();
  }
 
  //Set default colors for each type of pokemon
  setPokemonColor() {
    this.pokemonColor = {
      normal: '#DDCBD0', fighting: '#FCC1B0', flying: '#B2D2E8', poison: '#CFB7ED', ground: '#F4D1A6', 
      rock: '#C5AEA8', bug: '#C1E0C8', ghost: '#D7C2D7', steel: '#C2D4CE', fire: '#EDC2C4', 
      water: '#CBD5ED', grass: '#C0D4C8', electric: '#E2E2A0', phychic: '#DDC0CF', ice: '#C7D7DF', 
      dragon: '#CADCDF', dark: '#C6C5E3', fairy: '#E4C0CF', unknown: '#C0DFDD', shadow: '#CACACA'
    };
  }
 

  //API call to get Pokemon data
  getPokemonData(params?: any): Observable<any> {
      return this.httpClient.get(this.rootURL + params)
      .pipe(retry(1),
      catchError(this.handleError));
  }

  private handleError(error: any) {
      let errorMessage = '';
      if (error.error instanceof ErrorEvent) {
        // client-side error
        errorMessage = "Error:"+ error.error.message;
      } else {
        // server-side error
        errorMessage = "Error Code:" + error.status + "\nMessage:"+ error.message;
      }
      window.alert(errorMessage);
      return throwError(errorMessage);
  }
   

  
  //Pokemon utility methods
  getType(pokemon: any): string {
    if (pokemon.types && pokemon.types.length > 1) {
      return pokemon.types[0].type.name + '-' + pokemon.types[1].type.name;
    } else if (pokemon.types && pokemon.types.length == 1) {
      return pokemon.types[0].type.name;
    } else {
      return '';
    }
  }

  setPokemonGenders(malePokemons: any, femalePokemons: any, genderless: any) {
    this.genderPokemons.male = malePokemons.pokemon_species_details.map((el: any) => {
      return el.pokemon_species.name;
    });
    this.genderPokemons.female = femalePokemons.pokemon_species_details.map((el: any) => {
      return el.pokemon_species.name;
    });
    this.genderPokemons.genderless = genderless.pokemon_species_details.map((el: any) => {
      return el.pokemon_species.name;
    });
  }

  getPokemonGender(pokemon: string) {
    let gender = [];
    if (this.genderPokemons.male.indexOf(pokemon) > -1)  {
      gender.push('Male');  
    }
    if (this.genderPokemons.female.indexOf(pokemon) > -1)  {
      gender.push('Female');  
    }
    if (this.genderPokemons.genderless.indexOf(pokemon) > -1)  {
      gender.push('Genderless');  
    }
    return gender.join(', ');
  }

  getPokemonEggGroups(species: any) {
    return species.egg_groups.map((el: any) => {
      return el.name;   
    }).join(', ');
  }

  getPokemonAbilities(pokemon: any) {
    return pokemon.abilities.map((el: any) => {
      return el.ability.name;   
    }).join(', ');
  }

  getPokemonWeakness(weakness1: any, weakness2?: any) {
    weakness1 = weakness1.damage_relations.double_damage_from;
    weakness2 =  weakness2?.damage_relations?.double_damage_from || [];
    const weakness = weakness1.concat(weakness2);
    return [...new Set(weakness.map((item: any) => item.name))];
  }

  getPokemonDescription(species: any) {
    const desArr: any = []; 
    species.flavor_text_entries.forEach((el: any) => {
        if (desArr.indexOf(el.flavor_text) === -1 && el.language.name === 'en') {
          desArr.push(el.flavor_text);  
        }
    });
    return desArr.toString();
  }

  getPokemonEvolution(evolution_chain: any, evolutionArr: any) {
    evolutionArr.push({
        id: this.getId(evolution_chain.species.url),
        name: evolution_chain.species.name
      });
      if (evolution_chain.evolves_to.length) {
        this.getPokemonEvolution(evolution_chain.evolves_to[0], evolutionArr);
      } 
    return evolutionArr;
  }

  getId(url: string): number {
    const splitUrl = url.split('/')
    return +splitUrl[splitUrl.length - 2];
  }
  

}
