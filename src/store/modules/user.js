// import api from '../../api';

const state = () => ({
  data: {
    id: null,
    pic: null,
    name: null,
    querystring: null
  },
  vkData: {},
  movedCard: null,
  selectedCard: null
});

const getters = {
  data(state) {
    return state.data;
  },

  vkData(state) {
    return state.vkData;
  }
};

const actions = {
  querystringSet({ commit }, querystring) {
    commit('querystringSet', querystring);
  },

  vkDataSet({ commit }, vkData) {
    commit('vkDataSet', vkData);
  },

  movedCardSet({ commit }, card) {
    commit('movedCardSet', card);
  },
  selectedCardSet({ commit }, card) {
    commit('selectedCardSet', card);
  }
};

const mutations = {
  querystringSet(state, querystring) {
    state.data.querystring = querystring;
  },

  vkDataSet(state, vkData) {
    Object.assign(state.data, {
      id: vkData.id,
      name: [vkData.first_name/*, vkData.last_name*/].filter(Boolean).join(' '),
      pic: vkData.photo_100
    });

    state.vkData = vkData;
  },

  movedCardSet(state, card) {
    state.movedCard = Object.assign({}, card);
  },
  selectedCardSet(state, card) {
    state.selectedCard = Object.assign({}, card);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}