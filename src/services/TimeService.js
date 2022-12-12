import HttpClient from './utils/HttpClient';
import TimeMapper from './mappers/TimeMapper';

class TimeService {

  constructor() {
    this.httpClient = new HttpClient(process.env.REACT_APP_BASE_URL_API);
  }

  async listTimes(orderBy = 'asc') {
    const times = await this.httpClient.get(`/times?orderBy=${orderBy}`);

    return times.map(TimeMapper.toDomain);
  }

  async getTimeById(id) {
    const time = await this.httpClient.get(`/times/${id}`);

    return TimeMapper.toDomain(time);
  }

  createTime(time) {
    const body = TimeMapper.toPersistence(time);

    return this.httpClient.post('/times', { body });
  }

  updateTime(id, time) {
    const body = TimeMapper.toPersistence(time);

    return this.httpClient.put(`/times/${id}`, { body });
  }

  deleteTime(id) {
    return this.httpClient.delete(`/times/${id}`);
  }

}

export default new TimeService();
