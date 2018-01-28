import { Component, OnInit, Injector } from '@angular/core';
import { BaseDetailsComponent } from '../../base/base-details/base-details.component';
import { SkillService } from '../skill.service';

@Component({
  selector: 'skill-details',
  templateUrl: './skill-details.component.html'
})
export class SkillDetailsComponent extends BaseDetailsComponent {
  private skillService: SkillService;

  constructor(injector: Injector) {
    super(injector);

    this.skillService = injector.get(SkillService);
  }

  getService() {
    return this.skillService;
  }
}
