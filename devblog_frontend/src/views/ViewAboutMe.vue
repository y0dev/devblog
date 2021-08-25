<template>
  <div class="post-view" v-if="aboutMePost">
    <div class="container quillWrapper">
      <h2>About Me</h2>
      <div class="slideshow">
        <div class="slideshow-container">
          <div class="mySlides fade">
            <div class="numbertext">1 / 2</div>
            <img :src="require(`../assets/blogPhotos/4oJ.jpg`)" />
            <div class="text">First Family Holiday</div>
          </div>

          <div class="mySlides fade">
            <div class="numbertext">2 / 2</div>
            <img :src="require(`../assets/blogPhotos/wed.jpg`)" />
            <div class="text">Pandemic Wedding</div>
          </div>

          <a class="prev" @click="plusSlides(-1)">&#10094;</a>
          <a class="next" @click="plusSlides(1)">&#10095;</a>
        </div>
        <div class="dots">
          <span class="dot" @click="currentSlide(1)" ></span> 
          <span class="dot" @click="currentSlide(2)"></span> 
        </div>
        <br>
      </div>
      <div class="post-content ql-editor">{{ aboutMePost.info }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ViewAboutMe",
  data() {
    return {
      currentIndex: 1
    };
  },
  mounted() {
    this.showSlides(this.currentIndex);
    
    let esvScript = document.createElement('script')
    esvScript.setAttribute('src', 'https://static.esvmedia.org/crossref/crossref.min.js')
    document.body.appendChild(esvScript)
  },
  created() {
  },
  methods: {
    plusSlides(n) {
      this.showSlides(this.currentIndex += n);
    },

    currentSlide(n) {
      this.showSlides(this.currentIndex = n);
    },

    showSlides(n) {
      var i;
      var slides = document.getElementsByClassName("mySlides");
      var dots = document.getElementsByClassName("dot");
      if (n > slides.length) {this.currentIndex = 1}    
      if (n < 1) {this.currentIndex = slides.length}
      for (i = 0; i < slides.length; i++) {
          slides[i].style.display = "none";  
      }
      for (i = 0; i < dots.length; i++) {
          dots[i].className = dots[i].className.replace(" active", "");
      }
      slides[this.currentIndex-1].style.display = "block";  
      dots[this.currentIndex-1].className += " active";
    }
  },
  computed : {
    aboutMePost() {
      return this.$store.getters.aboutMePost;
    },
  },
};
</script>

<style lang="scss" scoped>

.post-view {
  h4 {
    font-weight: 400;
    font-size: 14px;
    margin-bottom: 24px;
  }
  .slideshow {
    position: relative;
    .slideshow-container {
      max-width: 600px;
      position: relative;
      // margin: auto;
      .mySlides {
        display: none;
      }
      img {
        vertical-align: middle;
        margin-bottom: 0;
      }

      @media(min-width: 700px) {
        min-height: 100%;
      }
      /* Next & previous buttons */
      .prev, .next {
        cursor: pointer;
        position: absolute;
        top: 50%;
        width: auto;
        padding: 16px;
        margin-top: -22px;
        color: white;
        font-weight: bold;
        font-size: 18px;
        transition: 0.6s ease;
        border-radius: 0 3px 3px 0;
        user-select: none;
      }

      /* Position the "next button" to the right */
      .next {
        right: 0;
        border-radius: 3px 0 0 3px;
      }

      /* On hover, add a black background color with a little bit see-through */
      .prev:hover, .next:hover {
        background-color: rgba(0,0,0,0.8);
      }

      /* Caption text */
      .text {
        color: #f2f2f2;
        font-size: 15px;
        padding: 8px 12px;
        position: absolute;
        bottom: 8px;
        width: 100%;
        text-align: center;
        background-color: rgba(0,0,0,0.5);
      }
      
      /* Number text (1/2 etc) */
      .numbertext {
        color: #f2f2f2;
        font-size: 12px;
        padding: 8px 12px;
        position: absolute;
        top: 0;
      }

      /* The dots/bullets/indicators */
      .dot {
        cursor: pointer;
        height: 15px;
        width: 15px;
        margin: 0 2px;
        background-color: #bbb;
        border-radius: 50%;
        display: inline-block;
        transition: background-color 0.6s ease;
      }

      .active, .dot:hover {
        background-color: #717171;
      }

      /* Fading animation */
      .fade {
        -webkit-animation-name: fade;
        -webkit-animation-duration: 1.5s;
        animation-name: fade;
        animation-duration: 1.5s;
      }

      @-webkit-keyframes fade {
        from {opacity: .4} 
        to {opacity: 1}
      }

      @keyframes fade {
        from {opacity: .4} 
        to {opacity: 1}
      }

      /* On smaller screens, decrease text size */
      @media only screen and (max-width: 300px) {
        .prev, .next,.text {font-size: 11px}
      }
    }
  }

  a.esv-crossref-link {
    color: #72abbf !important;
  }
}
</style>