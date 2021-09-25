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
img {
  /* display: none; */
  width: 80%;
  height: 100%;
  top: 15vh;
  left: 20px;
  opacity: 0.6;
  -moz-box-shadow: 1px 2px 3px rgba(0,0,0,.5);
  -webkit-box-shadow: 1px 2px 3px rgba(0,0,0,.5);
  box-shadow: 1px 2px 3px rgba(0,0,0,.5);
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