import { TestBed, inject } from '@angular/core/testing';

import { EditUsuarioService } from './edit-usuario.service';

describe('EditUsuarioService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EditUsuarioService]
    });
  });

  it('should be created', inject([EditUsuarioService], (service: EditUsuarioService) => {
    expect(service).toBeTruthy();
  }));
});
