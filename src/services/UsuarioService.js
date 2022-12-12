import UsuarioMapper from './mappers/UsuarioMapper';
import HttpClient from './utils/HttpClient';

class UsuarioService {

  constructor() {
    this.httpClient = new HttpClient(process.env.REACT_APP_BASE_URL_API);
  }

  async listUsuarios(orderBy = 'asc') {
    const usuarios = await this.httpClient.get(`/usuarios?orderBy=${orderBy}`);

    return usuarios.map(UsuarioMapper.toDomain);
  }

  async getusuarioById(id) {
    const usuario = await this.httpClient.get(`/usuarios/${id}`);

    return UsuarioMapper.toDomain(usuario);
  }

  async createUsuario(usuario) {
    const body = UsuarioMapper.toPersistence(usuario);

    return this.httpClient.post('/usuarios', { body });
  }

  updateUsuario(id, usuario) {
    const body = UsuarioMapper.toPersistence(usuario);

    return this.httpClient.put(`/usuarios/${id}`, { body });
  }

  deleteUsuario(id) {
    return this.httpClient.delete(`/usuarios/${id}`);
  }

  login(usuario) {
    const body = UsuarioMapper.toPersistence(usuario);

    return this.httpClient.post('/login', { body });
  }

}

export default new UsuarioService();
