import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MotorcycleGridComponent } from './motorcycle-grid.component';

describe('MotorcycleGridComponent', () => {
  let component: MotorcycleGridComponent;
  let fixture: ComponentFixture<MotorcycleGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MotorcycleGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MotorcycleGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
