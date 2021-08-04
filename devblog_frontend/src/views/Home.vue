<template>
  <div class="home">
    <p>This is a paragraph</p>
    <DevLogo/>
  </div>
</template>

<script>
import DevLogo from "../assets/logo.png";
export default {
  name: "Home",
  components: {
    DevLogo
  },
};
</script>