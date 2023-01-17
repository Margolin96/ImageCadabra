import store from '../store/index';

export default {
  endpoint: 'https://imagecadabra.justanother.app/game',

  async send(type, data = {}) {
    const payload = {
      user: store.state.user.data
    };
    if (type) payload.event = {
      type,
      data
    };

    const response = await fetch(this.endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    }).then(res => res.json());

    console.log(response);

    return response;
  }
}