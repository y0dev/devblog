<template>
  <div id="home">
    <section class="intro">

    </section>
    <section class="about-me">
      <Topography class="background"/>
      <AboutMe />
    </section>
    <section class="work">

    </section>
    <section class="theology">

    </section>
    <section class="socials">

    </section>
  </div>
</template>

<script>
import AboutMe from '../sections/Description.vue';
import Topography from "../assets/pattern/topography.svg";
export default {
  name: "Home",
  components: {
    AboutMe,
    Topography
  },
  computed: {
  },
  mounted() {
    
  },
};
</script>

<style lang="scss" scoped>
#home {
  background-color: blue;
  width: 100%;
  .intro{
    background-color: brown;
    height: 100vh;
  }

  .about-me{
    position: relative;
    height: 150vh;
    width: 100vw;
    background-color: #FFF332;
    z-index: 10;
    .background{
      position: absolute;
      object-fit: fill;
      z-index: -1;
      width:100%;
      height:100%;
    }
    article{
    //   background-color: #000000;
      margin: auto;
      padding: 20vh 20vw;
    }
  }
}
</style>