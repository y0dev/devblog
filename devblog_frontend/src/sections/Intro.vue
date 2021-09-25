<template>
  <article>
    <h2>Hi I'm Devontae *that should be easy to pronounce*</h2>
    <img :src="require('../assets/blogPhotos/img_01.jpg')" alt="">
  </article>
</template>

<script>
export default {
  name: "Intro",
  components: {
  },
  methods: {
    
  },
};
</script>

<style scoped>
article {
  position: relative;
  display: flex;
  flex-direction: row;
}
h2{
  z-index: 1;
  font-weight: 900;
}
img {
  display: none;
  width: 30vw;
  top: 15vh;
  left: 20px;
  opacity: 0.6;
  -moz-box-shadow: 1px 2px 3px rgba(0,0,0,.5);
  -webkit-box-shadow: 1px 2px 3px rgba(0,0,0,.5);
  box-shadow: 1px 2px 3px rgba(0,0,0,.5);
}
@media screen and (min-width: 700px) {
  article{
    flex-direction: column;
  }
  img {
    display: block;
  }
  h2 {
    font-size: calc((3.5 - 1) * 1.2vw + 1rem); 
  }
}
</style>