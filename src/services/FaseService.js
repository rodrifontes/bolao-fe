import HttpClient from './utils/HttpClient';

class FaseService {
  constructor() {
    this.httpClient = new HttpClient('http://localhost:3001');
  }

  listFases() {
    return this.httpClient.get('/fases');
  }
}

export default new FaseService();
