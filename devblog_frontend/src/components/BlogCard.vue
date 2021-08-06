<template>
    <div class="blog-card">
        <div class="category-icons">
            <div v-show="post.video === true" class="icon">
                <Play class="video" />
            </div>
        </div>
        <div v-show="editPost" class="icons">
            <div class="icon">
                <Edit class="edit" />
            </div>
            <div class="icon">
                <Delete class="delete" />
            </div>
        </div>
        <img v-if="post.video !== true" :src="require(`../assets/blogPhotos/${post.coverPhoto}.jpg`)" alt="">
        <img v-else :src="`https://img.youtube.com/vi/${post.coverPhoto}/maxresdefault.jpg`" alt="">
        <div class="info">
            <h4>{{ post.title }}</h4>
            <h6>Posted on: {{ post.date }}</h6>
            <router-link v-if="post.video !== true" class="link" to="#">
                View The Post <Arrow class="arrow" />
            </router-link>
            <router-link v-else class="link" to="#">
                View The Video <Arrow class="arrow" />
            </router-link>
        </div>
    </div>
</template>

<script>
import Arrow from "../assets/icons/arrow-right-light.svg";
import Delete from "../assets/icons/trash-regular.svg";
import Edit from "../assets/icons/edit-regular.svg";
import Play from "../assets/icons/play-regular.svg";
export default {
    name: "blogCard",
    props: ["post"],
    components: {
        Arrow,
        Delete,
        Edit,
        Play
    },
    computed: {
        editPost() {
            return this.$store.state.editPost;
        }
    }
}
</script>

<style lang="scss" scoped>
.blog-card {
    position: relative;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    border-radius: 8px;
    background-color: #FFFFFF;
    min-height: 420px;
    transition: .5 ease all;

    &:hover {
        transform: rotateZ(-2deg) scale(1.04);
        box-shadow: 0 4px 6px -1px rgba($color: #000000, $alpha: 0.1), 0 2px 4px -1px rgba($color: #000000, $alpha: 0.6);
    }

    .category-icons {
        display: flex;
        position: absolute;
        top: 10px;
        left: 10px;
        z-index: 99;

        .icon {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 35px;
            height: 35px;
            border-radius: 50%;
            background-color: #FFFFFF;
            transition: 0.5s ease all;

            &:nth-child(1) {
                margin-right: 8px;
            }
            .video {
                pointer-events: none;
                height: 15px;
                width: auto;
            }
        }
    }
    .icons {
        display: flex;
        position: absolute;
        top: 10px;
        right: 10px;
        z-index: 99;

        .icon {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 35px;
            height: 35px;
            border-radius: 50%;
            background-color: #FFFFFF;
            transition: 0.5s ease all;

            &:hover {
                background-color: #303030;

                .edit,.delete {
                    path {
                        fill: #FFFFFF;
                    }
                }
            }
            &:nth-child(1) {
                margin-right: 8px;
            }
            .edit,.delete {
                pointer-events: none;
                height: 15px;
                width: auto;
            }
        }
    }

    img {
        display: block;
        border-radius: 8px 8px 0 0;
        z-index: 1;
        width: 100%;
        min-height: 200px;
        object-fit: cover;
    }
    .info {
        display: flex;
        flex-direction: column;
        height: 100%;
        z-index: 3;
        padding:  32px 16px;
        color: #000000;

        h4 {
            padding-bottom: 8px;
            font-size: 20px;
            font-weight: 300;
        }

        h6 {
            font-weight: 400;
            font-size: 12px;
            padding-bottom: 16px;
        }

        .link {
            display: inline-flex;
            align-items: center;
            margin-top: auto;
            font-weight: 500;
            padding-top: 20px;
            font-size: 12px;
            padding-bottom: 4px;
            transition: .5s ease-in all;

            &:hover {
                color: rgba(48,48,48,0.8);
            }
            .arrow {
                width: 10px;
            }
        }
    }
}
</style>