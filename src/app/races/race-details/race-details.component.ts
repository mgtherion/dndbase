import { Component, OnInit, Injector } from '@angular/core';
import { BaseDetailsComponent } from '../../base/base-details/base-details.component';
import { RaceService } from '../race.service';

@Component({
  selector: 'race-details',
  templateUrl: './race-details.component.html'
})
export class RaceDetailsComponent extends BaseDetailsComponent {
  private raceService: RaceService;

  constructor(injector: Injector) {
    super(injector);

    this.raceService = injector.get(RaceService);
  }

  getService() {
    return this.raceService;
  }
}
