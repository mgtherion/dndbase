import { Component, OnInit, Injector } from '@angular/core';
import { BaseDetailsComponent } from '../../base/base-details/base-details.component';
import { ItemService } from '../item.service';

@Component({
  selector: 'item-details',
  templateUrl: './item-details.component.html'
})
export class ItemDetailsComponent extends BaseDetailsComponent {
  private itemService: ItemService;

  constructor(injector: Injector) {
    super(injector);

    this.itemService = injector.get(ItemService);
  }

  getService() {
    return this.itemService;
  }
}
