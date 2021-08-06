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
      user: null,
      name: null,
      username: null,
      email: null,
      initials: null

  },
  mutations: {
      toggleEditPost(state,payload) {
          state.editPost = payload;
      },
      setProfileInfo(state,payload) {
        let user = JSON.parse(payload);
        state.user = { 
          name: user.name,
          email: user.email,
          username: user.username,
        }
        state.name = user.name;
        state.email = user.email;
        state.username = user.username;
      },
      setProfileInitials(state) {
        let [firstName, lastName ] = state.name.split(" ");
        state.initials =
        firstName.match(/(\b\S)?/g).join("") + lastName.match(/(\b\S)?/g).join("");
      },

  },
  actions: {
  },
  modules: {
  }
})