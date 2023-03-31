import { Pipe, PipeTransform } from '@angular/core';
import { PokemonService } from '../services/pokemon.service';

@Pipe({
  name: 'filterPokemon',
  pure: false
})
export class FilterPokemonPipe implements PipeTransform {
    
    constructor(private pokemonService: PokemonService) {}

    transform(pokemonArr: any, args: any): any {
      if (!args || (args.searchText === '' && !args.types.length && !args.genders.length)) {
        return pokemonArr;
      }
      return this.filterPokemons(pokemonArr, args).length ? this.filterPokemons(pokemonArr, args) : [{}];
    }

    
    //Filter Pokemons
    filterPokemons(pokemonArr: any, args: any) {
      return pokemonArr.filter((pokemon: any) => {
        let showPokemon = false;
        showPokemon = 
          this.isPokemonExist('search', pokemon, args.searchText) && 
          this.isPokemonExist('type', pokemon, args.types) &&
          this.isPokemonExist('gender', pokemon, args.genders);
        return showPokemon;    
      })
    }

    //Check if pokemon exist on the basis of multiple filters
    isPokemonExist(filterType: string, pokemon: any, filterParam: any) {
        let isExist = false;     
        switch(filterType) {
          case 'search' : 
            isExist = pokemon.name.toLowerCase().includes(filterParam) || (pokemon.id).toString().includes(filterParam);
            break;
          case 'type' : 
            isExist = filterParam.length ? this.isPokemonTypeExist(pokemon, filterParam) : true; 
            break;
          case 'gender' :
            isExist = filterParam.length ? this.isPokemonGenderExist(pokemon, filterParam) : true; 
            break;        
        }   
        return isExist;
    }

    //Check if pokemon exist on the basis of type
    isPokemonTypeExist(pokemon:any, filterTypes: any) {
      return pokemon.types.filter((ele1: any) => {
        return filterTypes.some((ele2: any) => {
          return ele2.name === ele1.type.name;
        });
      }).length > 0;
    }

    //Check if pokemon exist on the basis of gender
    isPokemonGenderExist(pokemon: any, filterGenders: any) {
      return filterGenders.filter((gender: any) => {
        return (this.pokemonService.genderPokemons[gender.name].indexOf(pokemon.name) > -1);
      }).length > 0;
    }

   
}