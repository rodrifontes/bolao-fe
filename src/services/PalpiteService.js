import HttpClient from './utils/HttpClient';

class PalpiteService {

  constructor() {
    this.httpClient = new HttpClient('http://192.168.0.17:3001');
  }

  listJogos(orderBy = 'asc', userId) {
    return this.httpClient.get(`/palpites?orderBy=${orderBy}&userId='${userId}'`);
  }

  createPalpite(palpite) {
    return this.httpClient.post('/palpites', { body: palpite });
  }

}

export default new PalpiteService();
