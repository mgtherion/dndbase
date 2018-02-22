import { Component, Injector } from '@angular/core';
import { BaseListComponent } from '../../base/base-list/base-list.component';
import { ItemService } from '../item.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'item-list',
  templateUrl: './item-list.component.html',
  providers: [ ItemService ]
})
export class ItemListComponent extends BaseListComponent {
  entityDefaults = {
    desctiption: 'default item desctiption',
    price: 1
  };
  entityEmpty = {
    name: '',
    tooltip: '',
    description: ''
  };

  private itemService: ItemService;

  constructor(injector: Injector) {
    super(injector);

    this.itemService = injector.get(ItemService);
  }

  getService() {
    return this.itemService;
  }

}
