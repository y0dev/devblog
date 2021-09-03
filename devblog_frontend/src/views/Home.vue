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
    
    let esvScript = document.createElement('script')
    esvScript.setAttribute('src', 'https://static.esvmedia.org/crossref/crossref.min.js')
    document.body.appendChild(esvScript)
  },
  metaInfo() {
    let description = 'I would like to welcome you all to my blog. This is were I share what I am or have read. Along with my thoughts on what going on in the church and our view on this world. Hope you would share this site and come again!';
    let image = 'https://firebasestorage.googleapis.com/v0/b/devblog-322120.appspot.com/o/photos%2Flogo.png?alt=media&token=35466416-7b85-4627-830f-c60567e02e61';
    return { 
      meta: [
        { name: 'description', content:  description},
        { name: 'author', content:  'Devontae Reid'},
        { property: 'og:title', content: document.title},
        { property: 'og:image', content: image},
        { property: 'og:url', content: 'https://devssite.net/'},
        { property: 'og:site_name', content: 'Devssite'},
        {property: 'og:type', content: 'website'},
        { property: 'twitter:title', content: document.title},
        { property: 'twitter:description', content: description}, 
        { property: 'twitter:image', content: image},       
        { property: 'twitter:site', content: '@_yodev_'},      
        {name: 'robots', content: 'index,follow'} 
      ]
    }
  }
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