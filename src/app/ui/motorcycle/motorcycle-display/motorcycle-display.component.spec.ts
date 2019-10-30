import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MotorcycleDisplayComponent } from './motorcycle-display.component';

describe('MotorcycleDisplayComponent', () => {
  let component: MotorcycleDisplayComponent;
  let fixture: ComponentFixture<MotorcycleDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MotorcycleDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MotorcycleDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
