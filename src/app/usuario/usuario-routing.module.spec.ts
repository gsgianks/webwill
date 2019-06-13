
import { UsuarioRoutingModule } from './usuario-routing.module';

describe('UsuarioRoutingModule', () => {
  let usuarioRoutingModule: UsuarioRoutingModule;

  beforeEach(() => {
    usuarioRoutingModule = new UsuarioRoutingModule();
  });

  it('should create an instance', () => {
    expect(usuarioRoutingModule).toBeTruthy();
  });
});
