import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RaceListComponent } from './races/race-list/race-list.component';
import { KlassListComponent } from './klasses/klass-list/klass-list.component';
import { SkillListComponent } from './skills/skill-list/skill-list.component';
import { ItemListComponent } from './items/item-list/item-list.component';
import { SearchComponent } from './search/search.component';
import { EnchantmentsListComponent } from './enchantments/enchantments-list/enchantments-list.component';
import { AuthGuard } from './auth/authGuard';
import { ForbiddenComponent } from './forbidden/forbidden.component';

const routes: Routes = [
    { path: '', component: DashboardComponent },
    { path: 'races', component: RaceListComponent },
    { path: 'races/:id', component: RaceListComponent },
    { path: 'classes', component: KlassListComponent },
    { path: 'classes/:id', component: KlassListComponent },
    { path: 'skills', component: SkillListComponent, canActivate: [AuthGuard] },
    { path: 'skills/:id', component: SkillListComponent, canActivate: [AuthGuard] },
    { path: 'items', component: ItemListComponent },
    { path: 'items/:id', component: ItemListComponent },
    { path: 'search', component: SearchComponent },
    { path: 'enchantments', component: EnchantmentsListComponent },
    { path: 'enchantments/:id', component: EnchantmentsListComponent },
    { path: 'forbidden', component: ForbiddenComponent }
];

@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes, { useHash: true }) ],
  providers: [ AuthGuard ]
})
export class AppRoutingModule { }
