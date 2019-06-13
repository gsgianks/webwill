import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsUsuarioComponent } from './details-usuario.component';

describe('DetailsUsuarioComponent', () => {
  let component: DetailsUsuarioComponent;
  let fixture: ComponentFixture<DetailsUsuarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsUsuarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
