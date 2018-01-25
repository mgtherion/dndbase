import { Injectable, Injector } from '@angular/core';
import { BaseService } from '../base/base.service';

@Injectable()
export class TestService extends BaseService {
  entityUrl = '/api/items';

  constructor(injector: Injector) {
    super(injector);
  }

}
