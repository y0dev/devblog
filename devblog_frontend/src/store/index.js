import Vue from 'vue'
import Vuex from 'vuex'
import { auth, aboutMeCollection, usersCollection, postsCollection } from '../firebase'

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
      profileId:null,

      aboutMe: [],
      blogPosts: [],
      theologyBlogPosts: [],
      sportsBlogPosts: [],
      techBlogPosts: [],
      postLoaded: null,
      blogInfo: "Write the blog information here...",
      blogTitle: "",
      blogPhotoName: "",
      blogCategory: "",
      blogPhotoFileURL: null,
      blogPhotoPreview: null,
      editPost:null,

  },
  getters: {
    aboutMePost(state) {
      return state.aboutMe[0];
    },
    blogPostsFeed(state) {
      return state.blogPosts.slice(0,3);
    },
    blogPostsCards(state) {
      return state.blogPosts.slice(3,6);
    }  
  },
  mutations: {
    newBlogPost(state,payload) {
      state.blogInfo = payload;
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
    setBlogState(state, payload) {
      state.blogTitle = payload.blogTitle;
      state.blogInfo = payload.blogInfo;
      state.blogCategory = payload.blogCategory;
      state.blogPhotoFileURL = payload.blogCoverPhoto;
      state.blogPhotoName = payload.blogCoverPhotoName;
    },
    filterBlogPost(state, payload) {
      state.blogPosts = state.blogPosts.filter((post) => post.blogID !== payload);
    },
    updateUser(state,payload) {
      state.user = payload;
    },
    setProfileInfo(state,doc) {
      state.profileId = doc.id;
      state.email = doc.data().email;
      state.name = doc.data().firstName + " " + doc.data().lastName;
      state.username = doc.data().username;
    },
    setProfileInfoMongoDB(state,payload) {
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
    async getCurrentUser({ commit }) {
      const database = await usersCollection.doc(auth.currentUser.uid);
      const dbResults = await database.get();
      commit("setProfileInfo",dbResults);
      commit("setProfileInitials");
    },
    async getImageNameYoutube({ commit }, payload) {
      commit("fileNameChange",payload.url);
      commit("createFileURL",payload.url);
    },
    async getAboutMe({ state }) {
      const dbResults = await aboutMeCollection.get();
      dbResults.forEach((doc) => {
        const data = {
          title: doc.data().title,
          info: doc.data().info,
          photos: doc.data().photos,
        };
        state.aboutMe.push(data);
      });
    },
    async getPost({ state }) {
      const dataBase = await postsCollection.orderBy("date", "desc");
      const dbResults = await dataBase.get();
      dbResults.forEach((doc) => {
        if (!state.blogPosts.some((post) => post.blogID === doc.id)) {
          const data = {
            blogID: doc.data().blogID,
            blogInfo: doc.data().blogInfo,
            blogCategory: doc.data().blogCategory,
            blogCoverPhoto: doc.data().blogCoverPhoto,
            blogTitle: doc.data().blogTitle,
            blogDate: doc.data().date,
            blogCoverPhotoName: doc.data().blogCoverPhotoName,
            videoId: doc.data().videoId,
          };
          state.blogPosts.push(data);
        }
      });
      state.theologyBlogPosts  = state.blogPosts.filter((post) => post.blogCategory.toLowerCase() == 'Theology'.toLowerCase())
      state.sportsBlogPosts = state.blogPosts.filter((post) => post.blogCategory.toLowerCase() == 'Sports'.toLowerCase())
      state.techBlogPosts   = state.blogPosts.filter((post) => post.blogCategory.toLowerCase() == 'Technology'.toLowerCase())
      state.postLoaded = true;
    },
    async updatePost({ commit, dispatch }, payload) {
      commit("filterBlogPost", payload);
      await dispatch("getPost");
    },
    async deletePost({ commit }, payload) {
      const getPost = await postsCollection.doc(payload);
      await getPost.delete();
      commit("filterBlogPost", payload);
    },
  },
  modules: {
  }
})