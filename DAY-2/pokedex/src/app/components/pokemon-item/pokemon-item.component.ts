import { Component, Input } from '@angular/core';
import { environment }  from '../../../environments/environment'; 
import { PokemonService } from '../../shared/services/pokemon.service';

@Component({
  selector: 'app-pokemon-item',
  templateUrl: './pokemon-item.component.html',
  styleUrls: ['./pokemon-item.component.scss']
})
export class PokemonItemComponent {
   
  @Input() pokemon: any;
  @Input() showOnlyImage: boolean = false;
  @Input() isLazyLoad: boolean = false;
 
  baseSpriteUrl: string = environment.config.imageUrl;
  constructor(private pokemonService: PokemonService) {
  }

  getGradient(pokemon: any) : string {
    const types = this.getType(pokemon).split('-');
    return 'linear-gradient('+this.pokemonService.pokemonColor[types[0]] + ',' + 
    this.pokemonService.pokemonColor[types[1]]+')'; 
  }

  getColor(pokemon: any): string {
    return this.pokemonService.pokemonColor[this.pokemonService.getType(pokemon)];
  }
  
  getType(pokemon: any): string {
    return this.pokemonService.getType(pokemon);
  }

}
