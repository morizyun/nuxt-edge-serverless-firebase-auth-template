export const state = () => ({
  isMenuActive: false
});

export const mutations = {
  toggleMenu(state) {
    state.isMenuActive = !state.isMenuActive;
  }
};

export const actions = {
  async toggleMenu(ctx) {
    ctx.commit("toggleMenu");
  }
};
