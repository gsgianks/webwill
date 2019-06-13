import { TestBed, inject } from '@angular/core/testing';

import { DetailsUsuarioService } from './details-usuario.service';

describe('DetailsUsuarioService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DetailsUsuarioService]
    });
  });

  it('should be created', inject([DetailsUsuarioService], (service: DetailsUsuarioService) => {
    expect(service).toBeTruthy();
  }));
});
