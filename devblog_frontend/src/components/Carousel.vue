<template>
   <div>
      <div class="slideshow-container">
         <div v-for="(item, index) in photos" :key="item.slide_id" class="mySlides fade">
               <div class="numbertext">{{ index + 1}} / {{ length }}</div>
               <img :src="item.photo" :alt="item.title" style="width:100%; max-height:600px">
               <div class="text">{{ item.title }}</div>
         </div>
         <!-- Next and previous buttons -->
         <a class="prev" @click="plusSlides(-1)">&#10094;</a>
         <a class="next" @click="plusSlides(1)">&#10095;</a>
      </div>
      <!-- The dots/circles -->
      <div class="dots" style="text-align:center">
         <span class="dot" v-for="(item, index) in photos" :key="index" @click="currentSlide(index + 1)" ></span> 
      </div>
   </div>
</template>

<script>
export default {
  props: {
    photos: {
     type: Array,
     required: true,
    },
    length: {
      type: Number,
      required: true,
    }
  },
  data() {
   return {
     currentIndex: 1,
   };
  },
  created() {
    console.log(length);
  },
  mounted() {
   this.showSlides(this.currentIndex);
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
  }
}
</script>

<style lang="scss" scoped>
.slideshow-container {
  max-width: 1000px;
  max-height: 700px;
  position: relative;
  margin: auto;
  @media only screen and (max-width: 700px) {
    margin-bottom: 30px;
  }

  /* Don't show all the images only show current index  this is done at mounted */
  .mySlides{display: none;}

//   img{border-radius: 10% 30% 50% 70%;}
  /* Next & previous buttons */
  .prev, .next {
     cursor: pointer;
     position: absolute;
     top: 50%;
     width: auto;
     margin-top: -22px;
     padding: 16px;
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
    margin-bottom: 20px;
    margin-left: 20px;
  }

  /* Number text (1/3 etc) */
  .numbertext {
    color: #f2f2f2;
    font-size: 12px;
    padding: 8px 12px;
    margin-left: 40px;
    margin-top: 10px;
    position: absolute;
    top: 0;
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
}
/* The dots/bullets/indicators */
.dots .dot {
    cursor: pointer;
    height: 15px;
    width: 15px;
    margin: 0 6px;
    background-color: #bbb;
    border-radius: 50%;
    display: inline-block;
    transition: background-color 0.6s ease;
}
</style>