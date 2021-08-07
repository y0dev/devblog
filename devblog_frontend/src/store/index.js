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
        {
          title: "This is a Sample Title", coverPhoto: "vRo-VofmolM",
          date: "June 17, 2021", video: true
        },
        {
          title: "This is a Sample Title", coverPhoto: "4iRXwDvewBY",
          date: "June 17, 2021", video: true
        },
      ],
      user: null,
      name: null,
      username: null,
      email: null,
      initials: null,

      blogInfo: "Write the blog information here...",
      blogTitle: "",
      blogPhotoName: "",
      blogPhotoFileURL: null,
      blogPhotoPreview: null,
      editPost:null,

  },
  mutations: {
    newBlogPost(state,payload) {
      state.blogInfo = payload;
      //console.log(payload)
    },
    updateBlogTitle(state,payload) {
      state.blogTitle = payload;
    },
    fileNameChange(state,payload) {
      state.blogPhotoName = payload;
    },
    createFileURL(state,payload) {
      state.blogPhotoFileURL = payload;
    },
    openPhotoPreview(state) {
      state.blogPhotoPreview = !state.blogPhotoPreview;
    },
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