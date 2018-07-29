import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ResearchRoutingModule } from './research-routing.module';
import { ParentComponent } from './parent/parent.component';
import { ChildComponent } from './child/child.component';
import { BoldDirective } from './bold.directive';
import { IfDirective } from './if.directive';
import { DataComponent } from './data/data.component';
import { DataService } from './data.service';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    ResearchRoutingModule
  ],
  declarations: [
    ParentComponent,
    ChildComponent,
    BoldDirective,
    IfDirective,
    DataComponent
  ],
  providers: [ DataService ]
})
export class ResearchModule { }
