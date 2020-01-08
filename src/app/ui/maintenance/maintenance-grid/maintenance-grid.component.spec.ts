import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintenanceGridComponent } from './maintenance-grid.component';

describe('MaintenanceGridComponent', () => {
  let component: MaintenanceGridComponent;
  let fixture: ComponentFixture<MaintenanceGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaintenanceGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaintenanceGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
