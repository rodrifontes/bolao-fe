import HttpClient from './utils/HttpClient';
import CampeonatoMapper from './mappers/CampeonatoMapper';

class CampeonatoService {

  constructor() {
    this.httpClient = new HttpClient(process.env.REACT_APP_BASE_URL_API);
  }

  async listCampeonatos(orderBy = 'asc') {
    const campeonatos = await this.httpClient.get(`/campeonatos?orderBy=${orderBy}`);

    return campeonatos.map(CampeonatoMapper.toDomain);
  }

  async getCampeonatoById(id) {
    const campeonato = await this.httpClient.get(`/campeonatos/${id}`);

    return CampeonatoMapper.toDomain(campeonato);
  }

  createCampeonato(campeonato) {
    const body = CampeonatoMapper.toPersistence(campeonato);

    return this.httpClient.post('/campeonatos', { body });
  }

  updateCampeonato(id, campeonato) {
    const body = CampeonatoMapper.toPersistence(campeonato);

    return this.httpClient.put(`/campeonatos/${id}`, { body });
  }

  deleteCampeonato(id) {
    return this.httpClient.delete(`/campeonatos/${id}`);
  }

}

export default new CampeonatoService();
