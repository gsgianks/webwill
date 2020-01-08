import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintenanceDisplayComponent } from './maintenance-display.component';

describe('MaintenanceDisplayComponent', () => {
  let component: MaintenanceDisplayComponent;
  let fixture: ComponentFixture<MaintenanceDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaintenanceDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaintenanceDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
