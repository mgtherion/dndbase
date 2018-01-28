import { Injectable, Injector } from '@angular/core';
import { BaseService } from '../base/base.service';

@Injectable()
export class RaceService extends BaseService {
  entityUrl = '/api/races';

  constructor(injector: Injector) {
    super(injector);
  }

}
