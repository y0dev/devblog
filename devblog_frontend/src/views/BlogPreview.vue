<template>
  <div class="post-view">
    <div class="container">
      <h2>{{ this.blogTitle }}</h2>
      <VideoFrame v-if="this.videos.length > 0" :videos="this.videos"/>
      <img v-else :src="blogCoverPhoto" alt="" />
      <div class="post-content" v-html="this.blogHtml"></div>
    </div>
  </div>
</template>

<script>
import { getiframes,formatHtml } from '../helpers'
// import LinkCard from '../components/LinkCard.vue'
import VideoFrame from '../components/VideoFrame.vue'
export default {
  name: "PostPreview",
  components: { 
    // LinkCard,
    VideoFrame 
  },
  data() {
    return {
      blogHtml: '',
      videos:null,
    }
  },
  async mounted() {
    this.videos = await getiframes(this.$store.state.blogInfo);
    this.blogHtml = await formatHtml(this.$store.state.blogInfo);
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

  .list li {
    margin: 20px 0;
  }

  // .video-view {
  //   position:relative;
  //   padding:56.25% 0 0 0;

  //   iframe {
  //       position:absolute;
  //       top:0;
  //       left:0;
  //       width:100%;
  //       height:100%;
  //   }
  // }

  
  a.esv-crossref-link {
    color: #72abbf !important;
  }
}

</style>