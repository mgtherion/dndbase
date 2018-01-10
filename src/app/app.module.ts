import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- ngModel lives here
import { HttpModule } from '@angular/http';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RaceDetailsComponent } from './races/race-details/race-details.component';
import { RaceListComponent } from './races/race-list/race-list.component';
import { NavigationComponent } from './navigation/navigation.component';
import { Globals } from './globals';
import { ClassesComponent } from './classes/classes.component';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    RaceDetailsComponent,
    RaceListComponent,
    NavigationComponent,
    ClassesComponent
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
