import { Component, Injector } from '@angular/core';
import { BaseListComponent } from '../../base/base-list/base-list.component';
import { EnchantmentsService } from '../enchantments.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'enchantments-list',
  templateUrl: './enchantments-list.component.html',
  providers: [ EnchantmentsService ]
})
export class EnchantmentsListComponent extends BaseListComponent {
  entityDefaults = {
    desctiption: 'default enchantments desctiption'
  };
  entityEmpty = {
    name: '',
    tooltip: '',
    description: ''
  };

  private enchantmentsService: EnchantmentsService;

  constructor(injector: Injector) {
    super(injector);

    this.enchantmentsService = injector.get(EnchantmentsService);
  }

  getService() {
    return this.enchantmentsService;
  }

}
