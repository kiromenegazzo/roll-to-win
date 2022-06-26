import axios from 'axios';

class Controller {
  constructor({ apiEndpoint }) {
    this.apiEndpoint = apiEndpoint;
  }

  async callApi({ method, url, body, ...props }) {
    try {
      const response = await axios({
        method,
        url,
        data: body,
        ...props,
      });

      return {
        error: false,
        payload: response.data,
      };
    } catch (error) {
      return {
        error,
        payload: null,
      };
    }
  }

  startGame() {
    return this.callApi({ method: 'GET', url: this.apiEndpoint });
  }

  endGame(body) {
    return this.callApi({ method: 'POST', body, url: this.apiEndpoint });
  }
}

export const controller = new Controller({
  apiEndpoint: '/api/game',
});
