<template>
    <div class="blog-card-wrap">
        <h2>Title</h2>
        <div class="blog-cards container">
            <div class="toggle-edit">
                <span>Toggle Editing Post</span>
                <input type="checkbox" v-model="editPost">
            </div>
            <BlogCard :post="post" v-for="(post,index) in sampleBlogCards" :key="index" />
        </div>
        <h2>Title</h2>
        <div class="blog-cards container section">
            <BlogCard :post="post" v-for="(post,index) in sampleBlogCards" :key="index" />
        </div>
        <h2>Title</h2>
        <div class="blog-cards container section">
            <BlogCard :post="post" v-for="(post,index) in sampleBlogCards" :key="index" />
        </div>
    </div>
</template>

<script>
import BlogCard from "../components/BlogCard.vue";
export default {
    name:"Blogs",
    components: {
        BlogCard,
    },
    created() {
        console.log(this.$store.state.user)
        fetch(`http://localhost:${process.env.VUE_APP_SERVER_PORT}/api/blogs`, {
            method: "POST",
            body: JSON.stringify({
                email: this.$store.state.email,
            })
            })
            .then(response => response.json() )
            .then((data) => {
                console.log(data);
            })
    },
    computed: {
        sampleBlogCards() {
            return this.$store.state.sampleBlogCards;
        },
        editPost: {
            get() {
                return this.$store.state.editPost
            },
            set(payload) {
                this.$store.commit("toggleEditPost",payload)
            }
        }
    },beforeDestroy() {
        this.$store.commit("toggleEditPost",false);
    },
}
</script>

<style lang="scss" scoped>

.blog-cards {
    position: relative;

    .toggle-edit{
        display: flex;
        align-items: center;
        position: absolute;
        top: -70px;
        right: 0;

        span {
            margin-right: 16px;
        }

        input[type="checkbox"] {
            position: relative;
            border: none;
            -webkit-appearance: none;
            background: #FFFFFF;
            outline: none;
            width: 80px;
            height: 30px;
            border-radius: 20px;
            box-shadow: 0 4px 6px -1px rgba($color: #000000, $alpha: 0.1), 0 2px 4px -1px rgba($color: #000000, $alpha: 0.06);
        }

        input[type="checkbox"]:before {
            content: "";
            position: absolute;
            width: 30px;
            height: 30px;
            border-radius: 20px;
            top: 0;
            left: 0;
            background: #30303030;
            transform: scale(1.1);
            transition: 750ms ease all;
            box-shadow: 0 4px 6px -1px rgba($color: #000000, $alpha: 0.1), 0 2px 4px -1px rgba($color: #000000, $alpha: 0.06);
        }

        input:checked[type="checkbox"]:before {
            background: #FFFFFF;
            left: 52px;
        }
    }
}

h2 {
    margin-top: 50px;
    margin-left: 20px;
}
.section {
    margin-top: 100px;
}

</style>