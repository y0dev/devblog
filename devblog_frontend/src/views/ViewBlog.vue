<template>
  <div class="post-view" v-if="currentBlog">
    <div class="container quillWrapper">
      <h2>{{ this.currentBlog[0].blogTitle }}</h2>
      <h4>Posted on: {{ new Date(this.currentBlog[0].blogDate).toLocaleString("en-us", { dateStyle: "long" }) }}</h4>
      <VideoFrame v-if="this.videos" :videos="this.videos"/>
      <img v-else :src="this.currentBlog[0].blogCoverPhoto" alt="" />
      <div class="post-content ql-editor" v-html="this.blogHtml"></div>
      <!-- <LinkCard v-show="this.blogHtml" /> -->
      <!-- link="https://vuejs.org/v2/cookbook/using-axios-to-consume-apis.html"/> -->
      <!-- :link="aboutMePost" -->
    </div>
  </div>
</template>

<script>
import { getiframes,wrapiframes } from '../helpers'
// import LinkCard from '../components/LinkCard.vue'
import VideoFrame from '../components/VideoFrame.vue'
export default {
  name: "ViewBlog",
  components: { 
    // LinkCard,
    VideoFrame 
  },
  data() {
    return {
      currentBlog: null,
      blogHtml: '',
      videos:null,
    };
  },
  async mounted() {
    this.currentBlog = await this.$store.state.blogPosts.filter((post) => {
      return post.blogID === this.$route.params.blogid;
    });
    this.videos = await getiframes(this.currentBlog[0].blogInfo);
    console.log(this.videos)
    this.blogHtml = await wrapiframes(this.currentBlog[0].blogInfo)
    console.log(this.blogHtml)
    this.$loadScript("https://static.esvmedia.org/crossref/crossref.min.js")
    .then(() => {
      console.log('Done')
    })
    .catch(() => {
      console.log('Failed')
    });
    let esvScript = document.createElement('script')
    esvScript.setAttribute('src', 'https://static.esvmedia.org/crossref/crossref.min.js')
    document.body.appendChild(esvScript)
  },
  //insert the following code for vue-meta to work
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
.post-view {
  h4 {
    font-weight: 400;
    font-size: 14px;
    margin-bottom: 24px;
  }

  .video-view {
    position:relative;
    padding:56.25% 0 0 0;

    iframe {
        position:absolute;
        top:0;
        left:0;
        width:100%;
        height:100%;
    }
  }

  a.esv-crossref-link {
    color: #72abbf !important;
  }
}
</style>