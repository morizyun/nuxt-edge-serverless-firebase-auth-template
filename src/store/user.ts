import { Auth } from "~/plugins/firebase-client-init";

export const state = () => ({
  loadingUser: true,
  user: null
});

export const mutations = {
  setUser(state, payload) {
    state.user = payload;
    state.loadingUser = false;
  }
};

export const actions = {
  async signInWithEmail({ commit }, { email, password }) {
    return new Promise((resolve, reject) => {
      Auth.signInWithEmailAndPassword(email, password)
        .then(res => {
          resolve();
        })
        .catch(err => reject(err));
    });
  },

  setUser({ commit }, user) {
    commit("setUser", user);
  },

  signOut({ commit }) {
    Auth.signOut()
      .then(() => {
        commit("setUser", null);
        // @ts-ignore
        if (process.client) {
          window.location.reload();
        }
      })
      .catch(err => console.error(err));
  }
};
