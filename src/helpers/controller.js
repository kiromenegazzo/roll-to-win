import axios from 'axios';

const callApi = async ({
  method, url, body, ...props
}) => {
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
};

class Controller {
  constructor({ apiEndpoint }) {
    this.apiEndpoint = apiEndpoint;
  }

   startGame = () => callApi({ method: 'GET', url: this.apiEndpoint });

   endGame = (body) => callApi({ method: 'POST', body, url: this.apiEndpoint });
}

export const controller = new Controller({
  apiEndpoint: '/api/game',
});
