import { Injectable, Injector } from '@angular/core';
import { BaseService } from '../base/base.service';

@Injectable()
export class EnchantmentsService extends BaseService {
  entityUrl = '/api/classes';

  constructor(injector: Injector) {
    super(injector);
  }

}
