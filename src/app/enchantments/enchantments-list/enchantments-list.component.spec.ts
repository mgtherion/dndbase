import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnchantmentsListComponent } from './enchantments-list.component';

describe('EnchantmentsListComponent', () => {
  let component: EnchantmentsListComponent;
  let fixture: ComponentFixture<EnchantmentsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnchantmentsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnchantmentsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
