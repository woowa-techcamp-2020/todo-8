export default {
  addItem(context, payload) {
    context.commit("addItem", payload);
  },
  clearItem(context, payload) {
    context.commit("clearItem", payload);
  },
  setUser(context, payload) {
    context.commit("setUser", payload);
  },
};
