import { Component, OnInit, HostListener, Renderer2, ViewChildren } from '@angular/core';
import { concat, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';
import { PokemonService } from '../../shared/services/pokemon.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit {
 
  filterParams: any;
  pokemonList: any[] = [];
  filterPokemonList: any[] = [];
  pokemonCount : number = 0;
  showLoader:boolean = false;
  pokemonDetails: any;

  pokemonDialog: boolean = false;
  unsubscribe: Subject<boolean> = new Subject<boolean>();

  @ViewChildren('filterRef') filterList: any[];

  constructor(private router: Router, private render: Renderer2, private pokemonService: PokemonService) {}
  
  ngOnInit(): void {
    this.getPokemonList();
  }

  getPokemonList() {
    if (this.pokemonList.length &&  this.pokemonList.length === this.pokemonCount) {
      return;
    }  
    this.showLoader = true;
    let params = "pokemon?offset="+this.pokemonList.length+"&limit=20";
    this.pokemonService.getPokemonData(params)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((response) => {
        this.pokemonCount = response.count;
        this.processPokemonData(response);
        this.showLoader = false;
      });
  }


  processPokemonData(resp: any) {
    const details = resp.results.map((pokemon: any) => this.pokemonService.getPokemonData('pokemon/'+pokemon.name));
    concat(...details).pipe(takeUntil(this.unsubscribe)).subscribe((response: any) => {
      this.pokemonList.push(response);
    });
  }
  
  @HostListener("window:scroll", ["$event"])
    onWindowScroll() {
      if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight) {
        this.getPokemonList();
      } 
  }

  showPokemonDetails(pokemon:any) {
    this.render.setStyle(document.body, "overflowY", "hidden");
    this.router.navigate([{ outlets: { modal: ['home', pokemon.id, this.pokemonCount ] }}], 
      { skipLocationChange: true });
  }

  
  getFilterParams(params: any) {
    this.filterParams = params;
  }
 
  ngOnDestroy() {
    this.unsubscribe.next(true);
    this.unsubscribe.complete();
  }
   
  
}
