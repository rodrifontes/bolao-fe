import HttpClient from './utils/HttpClient';

class TimesService {

  constructor() {
    this.httpClient = new HttpClient('http://localhost:3001');
  }

  listTimes(orderBy = 'asc') {
    return this.httpClient.get(`/times?orderBy=${orderBy}`);
  }

  getTimeById(id) {
    return this.httpClient.get(`/times/${id}`);
  }

  createTime(time) {
    return this.httpClient.post('/times', { body: time });
  }

  updateTime(id, time) {
    return this.httpClient.put(`/times/${id}`, { body: time });
  }

  deleteTime(id) {
    return this.httpClient.delete(`/times/${id}`);
  }

}

export default new TimesService();
