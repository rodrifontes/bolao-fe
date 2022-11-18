import HttpClient from './utils/HttpClient';

class FaseService {
  constructor() {
    this.httpClient = new HttpClient('process.env.REACT_APP_BASE_URL_API');
  }

  listFases() {
    return this.httpClient.get('/fases');
  }
}

export default new FaseService();
