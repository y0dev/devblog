<template>
  <article>
    <h1>Theology</h1>
    <p>As was mentioned in the section above I have a love for Christ. Simply because without 
    <span ref="reactive" @mouseenter="reactiveHighlight" @mouseleave="reactiveHighlightRemove">Christ</span>
    I would not know God. 
    <span ref="gdesign" @mouseenter="gHighlight" @mouseleave="gHighlightRemove">The only God!</span>
    </p>
    <a href="https://www.biblegateway.com/passage/?search=John%2014:5-7&version=ESV"><blockquote>5 
    Thomas said to him, “Lord, we do not know where you are going. How can we know the way?” 
    6 Jesus said to him, “I am the way, and the truth, and the life. No one comes to the Father except 
    through me. 7 If you had known me, you would have known my Father also. From now on you do know him 
    and have seen him.<span>- John 14:5-7</span></blockquote></a>
    <p>As was mentioned in the section above I have a love for Christ. Simply because without 
    <span ref="reactive" @mouseenter="reactiveHighlight" @mouseleave="reactiveHighlightRemove">Christ</span>
    I would not know God. 
    <span ref="gdesign" @mouseenter="gHighlight" @mouseleave="gHighlightRemove">The only God!</span>
    </p>
    <AudioPlayer class="audio-player" :playlist="playlist"/>
  </article>
</template>

<script>
import { TimelineLite } from "gsap/dist/gsap";
import AudioPlayer from "../components/AudioPlayer.vue";
import podcasts from '../assets/json/podcast.json';
export default {
  name: "Theology",
  components: {
    AudioPlayer,
  },
  data() {
    return {
      playlist: null,
      playlist_length: 0,
    }
  },
  created() {
    this.playlist = podcasts['podcasts']
    this.playlist_length = this.playlist.length;
    console.log(podcasts['podcasts'])
  },
  methods: {
    reactiveHighlight() {
      const tl = new TimelineLite();
      const { reactive } = this.$refs;
      tl.to(reactive, {
        backgroundColor: "#1a1a1a",
        color: "white",
      });
    },
    reactiveHighlightRemove() {
      const tl = new TimelineLite();
      const { reactive } = this.$refs;
      tl.to(reactive, {
        backgroundColor: "#141414",
        color: "#8d8d8d",
      });
    },
    gHighlight() {
      const tl = new TimelineLite();
      const { gdesign } = this.$refs;
      tl.to(gdesign, {
        backgroundColor: "#1a1a1a",
        color: "white",
      });
    },
    gHighlightRemove() {
      const tl = new TimelineLite();
      const { gdesign } = this.$refs;
      tl.to(gdesign, {
        backgroundColor: "#141414",
        color: "#8d8d8d",
      });
    },
  },
};
</script>

<style scoped>
h1 {
  font-size: 72px;
  color: #FFFFFF;
  padding-bottom: 30px;
  text-align: center;
}
p {
  font-size: clamp(12px, 1vw, 16px);
  line-height: 2;
  color: #FFFFFF;
  margin-bottom: 20px;
}
span {
  background-color: #141414;
  margin: 0.3em;
  padding: 0.3em 0.5em;
  color: #8d8d8d;
}

blockquote {
  font-size: clamp(10px, 1vw, 13px);
  margin: 40px 0;
  width: 100%;
  line-height: 2;
  color: #9d9d9d;
  padding-left: 30px;
  border-left: 4px solid #9d9d9d;
  transition: 1s ease all;
}
blockquote span {
  display: block;
  text-align: right;
  font-size: 12px;
  text-transform: uppercase;
  background-color: rgba(0, 0, 0, 0);
}

blockquote:hover {
  border-left: 4px solid #9d6464;
}

@media (min-width: 700px) {
  blockquote {
    max-width: 80%;
    margin-left: 40px;
  }
}

@media (max-width: 600px) {
  .audio-player{
    width: 70%;
    align-content: center;
    justify-content: center;
  }
}
</style>