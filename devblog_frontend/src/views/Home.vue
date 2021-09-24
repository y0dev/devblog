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
  height: 80vh;
  width: 100%;
  .intro{
    background-color: brown;
  }
}
</style>