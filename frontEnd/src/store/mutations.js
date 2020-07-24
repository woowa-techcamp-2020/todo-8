export default {
  addItem(state, payload) {
    state.items.push(payload);

    return state;
  },
  clearItem(state, payload) {
    state.items.splice(payload.index, 1);

    return state;
  },
  setUser(state, payload) {
    state.currUser = payload;
    return state;
  },

  setColumns(state, payload) {
    state.columns = payload;
    return state;
  },
};
