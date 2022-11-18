import HttpClient from './utils/HttpClient';

class CampeonatoService {

  constructor() {
    this.httpClient = new HttpClient('process.env.BASE_URL_API');
  }

  listCampeonatos(orderBy = 'asc') {
    return this.httpClient.get(`/campeonatos?orderBy=${orderBy}`);
  }

  getCampeonatoById(id) {
    return this.httpClient.get(`/campeonatos/${id}`);
  }

  createCampeonato(campeonato) {
    return this.httpClient.post('/campeonatos', { body: campeonato });
  }

  updateCampeonato(id, campeonato) {
    return this.httpClient.put(`/campeonatos/${id}`, { body: campeonato });
  }

  deleteCampeonato(id) {
    return this.httpClient.delete(`/campeonatos/${id}`);
  }

}

export default new CampeonatoService();
