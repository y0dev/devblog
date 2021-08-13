<template>
    <div class="blog-card-wrap">
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
h2 {
    position: relative;
    margin-left: 20px;
    text-transform: uppercase;
}
.blog-cards {
    margin-top: 32px;
}

</style>