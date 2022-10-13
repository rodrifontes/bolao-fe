import HttpClient from './utils/HttpClient';

class JogoService {

  constructor() {
    this.httpClient = new HttpClient('http://localhost:3001');
  }

  listJogos(orderBy = 'asc') {
    return this.httpClient.get(`/jogos?orderBy=${orderBy}`);
  }

  getTimeById(id) {
    return this.httpClient.get(`/jogos/${id}`);
  }

  createJogo(jogo) {
    return this.httpClient.post('/jogos', { body: jogo });
  }

  updateTime(id, time) {
    return this.httpClient.put(`/jogos/${id}`, { body: time });
  }

  deleteJogo(id) {
    return this.httpClient.delete(`/jogos/${id}`);
  }

}

export default new JogoService();
