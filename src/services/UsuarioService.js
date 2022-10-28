import HttpClient from './utils/HttpClient';

class UsuarioService {

  constructor() {
    this.httpClient = new HttpClient('http://localhost:3001');
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

  updateTime(id, usuario) {
    return this.httpClient.put(`/usuarios/${id}`, { body: usuario });
  }

  deleteUsuario(id) {
    return this.httpClient.delete(`/usuarios/${id}`);
  }

}

export default new UsuarioService();
