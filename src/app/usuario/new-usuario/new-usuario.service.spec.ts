import { TestBed, inject } from '@angular/core/testing';

import { NewUsuarioService } from './new-usuario.service';

describe('NewUsuarioService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NewUsuarioService]
    });
  });

  it('should be created', inject([NewUsuarioService], (service: NewUsuarioService) => {
    expect(service).toBeTruthy();
  }));
});
