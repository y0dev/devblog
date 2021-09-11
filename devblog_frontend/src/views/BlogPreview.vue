<template>
  <div class="post-view">
    <div class="container quillWrapper">
      <h2>{{ this.blogTitle }}</h2>
      <img :src="blogCoverPhoto" alt="" />
      <div class="post-content ql-editor" v-html="this.blogHtml"></div>
    </div>
  </div>
</template>

<script>
import { wrapiframes } from '../helpers';
export default {
  name: "PostPreview",
  data() {
    return {
      blogHtml: ''
    }
  },
  async mounted() {
    this.blogHtml = await wrapiframes(this.$store.state.blogInfo)
  },
  destroyed() {
    console.log(this.$store.state.blogInfo)
  },
  computed: {
    blogTitle() {
      return this.$store.state.blogTitle;
    },
    blogCoverPhoto() {
      return this.$store.state.blogPhotoFileURL;
    },
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

<style lang="scss">
.post-view {
  min-height: 100%;

  .container {
    max-width: 1000px;
    padding: 60px 25px;
  }

  .ql-editor {
    padding: 0;
  }

  h2 {
    margin-bottom: 16px;
    font-weight: 300;
    font-size: 32px;
  }

  img {
    width: 100%;
    margin-bottom: 32px;
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
}
</style>