import { Component, OnInit, Injector } from '@angular/core';
import { BaseDetailsComponent } from '../../base/base-details/base-details.component';
import { EnchantmentsService } from '../enchantments.service';

@Component({
  selector: 'enchantments-details',
  templateUrl: './enchantments-details.component.html'
})
export class EnchantmentsDetailsComponent extends BaseDetailsComponent {
  private enchantmentsService: EnchantmentsService;

  constructor(injector: Injector) {
    super(injector);

    this.enchantmentsService = injector.get(EnchantmentsService);
  }

  getService() {
    return this.enchantmentsService;
  }
}
