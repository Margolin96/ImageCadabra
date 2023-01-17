import api from '../../api/api';

const state = () => ({
  state: null,
  room: null,
  phase: null
});

const getters = {
  room(state) {
    return state ? state.room : null;
  },
  phase(state) {
    return state && state.room ? state.room.phase : {};
  }
};

// при нажатии на играть должно открываться всплывающее окно
// при нажати на кнопку на нем должно отправляться событи joinRoom
// выбрали фразу из 5 карточек фраз
// отправляем chooseimage
// выбрали картинку из 5 картинок
// увеличилась перетащил отправляем событие chooseImage
// растащить картинки по фразам после каждой отправляем событие vote
// результат голосования просто отрисовать

const actions = {
  async getState({ state, commit }) {
    const response = await api.send();

    if (!state || !response || !state.phase || !response.room.phase || state.phase.type !== response.room.phase.type) {
      commit('user/selectedCardSet', false, { root: true });
    }

    commit('setState', response);
  },
  async joinRoom({ state, commit }, { roomId, gameType, isPrivate}) {
    const response = await api.send('JoinRoom', {
      roomId: roomId,
      gameType: gameType,
      isPrivate: isPrivate
    });

    if (!state || !response || !state.phase || !response.room.phase || state.phase.type !== response.room.phase.type) {
      commit('user/selectedCardSet', null, { root: true });
    }

    commit('setState', response);
  },
  async chooseImage({ state, commit }, { phraseId, imageUrl}) {
    const response = await api.send('ChooseImage', {
      phraseId: phraseId,
      imageUrl: imageUrl
    });

    if (!state || !response || !state.phase || !response.room.phase || state.phase.type !== response.room.phase.type) {
      commit('user/selectedCardSet', false, { root: true });
    }

    commit('setState', response);
  },
  async vote({ state, commit }, { userId, phraseId }) {
    const response = await api.send('Vote', {
      userId: userId,
      phraseId: phraseId
    });

    if (!state || !response || !state.phase || !response.room.phase || state.phase.type !== response.room.phase.type) {
      commit('user/selectedCardSet', false, { root: true });
    }

    commit('setState', response);
  },
  async leaveRoom({ state, commit }) {
    const response = await api.send('LeaveRoom');

    if (!state || !response || !state.phase || !response.room.phase || state.phase.type !== response.room.phase.type) {
      commit('user/selectedCardSet', false, { root: true });
    }

    commit('setState', response);
  }
};

const mutations = {
  setState(state, newState) {
    state.state = newState;
    state.room = state.state ? state.state.room : null;
    state.phase = state.room ? state.room.phase : null;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}