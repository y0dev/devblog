<template>
  <div class="video-container" id="container">
    <div class="video-wrap">
      <div class="overlay" id="o1">
        <h2>{{ video_title }}</h2>
        <button class="btn play-btn" v-on:click="playVideoAction">Play Video</button>
      </div>
      <div class="picture" id="p1">
        <img :src="image" alt="">
      </div>
      <div class="video" id="v1">
        <iframe id="iv1" :src="this.video_link" frameborder="0" allowfullscreen></iframe>
      </div>   
    </div>
    <div class="children-container" v-show="this.multiple">
      <div class="children" v-for="video in videos" :key="video.index">
        <VideoChild :video="video"/>
      </div>
    </div>
    </div>
</template>

<script>
import VideoChild from './VideoChild.vue';
export default {
  name: 'VideoFrame',
  props:['videos'],
  components: {
    VideoChild
  },
  data() {
    return {
      image: null,
      multiple: false,
      video_link: null,
      video_title: null,
    }
  },
  mounted() {
    // Check if there are multiple videos
    if(this.videos) {
      let container = document.getElementById('container');
      if(this.videos.length > 1) {
        this.multiple = true;
        container.style.display = 'grid';
      } else {
        let video = this.videos[0];
        this.image = video.info.image;
        this.video_link = video.src;
        this.video_title = video.info.title;
        container.style.display = 'block';
        container.style.marginBottom = '40px';
      }
    }
  },
  methods: {
    playVideoAction() {
      let overlay = document.getElementById('o1');
      let picture = document.getElementById('p1');
      let video = document.getElementById('v1');
      let iframe = document.getElementById('iv1');
      
      picture.style.zIndex = '-300';
      video.style.zIndex = '200';
      overlay.style.display = 'none';
      video.style.display = 'block';

      // Play Video
      var symbol = iframe.src.indexOf("?") > -1 ? "&" : "?";
      //modify source to autoplay and start video
      iframe.src += symbol + "autoplay=1";
    }
  },
}
</script>

<style scoped>
@import "../css/utilities.css";
.video-container{
  max-width: 750px;
  margin: auto;
  position: relative;
  display: grid;
  grid-template-rows: 2fr 1fr;
  gap: 30px;

}

.video-wrap{
  position: relative;
  height: 100%;
  /* background-color: blue; */
}

.overlay{
  background-color: rgba(0, 0, 0, 0.35);
  height: 100%;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: #FFFFFF;
  position: absolute;
  display: flex;
  flex-wrap: wrap;
  top: 0;

}

.picture{
  z-index: -100;
  width: 100%;
  height: 100%;
  top: 0;
}

.video{
  display: none;
  position: absolute;
  height: 100%;
  width: 100%;
  z-index: -200;
  top: 0;
}

img {
    margin-bottom: 0;
}

iframe{
  width: 100%;
  height: 100%;
}

h2{
  font-weight: 500;
}

.play-btn{
  background-color: rgba(255, 0, 0, 0.65);
  border-radius: 20px;
  text-decoration: none;
}
</style>