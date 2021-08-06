<template>
    <div class="blog-wrapper no-user">
        <div class="blog-content">
            <div>
                <h2 v-if="post.aboutMeScreen">{{post.title}}</h2>
                <h2 v-else>{{post.title}}</h2>
                <p v-if="post.aboutMeScreen">{{post.info}}</p>
                <p class="content-preview" v-else>{{post.info}}</p>
                
                 <!-- <button @click="displayNextImage">SOME</button> -->
                 <router-link class="link link-light" v-if="post.aboutMeScreen" to="#">
                     Learn More<Arrow class="arrow arrow-light" />
                 </router-link>
                 <router-link class="link" v-else to="#">
                     View The Post<Arrow class="arrow" />
                 </router-link>
            </div>
        </div> 
        <div class="blog-photo">
            <Carousel  
                v-if="post.aboutMeScreen" 
                :per-page="1"
                :speed="2000" :autoplayTimeout="8000"
                :autoplay="true" :mouse-drag="false" :loop="true"> 
                <Slide class="carousel-slide" 
                       data-index="0">
                    <img class="carousel-photo" :src="require(`../assets/blogPhotos/me1.jpg`)">
                </Slide>
                <Slide class="carousel-slide" 
                       data-index="1">
                    <img class="carousel-photo" :src="require(`../assets/blogPhotos/me2.jpg`)">
                </Slide>
            </Carousel>
            <img class="photo"  v-else :src="require(`../assets/blogPhotos/${post.coverPhoto}.jpg`)" alt="">
        </div>       
    </div>
</template>

<script>
import Arrow from "../assets/icons/arrow-right-light.svg";
import { Carousel, Slide } from 'vue-carousel';
// import ImageCarousel from "../components/ImageCarousel.vue";
export default {
    name: "blogPost",
    props: ["post"],
    components: {
        Arrow,
        Carousel,
        Slide
    },
    data() {
        return {
            images:null,
            timer:null,
            currentIndex: 0
        }
    },methods: {

    },created() {
        this.images = (this.post.aboutMeScreen) ? this.post.photos : 0;
        //setInterval(() => { this.displayNextImage() }, 10000);
    },
    mounted() {
        
    }, 
    computed: {
        currentImage() {
            return this.images[Math.abs(this.currentIndex) % this.images.length];
        }
    }
}
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

      img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
      }

      .carousel-slide {
          height: 50%;
        .carousel-photo {
            //   height: 100%;
            object-fit: fill;
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

.no-user:first-child {
    .blog-content {
        background-color: #303030;
        color: #FFF;
    }
}
</style>