import HttpClient from './utils/HttpClient';

class PalpiteService {

  constructor() {
    this.httpClient = new HttpClient(process.env.REACT_APP_BASE_URL_API);
  }

  listJogos(orderBy = 'asc', userId) {
    return this.httpClient.get(`/palpites?orderBy=${orderBy}&userId='${userId}'`);
  }

  createPalpite(palpite) {
    return this.httpClient.post('/palpites', { body: palpite });
  }

}

export default new PalpiteService();
