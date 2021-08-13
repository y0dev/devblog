<template>
  <div class="post-view" v-if="currentBlog">
    <div class="container quillWrapper">
      <h2>{{ this.currentBlog[0].blogTitle }}</h2>
      <h4>Posted on: {{ new Date(this.currentBlog[0].blogDate).toLocaleString("en-us", { dateStyle: "long" }) }}</h4>
      <img class="photo" :src="this.currentBlog[0].blogCoverPhoto" alt="">
      <div class="post-content ql-editor" v-html="this.currentBlog[0].blogInfo"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ViewBlog",
  data() {
    return {
      currentBlog: null,
    };
  },
  async mounted() {
    this.currentBlog = await this.$store.state.blogPosts.filter((post) => {
        
        console.log(post)
      return post.blogID === this.$route.params.blogid;
    });
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
}
</style>