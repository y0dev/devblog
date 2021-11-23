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
      videos:[],
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
    font-size: clamp(20px,32px,35px);;
  }

  img {
    width: 100%;
    margin-bottom: 32px;
  }

  .list li {
    margin: 10px 0;
  }

  .list {
    margin: 20px;
    padding: 20px 40px;
    .sub-list {
      margin: 0;
      padding: 0 20px 0 40px;
      font-size: clamp(10px,14px,1em);
    }
  }

  .link-card {
    display: none;
  }
  @media only screen and (max-width: 500px) {
    .list {
      padding: 0;
    }
  }
  @media only screen and (max-width: 720px) {
    .link-card {
      display: flex;
    }
  }

  a.esv-crossref-link {
    color: #72abbf !important;
  }
}

</style>