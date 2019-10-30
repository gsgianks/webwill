import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MotorcycleViewComponent } from './motorcycle-view.component';

describe('MotorcycleViewComponent', () => {
  let component: MotorcycleViewComponent;
  let fixture: ComponentFixture<MotorcycleViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MotorcycleViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MotorcycleViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
