import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RaceListComponent } from './races/race-list/race-list.component';
import { ClassListComponent } from './classes/class-list/class-list.component';

const routes: Routes = [
    { path: '', component: DashboardComponent },
    { path: 'races', component: RaceListComponent },
    { path: 'races/:id', component: RaceListComponent },
    { path: 'classes', component: ClassListComponent }
];

@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes, { useHash: true }) ]
})
export class AppRoutingModule { }

