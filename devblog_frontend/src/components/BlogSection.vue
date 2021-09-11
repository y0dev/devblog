<template>
    <div class="blog-card-container">
        <h2>{{ title }}</h2>
        <div class="blog-cards container">
            <BlogCard :post="post" v-for="(post,index) in blogPosts" :key="index" />
        </div>
    </div>
</template>

<script>
import BlogCard from "./BlogCard.vue";
export default {
    name:"Blogs",
    props:["title","blogPosts"],
    components: {
        BlogCard,
    },
}
</script>

<style lang="scss" scoped>
.blog-card-container{
  margin: 0 50px;
  padding-bottom: 50px;
}
h2 {
    position: relative;
    text-transform: uppercase;
}
.blog-cards {
    margin-top: 32px;
}

</style>