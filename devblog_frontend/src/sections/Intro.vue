<template>
  <article>
    <h2>Hi I'm Devontae *that should be easy to pronounce*</h2>
    <Carousel class="carousel" :photos="about_me" :length="about_me_length" />
  </article>
</template>

<script>
import Carousel from '../components/Carousel.vue';
import photos from '../assets/json/photos.json';
export default {
  name: "Intro",
  components: {
    Carousel,
  },
  data() {
    return {
      about_me: null,
      about_me_length: 0,
    }
  },
  methods: {
    
  },
  created() {
    this.about_me = photos['about-me']
    this.about_me_length = this.about_me.length;
    console.log(photos['about-me'])
  },
};
</script>

<style scoped>
article {
  position: relative;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  align-items: center;
  height: 100%;
}
h2{
  z-index: 1;
  font-weight: 900;
  color: #FFFFFF;
  text-align: center;
  margin: 0 50px;
  font-size: calc((3.5 - 1) * 1.2vw + 1rem); 
}

@media screen and (max-width: 700px) {
  article{
    grid-template-columns: repeat(1, 1fr);
    grid-template-rows: repeat(2, 1fr);
    justify-content: center;
    align-items: center;
  }
  img {
    margin-left: auto;
    margin-right: auto;
  }
}
</style>