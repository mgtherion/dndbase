import { Component, OnInit, Injector } from '@angular/core';
import { BaseDetailsComponent } from '../../base/base-details/base-details.component';
import { TestService } from '../test.service';

@Component({
  selector: 'test-details',
  templateUrl: './test-details.component.html'
})
export class TestDetailsComponent extends BaseDetailsComponent {
  private testService: TestService;

  constructor(injector: Injector) {
    super(injector);

    this.testService = injector.get(TestService);
  }

  getService() {
    return this.testService;
  }
}
