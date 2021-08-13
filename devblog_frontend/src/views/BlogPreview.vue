<template>
  <div class="post-view">
    <div class="container quillWrapper">
      <h2>{{ this.blogTitle }}</h2>
      <img :src="blogCoverPhoto" alt="" />
      <div class="post-content ql-editor" v-html="blogInfo"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PostPreview",
  data() {
    return {
      blogInfo: null
    }
  },
  computed: {
    blogTitle() {
      return this.$store.state.blogTitle;
    },
    blogHTML() {
      return this.$store.state.blogHTML;
    },
    blogCoverPhoto() {
      return this.$store.state.blogPhotoFileURL;
    },
  },
  updated() {
    let text = this.blogHTML;
    console.log(text)
    if(text.includes("<iframe")) {
      let startingIdx = text.indexOf("<iframe");
      let endingIdx = text.indexOf("</iframe>") + "</iframe>".length
      let iframe = text.substring(startingIdx, endingIdx);
      console.log(iframe)
      const wrapped = '<div src="video-view">\n\t' + iframe + '\n</div>\n';
      this.blogHTML = text.replace(iframe, wrapped);
    }
  },
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