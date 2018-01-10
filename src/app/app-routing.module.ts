import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RaceListComponent } from './races/race-list/race-list.component';

const routes: Routes = [
    { path: '', component: DashboardComponent },
    { path: 'races', component: RaceListComponent }
];

@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes, { useHash: true }) ]
})
export class AppRoutingModule { }

