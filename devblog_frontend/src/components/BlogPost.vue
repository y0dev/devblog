<template>
    <div class="blog-wrapper about-me">
        <div class="blog-content">
            <div>
                <h2 v-if="post.aboutMeScreen">{{ post.title }}</h2>
                <h2 v-else>{{post.blogTitle}}</h2>
                <p v-if="post.aboutMeScreen">{{post.info}}</p>
                <p class="content-preview" v-else v-html="post.blogInfo"></p>
                 <router-link class="link link-light" v-if="post.aboutMeScreen" to="#">
                     Learn More<Arrow class="arrow arrow-light" />
                 </router-link>
                 <router-link class="link" v-else :to="{ name: 'ViewBlog', params: { blogid: this.post.blogID } }">
                     View The Post<Arrow class="arrow" />
                 </router-link>
            </div>
        </div> 
        <div class="blog-photo">
            <div v-if="post.aboutMeScreen" class="slideshow">
                <div class="slideshow-container">

                    <div class="mySlides fade">
                        <div class="numbertext">1 / 3</div>
                        <img :src="require(`../assets/blogPhotos/me1.jpg`)" style="width:100%">
                        <div class="text">Caption Text</div>
                    </div>

                    <div class="mySlides fade">
                        <div class="numbertext">2 / 3</div>
                        <img :src="require(`../assets/blogPhotos/me2.jpg`)" style="width:100%">
                        <div class="text">Caption Two</div>
                    </div>

                    <a class="prev" @click="plusSlides(-1)">&#10094;</a>
                    <a class="next" @click="plusSlides(1)">&#10095;</a>

                </div>
                <br>

                <div style="text-align:center">
                    <span class="dot" @click="currentSlide(1)" ></span> 
                    <span class="dot" @click="currentSlide(2)"></span> 
                    <span class="dot" @click="currentSlide(3)"></span> 
                </div>
            </div>
            <div v-else :src="post.blogCoverPhoto" class="post-img">
                <img class="photo" :src="post.blogCoverPhoto" alt="">
            </div>
        </div>       
    </div>
</template>

<script>
import Arrow from "../assets/icons/arrow-right-light.svg";
export default {
  name: "blogPost",
  props: ["post"],
  components: {
    Arrow,
  },
    data() {
        return {
            images:null,
            timer:null,
            currentIndex: 1
        }
    },methods: {
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
    },created() {

        console.log(this.post)
        this.images = (this.post.aboutMeScreen) ? this.post.photos : 0;
        //setInterval(() => { this.displayNextImage() }, 10000);
    },
    mounted() {
        
        this.showSlides(this.currentIndex);
    }, 
    computed: {
        currentImage() {
            return this.images[Math.abs(this.currentIndex) % this.images.length];
        },
    user() {
      return this.$store.state.user;
    },
  },
};
</script>

<style lang="scss" scoped>
.blog-wrapper {
  display:flex;
  flex-direction: column;
  box-shadow: 0 4px 6px -1px rgba($color: #000000, $alpha: 0.1), 0 2px 4px -1px rgba($color: #000000, $alpha: 0.6);
  @media (min-width: 700px) {
      min-height: 650px;
      max-height: 650px;
      flex-direction: row;
  }

  .blog-content {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      flex: 4;
      order: 2;
      @media (min-width: 700px) {
        order: 1;
      }
      @media (min-width: 800px) {
        flex: 3;
      }

      div {
          max-width: 375px;
          padding: 72px 24px;
          @media (min-width: 700px) {
              padding: 0 24px;
          }

          h2 {
              font-size: 32px;
              font-weight: 300;
              text-transform: uppercase;
              margin-bottom: 24px;
              @media (min-width: 700px) {
                  font-size: 40px;
              }
          }

          p {
              font-size: 15px;
              font-weight: 300;
              line-height: 1.7;
          }

          .content-preview {
              font-size: 13px;
              max-height: 24px;
              width: 250px;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
          }

          .link {
              display: inline-flex;
              align-items: center;
              margin-top: 32px;
              padding-bottom: 4px;
              border-bottom: 1px solid transparent;
              transition: .5s ease-in all;

              &:hover {
                  border-bottom-color: #303030;
              }
          }

          .link-light {
              &:hover {
                  border-bottom-color: #FFF;
              }
          }
      }

  }

  .blog-photo {
      
      order: 1;
      flex: 3;
      box-shadow: 0 4px 6px -1px rgba($color: #000000, $alpha: 0.1), 0 2px 4px -1px rgba($color: #000000, $alpha: 0.6);
      
      @media (min-width: 700px) {
          order: 2;
      }
      @media (min-width: 800px) {
          flex: 4;
      }

      .photo {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
      }
      
        .slideshow-container {
            position: relative;
            margin: auto;
            .mySlides {
                position: relative;
                display: none;
                width: 100%;
                height: 100%;
            }
            img {vertical-align: middle;}
            @media(min-width: 700px) {
                min-width: 600px;
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
            }
            
            /* Number text (1/3 etc) */
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
}

.blog-wrapper:nth-child(even) {
    .blog-content {
        order: 2;
    }
    .blog-photo {
        order: 1;
    }
}

.about-me:first-child {
    .blog-content {
        background-color: #303030;
        color: #FFF;
    }
}
</style>