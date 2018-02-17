import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnchantmentsDetailsComponent } from './enchantments-details.component';

describe('EnchantmentsDetailsComponent', () => {
  let component: EnchantmentsDetailsComponent;
  let fixture: ComponentFixture<EnchantmentsDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnchantmentsDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnchantmentsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
