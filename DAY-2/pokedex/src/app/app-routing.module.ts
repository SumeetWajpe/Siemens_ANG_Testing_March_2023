import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PokemonDetailsComponent } from './components/pokemon-details/pokemon-details.component';
import { PokemonListComponent } from './components/pokemon-list/pokemon-list.component';

const routes: Routes = [
	{ path: '',  redirectTo: 'home', pathMatch: 'full' },
	{ path: 'home', component: PokemonListComponent },
	{ path: 'home/:id/:count', component: PokemonDetailsComponent, outlet: 'modal' },
	{ path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { 
	scrollPositionRestoration: 'enabled', 
	initialNavigation: 'enabledBlocking'
	})], // stop reloading on same url { onSameUrlNavigation: 'reload' }
  exports: [RouterModule]
})
export class AppRoutingModule { }
