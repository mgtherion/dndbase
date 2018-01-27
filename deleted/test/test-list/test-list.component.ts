import { Component, Injector } from '@angular/core';
import { BaseListComponent } from '../../base/base-list/base-list.component';
import { TestService } from '../test.service';
import { ItemService } from '../../items/item.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'test-list',
  templateUrl: './test-list.component.html',
  providers: [ TestService, ItemService ]
})
export class TestListComponent extends BaseListComponent {
  entityDefaults = {
    desctiption: 'default test desctiption'
  };
  entityEmpty = {
    name: '',
    tooltip: '',
    description: ''
  };

  private testService: TestService;

  constructor(injector: Injector) {
    super(injector);

    this.testService = injector.get(TestService);
  }

  getService() {
    return this.testService;
  }

}
