import { Component, OnInit, Injector } from '@angular/core';
import { BaseDetailsComponent } from '../../base/base-details/base-details.component';
import { KlassService } from '../klass.service';

@Component({
  selector: 'klass-details',
  templateUrl: './klass-details.component.html'
})
export class KlassDetailsComponent extends BaseDetailsComponent {
  private klassService: KlassService;

  constructor(injector: Injector) {
    super(injector);

    this.klassService = injector.get(KlassService);
  }

  getService() {
    return this.klassService;
  }
}
