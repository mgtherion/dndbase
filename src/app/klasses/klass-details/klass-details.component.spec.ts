import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KlassDetailsComponent } from './klass-details.component';

describe('KlassDetailsComponent', () => {
  let component: KlassDetailsComponent;
  let fixture: ComponentFixture<KlassDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KlassDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KlassDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
