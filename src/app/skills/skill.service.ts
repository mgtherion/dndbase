import { Injectable, Injector } from '@angular/core';
import { BaseService } from '../base/base.service';

@Injectable()
export class SkillService extends BaseService {
  entityUrl = '/api/skills';

  constructor(injector: Injector) {
    super(injector);
  }

}
