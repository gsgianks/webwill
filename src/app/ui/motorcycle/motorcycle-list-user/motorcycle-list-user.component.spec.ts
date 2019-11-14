import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MotorcycleListUserComponent } from './motorcycle-list-user.component';

describe('MotorcycleListUserComponent', () => {
  let component: MotorcycleListUserComponent;
  let fixture: ComponentFixture<MotorcycleListUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MotorcycleListUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MotorcycleListUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
