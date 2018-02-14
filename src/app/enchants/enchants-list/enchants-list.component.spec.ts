import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnchantsListComponent } from './enchants-list.component';

describe('EnchantsListComponent', () => {
  let component: EnchantsListComponent;
  let fixture: ComponentFixture<EnchantsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnchantsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnchantsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
