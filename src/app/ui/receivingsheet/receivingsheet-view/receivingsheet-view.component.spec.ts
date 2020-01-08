import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceivingSheetViewComponent } from './receivingsheet-view.component';

describe('ReceivingsheetViewComponent', () => {
  let component: ReceivingSheetViewComponent;
  let fixture: ComponentFixture<ReceivingSheetViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReceivingSheetViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceivingSheetViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
