import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- ngModel lives here
import { HttpModule } from '@angular/http';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RaceDetailsComponent } from './races/race-details/race-details.component';
import { RaceListComponent } from './races/race-list/race-list.component';
import { NavigationComponent } from './navigation/navigation.component';
import { Globals } from './globals';
import { KlassListComponent } from './klasses/klass-list/klass-list.component';
import { KlassDetailsComponent } from './klasses/klass-details/klass-details.component';
import { SkillListComponent } from './skills/skill-list/skill-list.component';
import { SkillDetailsComponent } from './skills/skill-details/skill-details.component';
import { ItemDetailsComponent } from './items/item-details/item-details.component';
import { ItemListComponent } from './items/item-list/item-list.component';
import { BaseListComponent } from './base/base-list/base-list.component';
import { BaseDetailsComponent } from './base/base-details/base-details.component';
import { RichareaComponent } from './forms/richarea/richarea.component';
import { TextareaComponent } from './forms/textarea/textarea.component';
import { FieldComponent } from './forms/field/field.component';
import { SearchComponent } from './search/search.component';
import { EnchantmentsListComponent } from './enchantments/enchantments-list/enchantments-list.component';
import { EnchantmentsDetailsComponent } from './enchantments/enchantments-details/enchantments-details.component';
import { ModalComponent } from './modal/modal.component';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    RaceDetailsComponent,
    RaceListComponent,
    NavigationComponent,
    KlassListComponent,
    KlassDetailsComponent,
    SkillListComponent,
    SkillDetailsComponent,
    ItemDetailsComponent,
    ItemListComponent,
    BaseListComponent,
    BaseDetailsComponent,
    RichareaComponent,
    TextareaComponent,
    FieldComponent,
    SearchComponent,
    EnchantmentsListComponent,
    EnchantmentsDetailsComponent,
    ModalComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpModule,
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot()
  ],
  providers: [
    Globals
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
