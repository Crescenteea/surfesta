import axios from 'axios';

const EVENT_URL = 'http://localhost:3000/api/v1/events';

export default class EventService {
  static async getBooks() {
    const response = await axios.get(EVENT_URL);
    return response.data;
  }
}
