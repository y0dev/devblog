<template>
  <div class="home">
    <BlogPost :post="aboutMeScreen" />
    <BlogPost :post="post" v-for="(post,index) in blogPosts" :key="index" />
    
  </div>
</template>

<script>
//import devLogo from "../assets/logo.png";
import BlogPost from "../components/BlogPost.vue";
export default {
  name: "Home",
  components: {
    BlogPost,
  },
  data() {
    return {
      aboutMeScreen: {
        title: "About Me",
        info: "Hi, I'm Devontae",
        aboutMeScreen: true,
        photo:"me",
      },
      blogPosts: [
        {
          title: "This is a Sample Title",
          info: "Sample descrition goes here",
          coverPhoto: "coding"
        },
        {
          title: "This is a Sample Title",
          info: "Sample descrition goes here",
          coverPhoto: "designed-for-everyone"
        },
      ]
    }
  },
};
</script>

<style lang="sass" scoped>

</style>