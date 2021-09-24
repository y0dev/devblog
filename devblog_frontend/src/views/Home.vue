<template>
  <div id="home">
    <section class="intro">

    </section>
    <section class="about-me">
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
export default {
  name: "Home",
  components: {
    AboutMe,
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
    background-image: url("../assets/pattern/topography.svg");
    height: 100vh;
    width: 100vw;
    background-color: #000FF0;
    article{
    //   background-color: #000000;
      margin: auto;
      padding: 20vh 20vw;
    }
  }
}
</style>