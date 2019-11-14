const gistIds = ["95b36c27afd7719aab26efad343d6534"];

export const state = () => ({
  list: []
});

export const mutations = {
  addGist(state, payload) {
    state.list.push(payload);
  }
};

export const actions = {
  async loadGists({ commit, getters }) {
    for (let gistId of gistIds) {
      if (!getters["gistById"](gistId)) {
        const gist = await this.$http.$get(
          `https://api.github.com/gists/${gistId}`
        );
        console.log("store/gists.js.loadGists: gist =", gist);
        if (gist) {
          commit("addGist", {
            gistId: gistId,
            data: gist
          });
        }
      }
    }
  }
};

export const getters = {
  gistById: state => gistId => state.list.find(gist => gist.data.id === gistId)
};
