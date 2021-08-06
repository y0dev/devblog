<template>
    <div class="create-post">
        <BlogCoverPreview v-show="this.$store.state.blogPhotoPreview" />
        <div class="container">
            <div :class="{invisible:!error }" class="err-message">
                <p><span>Error:</span>{{ this.errorMsg }}</p>
            </div>
            <div class="blog-info">
                <input type="text" placeholder="Enter Title" v-model="blogTitle">
                <div class="upload-file">
                    <label class="photo-label" for="blog-photo">Upload Cover Photo</label>
                    <input type="file" name="blogPhoto" id="blog-photo" ref="blogPhoto" @change="fileChanged" accept=".png, .jpg, .jpeg"/>
                    <button class="preview" :class="{'button-inactive': !this.$store.state.blogPhotoFileURL}" @click="openPreview">Preview Photo</button>
                    <span>File Chosen: {{ this.$store.state.blogPhotoName }}</span>
                </div><div class="toggle-switch">
                    <span>Add Youtube Video</span>
                    <input type="checkbox" v-model="uploadYoutube">
                </div>
            </div>
            <div v-show="uploadYoutube" class="url-container">
                <label class="url-label" for="url">Enter an https:// URL:</label>
                <input type="url" name="url" id="url"
                    placeholder="https://example.com"
                    pattern="https://.*" size="30"
                    v-model="blogYoutubeURL"
                    required>
            </div>
            <div class="editor">
                <vue-editor :editorOptions="editorSettings" v-model="blogInfo" useCustomImageHandler @image-added="imageHandler" />
            </div>
            <div class="blog-actions">
                <button @click="uploadBlog">Publish Blog</button>
                <router-link class="router-button" :to="{name: 'BlogPreview'}" >Post Preview</router-link>
            </div>
        </div>
    </div>
</template>

<script>
import BlogCoverPreview from "../components/BlogCoverPreview.vue";
import Quill from "quill";
window.Quill = Quill;
const ImageResize = require("quill-image-resize-module").default;
Quill.register("modules/ImageResize", ImageResize);
export default {
    name:"CreatePost",
    components: {
        BlogCoverPreview,
    },
    data() {
        return {
            error: null,
            errorMsg: null,
            file: null,
            uploadYoutube:null,
            blogYoutubeURL: null,
            editorSettings: {
                modules: {
                    ImageResize: {}
                },
            },
        };
    },
    methods: {
        fileChanged() {
            this.file = this.$refs.blogPhoto.files[0];
            const fileName = this.file.name;
            this.$store.commit("fileNameChange",fileName);
            this.$store.commit("createFileURL",URL.createObjectURL(this.file));
        },
        openPreview() {
            this.$store.commit("openPhotoPreview");
        },
        imageHandler(file,Editor,cursorLocation,resetUploader) {
            console.log(file,Editor,cursorLocation,resetUploader);
            //Editor.insertEmbed(cursorLocation,"image",downloadURL);
            resetUploader();
        },
        uploadBlog() {
            if(this.blogTitle.length != 0 && this.blogInfo.length !== 0) {
                if(this.file) {
                    return;
                } else if (this.blogInfo.includes("<iframe class=\"ql-video\"")) {
                  const startingIdx = this.blogInfo.indexOf("youtube.com/embed") + "youtube.com/embed".length + 1
                  const endingIdx = this.blogInfo.indexOf("?showinfo")
                  //const info = this.blogInfo.split("")
                  // console.log(startingIdx,endingIdx)
                  // console.log(this.blogInfo.substring(startingIdx, endingIdx))

                  
                  const fileName = `https://img.youtube.com/vi/${this.blogInfo.substring(startingIdx, endingIdx)}/maxresdefault.jpg`;
                  this.$store.commit("fileNameChange",fileName);
                  this.$store.commit("createFileURL",fileName);
                  return;
                } 
                else if (this.uploadYoutube) {
                    if (this.blogYoutubeURL) {
                        return;
                    }
                    this.error = true;
                    this.errorMsg = "Please ensure that you uploaded a youtube link";
                    setTimeout(() => {
                        this.error = false;
                    },5000);
                    return;
                }
                
                this.error = true;
                this.errorMsg = "Please ensure that you uploaded a cover photo";
                setTimeout(() => {
                    this.error = false;
                },5000);
                return;
            }
            this.error = true;
            this.errorMsg = "Please ensure that Title and Post have been filled!";
            setTimeout(() => {
                this.error = false;
            },5000);
        }
    },
    computed: {
        blogCoverPhotoName() {
            return this.$store.state.blogPhotoName;
        },

        blogTitle: {
            get() {
                return this.$store.state.blogTitle;
            },
            set(payload) {
                this.$store.commit("updateBlogTitle",payload);
            }
        },
        blogInfo: {
            get() {
                return this.$store.state.blogInfo;
            },
            set(payload) {
                this.$store.commit("newBlogPost",payload);
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.create-post {
  position: relative;
  height: 100%;
  button {
    margin-top: 0;
  }
  .router-button {
    text-decoration: none;
    color: #fff;
  }
  
  button,
  .photo-label,
  .router-button {
    transition: 0.5s ease-in-out all;
    align-self: center;
    font-size: 14px;
    cursor: pointer;
    border-radius: 20px;
    padding: 12px 24px;
    color: #fff;
    background-color: #303030;
    text-decoration: none;
    &:hover {
      background-color: rgba(48, 48, 48, 0.7);
    }
  }
  .container {
    position: relative;
    height: 100%;
    padding: 10px 25px 60px;
  }
  // error styling
  .invisible {
    opacity: 0 !important;
  }
  .err-message {
    width: 100%;
    padding: 12px;
    border-radius: 8px;
    color: #fff;
    margin-bottom: 10px;
    background-color: #303030;
    opacity: 1;
    transition: 0.5s ease all;
    p {
      font-size: 14px;
    }
    span {
      font-weight: 600;
    }
  }
  .blog-info {
    display: flex;
    margin-bottom: 32px;
    input:nth-child(1) {
      min-width: 300px;
    }
    .upload-file {
      flex: 1;
      margin-left: 16px;
      position: relative;
      display: flex;
      input {
        display: none;
      }
      .preview {
        margin-left: 16px;
        text-transform: initial;
      }
      span {
        font-size: 12px;
        margin-left: 16px;
        align-self: center;
      }
    }

    .toggle-switch{
        display: flex;
        align-items: center;
        position: inherit;
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
    .url-container {
        margin-bottom: 30px;
    }
  }
  
    input {
        transition: 0.5s ease-in-out all;
        padding: 10px 4px;
        border: none;
        border-bottom: 1px solid #303030;
        &:focus {
        outline: none;
        box-shadow: 0 1px 0 0 #303030;
        }
    }
    .url {
        margin-bottom: 20px;
    }
  .editor {
    height: 60vh;
    display: flex;
    flex-direction: column;
    .quillWrapper {
      position: relative;
      display: flex;
      flex-direction: column;
      height: 100%;
    }
    .ql-container {
      display: flex;
      flex-direction: column;
      height: 100%;
      overflow: scroll;
    }
    .ql-editor {
      padding: 20px 16px 30px;
    }
  }
  .blog-actions {
    margin-top: 32px;
    button {
      margin-right: 16px;
    }
  }
}
</style>