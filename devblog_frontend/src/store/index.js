import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    sampleBlogCards: [
        {
          title: "This is a Sample Title", coverPhoto: "coding",
          date: "June 17, 2021", video: false
        },
        {
          title: "This is a Sample Title", coverPhoto: "6S4LCPI9wk4",
          date: "June 17, 2021", video: true
        },
      ],
      editPost:null,
  },
  mutations: {
      toggleEditPost(state,payload) {
          state.editPost = payload;
      }
  },
  actions: {
  },
  modules: {
  }
})