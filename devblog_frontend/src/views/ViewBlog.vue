<template>
  <div class="post-view" v-if="currentBlog">
    <div class="container">
      <h2>{{ this.currentBlog[0].blogTitle }}</h2>
      <h4>
        Posted on:
        {{
          new Date(this.currentBlog[0].blogDate).toLocaleString("en-us", {
            dateStyle: "long",
          })
        }}
      </h4>
      <VideoFrame v-if="this.videos.length > 0" :videos="this.videos" />
      <img v-else :src="this.currentBlog[0].blogCoverPhoto" alt="" />
      <div class="post-content" v-html="this.blogHtml"></div>
      <LinkCard
        class="link-card"
        v-for="(video, id) in videos"
        :key="id"
        :video="video"
      />
      <!-- link="https://vuejs.org/v2/cookbook/using-axios-to-consume-apis.html"/> -->
      <!-- :link="aboutMePost" -->
    </div>
  </div>
</template>

<script>
import { getiframes, formatHtml } from "../helpers";
import LinkCard from "../components/LinkCard.vue";
import VideoFrame from "../components/VideoFrame.vue";
export default {
  name: "ViewBlog",
  components: {
    LinkCard,
    VideoFrame,
  },
  data() {
    return {
      currentBlog: null,
      blogHtml: "",
      videos: [],
    };
  },
  async mounted() {
    this.currentBlog = await this.$store.state.blogPosts.filter((post) => {
      return post.blogID === this.$route.params.blogid;
    });
    console.log('some');
    this.videos = await getiframes(this.currentBlog[0].blogInfo);
    this.blogHtml = await formatHtml(this.currentBlog[0].blogInfo);
    // this.$loadScript("https://static.esvmedia.org/crossref/crossref.min.js")
    // .then(() => {
    //   console.log('Done')
    // })
    // .catch(() => {
    //   console.log('Failed')
    // });
    let esvScript = document.createElement('script')
    esvScript.setAttribute('src', 'https://static.esvmedia.org/crossref/crossref.min.js?ver=5.8.2');
    esvScript.setAttribute('id', 'esv-crossreference-tool-js');
    document.body.appendChild(esvScript)

    
      window.dispatchEvent(new Event('esv-crossref.trigger-linkify'));
  },

  destroyed() {
    document.removeChild()
  },
};
</script>

<style lang="scss" scoped>
.post-view {
  h4 {
    font-weight: 400;
    font-size: 14px;
    margin-bottom: 24px;
  }

  a.esv-crossref-link {
    color: #72abbf !important;
  }
}
</style>
