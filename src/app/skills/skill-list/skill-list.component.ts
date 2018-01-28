import { Component, Injector } from '@angular/core';
import { BaseListComponent } from '../../base/base-list/base-list.component';
import { SkillService } from '../skill.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'skill-list',
  templateUrl: './skill-list.component.html',
  providers: [ SkillService ]
})
export class SkillListComponent extends BaseListComponent {
  entityDefaults = {
    desctiption: 'default skill desctiption'
  };
  entityEmpty = {
    name: '',
    tooltip: '',
    description: ''
  };

  private skillService: SkillService;

  constructor(injector: Injector) {
    super(injector);

    this.skillService = injector.get(SkillService);
  }

  getService() {
    return this.skillService;
  }

}
