<template>
  <div id="home">
    <section class="intro">
      <Intro />
    </section>
    <section class="about-me">
      <AboutMe />
    </section>
    <section class="work">
      <Work />
    </section>
    <section class="theology">
      <div class="theology-container"> 
      </div>
      <Theology id="theo"/>
    </section>
    <section class="socials">

    </section>
  </div>
</template>

<script>
import Intro from '../sections/Intro.vue';
import AboutMe from '../sections/Description.vue';
import Theology from '../sections/Theology.vue';
import Work from '../sections/Work.vue';
export default {
  name: "Home",
  components: {
    AboutMe,
    Intro,
    Theology,
    Work
  },
  computed: {
  },
  mounted() {
    
  },
};
</script>

<style lang="scss" scoped>
#home {
  background-color: #1c1c1c;
  width: 100%;
  section{
    display: inline-block;
    height: 100%;
  }
  .intro{
    background-image: url("../assets/pattern/triangles.png");
    background-size: cover;
    position: relative;
  }

  .about-me{
    background-image: url("../assets/pattern/topography.png");
    position: relative;
    width: 100vw;
    article{
      margin: auto;
      padding: 20vh 20vw;
    }
  }

  .work{
    background-image: url("../assets/pattern/graph-paper.png");
    position: relative;
    @media only screen and (min-width: 600px) {
      width: 100vw;
      overflow:initial;
    }
    article{
      margin: auto;
      padding: 20vh 20vw;
    }
  }

  .theology{
    background-image: url("../assets/pattern/topography.png");
    position: relative;
    @media only screen and (min-width: 600px) {
      height: 120vh;
      width: 100vw;
    }
    
    #theo{
      position: relative;
      padding: 40px;
      @media only screen and (min-width: 1399px) {
        padding-left: 100px;
        padding-top: 50px;
        width: 60vw;
      }
    }
    .theology-container{
      position: absolute;
      @media only screen and (min-width: 1400px) {
        background-image: url("../assets/cross.jpg");
        background-size: cover;
        width: 100%;
        height: 100%;
        opacity: 0.1;
      }
    }

    
  }
}
</style>