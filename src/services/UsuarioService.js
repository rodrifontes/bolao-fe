import HttpClient from './utils/HttpClient';

class UsuarioService {

  constructor() {
    this.httpClient = new HttpClient(process.env.REACT_APP_BASE_URL_API);
  }

  listUsuarios(orderBy = 'asc') {
    return this.httpClient.get(`/usuarios?orderBy=${orderBy}`);
  }

  getusuarioById(id) {
    return this.httpClient.get(`/usuarios/${id}`);
  }

  createUsuario(usuario) {
    return this.httpClient.post('/usuarios', { body: usuario });
  }

  updateUsuario(id, usuario) {
    return this.httpClient.put(`/usuarios/${id}`, { body: usuario });
  }

  deleteUsuario(id) {
    return this.httpClient.delete(`/usuarios/${id}`);
  }

  login(usuario) {
    return this.httpClient.post('/login', { body: usuario });
  }

}

export default new UsuarioService();
