import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceivingSheetGridComponent } from './receivingsheet-grid.component';

describe('ReceivingsheetGridComponent', () => {
  let component: ReceivingSheetGridComponent;
  let fixture: ComponentFixture<ReceivingSheetGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReceivingSheetGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceivingSheetGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
