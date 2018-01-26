import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseDetailsComponent } from './base-details.component';

describe('BaseDetailsComponent', () => {
  let component: BaseDetailsComponent;
  let fixture: ComponentFixture<BaseDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaseDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
