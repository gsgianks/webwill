import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeOption2Component } from './home-option2.component';

describe('HomeOption2Component', () => {
  let component: HomeOption2Component;
  let fixture: ComponentFixture<HomeOption2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeOption2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeOption2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
