import { Options } from '@angular-slider/ngx-slider';
import { Component, Input, OnInit } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';

@Component({
  selector: 'app-stats-filter',
  templateUrl: './stats-filter.component.html',
  styleUrls: ['./stats-filter.component.scss']
})
export class StatsFilterComponent {

  @Input() statList: any;
  showStatFilter: boolean = false;
  
  options: Options = {
    floor: 0,
    ceil: 210
  };

  constructor(private pokemonService: PokemonService) { }

  ngOnInit(): void {}
  
  onSliderChange(selectedValues: any, statName: any) {
    console.log(selectedValues, statName);
  }

  reset() {}

  apply() {}

}
