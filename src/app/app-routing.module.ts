import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//import { HeroesComponent } from './heroes/heroes.component';
import { DashboardComponent } from './dashboard/dashboard.component';
//import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { RaceListComponent } from './races/race-list/race-list.component';

const routes: Routes = [
    //{ path: 'heroes', component: HeroesComponent },
    //{ path: 'detail/:id', component: HeroDetailComponent },
    { path: '', component: DashboardComponent },
    { path: 'races', component: RaceListComponent }
];

@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes, { useHash: true }) ]
})
export class AppRoutingModule { }

