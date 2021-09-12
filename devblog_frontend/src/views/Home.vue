<template>
  <div class="home">
    <BlogPost :post="aboutMePost" />
    <BlogPost :post="post" v-for="(post,index) in blogPostsFeed" :key="index" />
    <div class="blog-card-wrap">
      <div class="container">
        <h3>View More Recent Blogs</h3>
        <div class="blog-cards">
          <BlogCard :post="post" v-for="(post,index) in blogPostsCards" :key="index" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//import devLogo from "../assets/logo.png";
import BlogPost from "../components/BlogPost.vue";
import BlogCard from "../components/BlogCard.vue";
export default {
  name: "Home",
  components: {
    BlogPost,
    BlogCard,
  },
  computed: {
    aboutMePost() {
      return this.$store.getters.aboutMePost;
    },
    blogPostsFeed() {
      return this.$store.getters.blogPostsFeed;
    },
    blogPostsCards() {
      return this.$store.getters.blogPostsCards;
    }
  },
  mounted() {
    
    // let esvScript = document.createElement('script')
    // esvScript.setAttribute('src', 'https://static.esvmedia.org/crossref/crossref.min.js')
    // document.body.appendChild(esvScript)
  },
};
</script>

<style lang="scss" scoped>
.blog-card-wrap {
  h3 {
    font-weight: 300;
    font-size: 28px;
    margin-bottom: 32px;
  }
}
</style>