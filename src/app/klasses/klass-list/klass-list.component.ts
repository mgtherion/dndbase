import { Component, Injector } from '@angular/core';
import { BaseListComponent } from '../../base/base-list/base-list.component';
import { KlassService } from '../klass.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'klass-list',
  templateUrl: './klass-list.component.html',
  providers: [ KlassService ]
})
export class KlassListComponent extends BaseListComponent {
  entityDefaults = {
    desctiption: 'default klass desctiption'
  };
  entityEmpty = {
    name: '',
    tooltip: '',
    description: ''
  };

  private klassService: KlassService;

  constructor(injector: Injector) {
    super(injector);

    this.klassService = injector.get(KlassService);
  }

  getService() {
    return this.klassService;
  }

}
