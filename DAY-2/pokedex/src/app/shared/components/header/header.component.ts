import { Component, EventEmitter, Inject, OnInit, Output, PLATFORM_ID, Renderer2 } from '@angular/core';
import { combineLatest, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { PokemonService } from '../../services/pokemon.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  
  typeList: any = [];
  genderList: any = [];
  statList: any = [];
  searchText: string;
  selectedTypes: any = [];
  selectedGenders: any = [];

  filterDialog: boolean = false;
  isBrowser: boolean;
  dropdownSettings : IDropdownSettings = {
    singleSelection: false,
    enableCheckAll: false,
    idField: 'url',
    textField: 'name',
    itemsShowLimit: 1,
    allowSearchFilter: false
  };

  unsubscribe: Subject<boolean> = new Subject<boolean>();

  @Output() emitFilterParams: EventEmitter<string>  = new EventEmitter();
 
  constructor(@Inject(PLATFORM_ID) platformId: Object, public render: Renderer2, 
    private pokemonService: PokemonService) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    this.getFilterData();
  }

  getFilterData() {
    const params = {
      type : 'type',
      gender : 'gender',
      stat: 'stat',
      maleGender : 'gender/2',
      femaleGender: 'gender/1',
      genderless: 'gender/3'  
    }
    const sources = [
      this.pokemonService.getPokemonData(params.type),
      this.pokemonService.getPokemonData(params.gender),
      this.pokemonService.getPokemonData(params.stat),
      this.pokemonService.getPokemonData(params.maleGender),
      this.pokemonService.getPokemonData(params.femaleGender),
      this.pokemonService.getPokemonData(params.genderless)
    ];
    combineLatest(sources).pipe(takeUntil(this.unsubscribe))
        .subscribe(([types, genders, stats, male, female, genderless]) => {
            this.typeList = types.results;
            this.genderList = genders.results;
            this.statList = stats.results;
            this.pokemonService.setPokemonGenders(male, female, genderless);
        });  
  }
 

  showHideFilterDialog(visibleCheck: boolean) {
    if (visibleCheck) {
      this.filterDialog = true;
      this.render.setStyle(document.body, "overflowY", "hidden");
    } else {
      this.filterDialog = false;
      this.render.setStyle(document.body, "overflowY", "scroll");
    }
  }
  
  applyFilters() {
    this.actionDispatch();
    this.showHideFilterDialog(false);
  }

  resetFilters() {
    this.selectedGenders = [];
    this.selectedTypes = [];
    this.actionDispatch();
    this.showHideFilterDialog(false);
  }

  actionDispatch() {
    let filterParams : any = {};
    filterParams.searchText = this.searchText || '' ;
    filterParams.types = this.selectedTypes || [];
    filterParams.genders = this.selectedGenders || [];
    this.emitFilterParams.emit(filterParams);
  }

  ngOnDestroy() {
    this.unsubscribe.next(true);
    this.unsubscribe.complete();
  }
   

 
}
