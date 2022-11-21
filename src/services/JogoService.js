import HttpClient from './utils/HttpClient';

class JogoService {

  constructor() {
    this.httpClient = new HttpClient(process.env.REACT_APP_BASE_URL_API);
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

  updateResultado(id, resultado) {
    console.log(id, resultado)
    return this.httpClient.put(`/jogos/resultado/${id}`, { body: resultado });
  }

  deleteJogo(id) {
    return this.httpClient.delete(`/jogos/${id}`);
  }

}

export default new JogoService();
