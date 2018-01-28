import { Component, Injector } from '@angular/core';
import { BaseListComponent } from '../../base/base-list/base-list.component';
import { RaceService } from '../race.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'race-list',
  templateUrl: './race-list.component.html',
  providers: [ RaceService ]
})
export class RaceListComponent extends BaseListComponent {
  entityDefaults = {
    desctiption: 'default race desctiption'
  };
  entityEmpty = {
    name: '',
    tooltip: '',
    description: ''
  };

  private raceService: RaceService;

  constructor(injector: Injector) {
    super(injector);

    this.raceService = injector.get(RaceService);
  }

  getService() {
    return this.raceService;
  }

}
