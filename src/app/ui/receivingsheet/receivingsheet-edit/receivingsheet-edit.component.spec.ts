import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceivingSheetEditComponent } from './receivingsheet-edit.component';

describe('ReceivingsheetEditComponent', () => {
  let component: ReceivingSheetEditComponent;
  let fixture: ComponentFixture<ReceivingSheetEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReceivingSheetEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceivingSheetEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
