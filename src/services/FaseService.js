import HttpClient from './utils/HttpClient';

class FaseService {
  constructor() {
    this.httpClient = new HttpClient('process.env.BASE_URL_API');
  }

  listFases() {
    return this.httpClient.get('/fases');
  }
}

export default new FaseService();
