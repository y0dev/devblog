<template>
  <div class="blog-wrapper about-me">
    <div class="blog-content">
      <div>
        <h2>{{ post.blogTitle }}</h2>
        <p class="content-preview" v-html="blogInfo"></p>
        <router-link class="link" :to="{ name: 'ViewBlog', params: { blogid: this.post.blogID } }">
          View The Post<Arrow class="arrow" />
        </router-link>
      </div>
    </div>
    <div class="blog-photo">
      <img class="photo" :src="post.blogCoverPhoto" alt="" />
    </div>
  </div>
</template>

<script>
import Arrow from "../assets/icons/arrow-right-light.svg";
import { formatHtmlForBlogPost } from '../helpers';
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
      blogInfo: null,
    }
  },created() {
    this.images = (this.post.title) ? this.post.photos : 0;
  },
  mounted() {
    this.blogInfo = formatHtmlForBlogPost(this.post.blogInfo)
  }, 
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
};
</script>

<style lang="scss" scoped>
.blog-wrapper {
  
  //border: 1px solid yellow;
  display: flex;
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
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .content-preview p {
        background-color: #000000;
        width: 250px;
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
    
    //border: 1px solid red;
    @media (min-width: 700px) {
      order: 2;
    }
    @media (min-width: 800px) {
      flex: 4;
    }
    
    .photo {
      display: block;
      object-fit: cover;
      width: 100%;
      height: 100%;
    } 
    
  }

  &:nth-child(even) {
    .blog-content {
      order: 2;
    }
    .blog-photo {
      order: 1;
    }
  }
}

.about-me:first-child {
  .blog-content {
    background-color: #303030;
    color: #FFF;
  }
}
</style>