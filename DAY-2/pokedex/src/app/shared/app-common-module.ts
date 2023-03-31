import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterPokemonPipe } from './pipes/filter-pokemon.pipe';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { StatsFilterComponent } from './components/stats-filter/stats-filter.component';
import { LazyLoadDirective } from '../shared/directives/lazy-load.directive';
import { FormsModule } from '@angular/forms';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { DialogComponent } from './components/dialog/dialog.component';
import { HeaderComponent } from './components/header/header.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgMultiSelectDropDownModule.forRoot(),
    NgxSliderModule
  ],
  declarations: [
    FilterPokemonPipe,
    DialogComponent,
    HeaderComponent,
    StatsFilterComponent,
    LazyLoadDirective
  ],
  exports: [
    DialogComponent,
    HeaderComponent,
    StatsFilterComponent,
    FilterPokemonPipe,
    LazyLoadDirective
  ]
})
export class AppCommonModule {}