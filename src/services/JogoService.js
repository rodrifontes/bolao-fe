import HttpClient from './utils/HttpClient';
import JogoMapper from './mappers/JogoMapper';
import ResultadoMapper from './mappers/ResultadoMapper';

class JogoService {

  constructor() {
    this.httpClient = new HttpClient(process.env.REACT_APP_BASE_URL_API);
  }

  async listJogos(orderBy = 'asc') {
    const jogos = await this.httpClient.get(`/jogos?orderBy=${orderBy}`);

    return jogos.map(JogoMapper.toDomain);
  }

  async getTimeById(id) {
    const jogo = await this.httpClient.get(`/jogos/${id}`);

    return jogo.toDomain(jogo);
  }

  createJogo(jogo) {
    const body = JogoMapper.toPersistence(jogo);

    return this.httpClient.post('/jogos', { body });
  }

  updateResultado(id, resultado) {
    const body = ResultadoMapper.toPersistence(resultado);

    return this.httpClient.put(`/jogos/resultado/${id}`, { body });
  }

  deleteJogo(id) {
    return this.httpClient.delete(`/jogos/${id}`);
  }

}

export default new JogoService();
