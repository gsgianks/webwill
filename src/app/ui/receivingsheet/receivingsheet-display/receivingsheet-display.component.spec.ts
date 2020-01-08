import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceivingSheetDisplayComponent } from './receivingsheet-display.component';

describe('ReceivingsheetDisplayComponent', () => {
  let component: ReceivingSheetDisplayComponent;
  let fixture: ComponentFixture<ReceivingSheetDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReceivingSheetDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceivingSheetDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
