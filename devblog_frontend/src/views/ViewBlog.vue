<template>
  <div class="post-view" v-if="currentBlog">
    <div class="container quillWrapper">
      <h2>{{ this.currentBlog[0].blogTitle }}</h2>
      <h4>Posted on: {{ new Date(this.currentBlog[0].blogDate).toLocaleString("en-us", { dateStyle: "long" }) }}</h4>
      <img :src="this.currentBlog[0].blogCoverPhoto" alt="" />
      <div class="post-content ql-editor" v-html="this.blogHtml"></div>
    </div>
  </div>
</template>

<script>
import { getIframes } from '../helpers'
export default {
  name: "ViewBlog",
  data() {
    return {
      currentBlog: null,
      blogHtml: '',
    };
  },
  created() {
    // let esvScript = document.createElement('script')
    // esvScript.setAttribute('src', 'https://static.esvmedia.org/crossref/crossref.min.js')
    // document.head.appendChild(esvScript)
  },
  async mounted() {
    this.currentBlog = await this.$store.state.blogPosts.filter((post) => {
      return post.blogID === this.$route.params.blogid;
    });
    this.blogHtml = await getIframes(this.currentBlog[0].blogInfo)
  },
};
</script>

<style lang="scss">
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