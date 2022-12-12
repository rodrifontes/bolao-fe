import PalpiteMapper from './mappers/PalpiteMapper';
import HttpClient from './utils/HttpClient';

class PalpiteService {

  constructor() {
    this.httpClient = new HttpClient(process.env.REACT_APP_BASE_URL_API);
  }

  async listJogos(orderBy = 'asc', userId) {
    const jogos = await this.httpClient.get(`/palpites?orderBy=${orderBy}&userId='${userId}'`);

    return jogos.map(PalpiteMapper.toDomain);
  }

  createPalpite(palpite) {
    const body = PalpiteMapper.toPersistence(palpite);

    return this.httpClient.post('/palpites', { body });
  }

}

export default new PalpiteService();
