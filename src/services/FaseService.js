import FaseMapper from './mappers/FaseMapper';
import HttpClient from './utils/HttpClient';

class FaseService {
  constructor() {
    this.httpClient = new HttpClient(process.env.REACT_APP_BASE_URL_API);
  }

  async listFases() {
    const fases = await this.httpClient.get('/fases');

    return fases.map(FaseMapper.toDomain);
  }
}

export default new FaseService();
