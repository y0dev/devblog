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
    this.videos = await getiframes(this.currentBlog[0].blogInfo);
    this.blogHtml = await formatHtml(this.currentBlog[0].blogInfo);

    // this.$loadScript("https://static.esvmedia.org/crossref/crossref.min.js")
    // .then(() => {
    //   console.log('Done')
    // })
    // .catch(() => {
    //   console.log('Failed')
    // });
    // let esvScript = document.createElement('script')
    // esvScript.setAttribute('src', 'https://static.esvmedia.org/crossref/crossref.min.js')
    // document.body.appendChild(esvScript)
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

  .link-card {
    display: none;
  }

  @media only screen and (max-width: 720px) {
    .link-card {
      display: flex;
    }
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
