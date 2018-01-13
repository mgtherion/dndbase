import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KlassListComponent } from './klass-list.component';

describe('KlassListComponent', () => {
  let component: KlassListComponent;
  let fixture: ComponentFixture<KlassListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KlassListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KlassListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
