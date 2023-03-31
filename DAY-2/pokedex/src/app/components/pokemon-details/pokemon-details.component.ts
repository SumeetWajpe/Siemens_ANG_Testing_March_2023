import { Component, OnInit, Renderer2 } from '@angular/core';
import { combineLatest, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Router, ActivatedRoute } from "@angular/router";
import { PokemonService } from '../../shared/services/pokemon.service';


@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.scss'],
})
export class PokemonDetailsComponent implements OnInit {
  
  pokemonDetails: any = {};
  pokemonDialog: boolean = false;
  pokemonCount: number = 0;
  showMoreText: boolean = false;
 
  unsubscribe: Subject<boolean> = new Subject<boolean>();
  
  constructor(public render: Renderer2, public router: Router, private route: ActivatedRoute,
  private pokemonService: PokemonService) { }

  ngOnInit(): void {
    this.initialize();
  }

  initialize() {
    this.route.params.subscribe((params) => {
      if (params["id"]) {
        this.pokemonCount = params["count"];
        this.pokemonDialog = true;
        this.getPokemonDetails(params["id"]);
      }  
    });
  }

  getPokemonDetails(id: any) {
      const params = {
        details : 'pokemon/'+id,
        species : 'pokemon-species/'+id,
        evolution: 'evolution-chain/'+id
      }
      const sources = [
        this.pokemonService.getPokemonData(params.details),
        this.pokemonService.getPokemonData(params.species),
        this.pokemonService.getPokemonData(params.evolution)
      ];
      combineLatest(sources).pipe(takeUntil(this.unsubscribe))
        .subscribe(([details, species, evolution]) => {
            this.pokemonDetails = details;
            this.getPokemonWeakness(details);
            this.processPokemonDetails(species, evolution);
        });  
  }


  getPokemonWeakness(details: any) {
    const weakSource = [
      this.pokemonService.getPokemonData('type/'+details.types[0].type.name),
    ];
    if (details.types.length == 2) {
      weakSource.push(this.pokemonService.getPokemonData('type/'+details.types[1].type.name));
    }
    combineLatest(weakSource).pipe(takeUntil(this.unsubscribe))
      .subscribe(([weakRes1, weakRes2]) => {
        this.pokemonDetails.weakness = this.pokemonService.getPokemonWeakness(weakRes1, weakRes2);  
      });  
  }


  processPokemonDetails(species: any, evolution: any) {
      this.pokemonDetails.eggGroups = this.pokemonService.getPokemonEggGroups(species);
      this.pokemonDetails.abilities = this.pokemonService.getPokemonAbilities(this.pokemonDetails);
      this.pokemonDetails.description = this.pokemonService.getPokemonDescription(species);
      this.pokemonDetails.evolutions = this.pokemonService.getPokemonEvolution(evolution.chain, []);
      this.pokemonDetails.gender = this.pokemonService.getPokemonGender(this.pokemonDetails.name);
      this.addEvolutionTypes(this.pokemonDetails.evolutions);
  }

  getColor(pokemonType: any): string {
    return this.pokemonService.pokemonColor[pokemonType];
  }

  addEvolutionTypes(evolutions: any) {
    this.pokemonService.getPokemonData('pokemon/'+evolutions[0].id)
      .pipe(takeUntil(this.unsubscribe)).subscribe((res) => { 
          this.pokemonDetails.evolutions = evolutions.map((el:any) => (
            {...el, types: res.types}
          ))
      });
  }

  goToPokemonDetails(navigationType: string) {
      const pokemonid = navigationType === 'prev' ? this.pokemonDetails.id - 1 : this.pokemonDetails.id + 1;
      this.getPokemonDetails(pokemonid);
  }
 

  closeDialogWindow() {
    this.pokemonDialog = false;
    this.router.navigate([{ outlets: { modal: null } }]);
    this.render.setStyle(document.body, "overflowY", "scroll");
  }


  ngOnDestroy() {
    this.unsubscribe.next(true);
    this.unsubscribe.complete();
  }


}
