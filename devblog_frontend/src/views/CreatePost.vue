<template>
  <div class="create-post">
    <BlogCoverPreview v-show="this.$store.state.blogPhotoPreview" />
    <Loading v-show="loading" />
    <div class="container">
        <div :class="{invisible:!error }" class="err-message">
            <p><span>Error: </span>{{ this.errorMsg }}</p>
        </div>
        <div class="blog-info">
          <input type="text" placeholder="Enter Title" v-model="blogTitle">
          <div class="category">
            <select v-model="category">
              <option disabled value="">Please select one</option>
              <option>Faith</option>
              <option>Sports</option>
              <option>Technology</option>
            </select>
          </div>
          <div class="upload-file">
              <label class="photo-label" for="blog-photo">Upload Cover Photo</label>
              <input type="file" name="blogPhoto" id="blog-photo" ref="blogPhoto" @change="fileChanged" accept=".png, .jpg, .jpeg"/>
              <button class="preview" :class="{'button-inactive': !this.$store.state.blogPhotoFileURL}" @click="openPreview">Preview Photo</button>
              <span>File Chosen: {{ this.$store.state.blogPhotoName }}</span>
          </div>
        </div>
        <div class="editor">
            <vue-editor :editorOptions="editorSettings" v-model="blogInfo" useCustomImageHandler @image-added="imageHandler" @text-change="textHandler" />
        </div>
        <div class="blog-actions">
            <button @click="uploadBlog">Publish Blog</button>
            <button @click="previewPost">Post Preview</button>
        </div>
    </div>
  </div>
</template>

<script>
import BlogCoverPreview from "../components/BlogCoverPreview";
import Loading from "../components/Loading";
import Quill from "quill";
window.Quill = Quill;
const ImageResize = require("quill-image-resize-module").default;
Quill.register("modules/ImageResize", ImageResize);

import { storage, postsCollection } from '../firebase'
import { getImages, getVideoId_YT, wrapVideo } from '../helpers';
export default {
    name:"CreatePost",
    components: {
        BlogCoverPreview,
        Loading,
    },
  data() {
    return {
      file: null,
      error: null,
      errorMsg: null,
      loading: null,
      category: null,
      youtubeId:null,
      editorSettings: {
        modules: {
            ImageResize: {},
            toolbar: [
                ["bold", "italic", "underline"],
                [{ list: "ordered" }, { list: "bullet" }],
                ["image","video", "code-block"],
                ['clean']   
            ],
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
        previewPost() {
          
          this.blogInfo = wrapVideo(this.blogInfo);
          this.$router.push({ name: "BlogPreview" });
        },
        openPreview() {
          this.$store.commit("openPhotoPreview");
        },
        imageHandler(file,Editor,cursorLocation,resetUploader) {
            const storageRef = storage.ref();
            const docRef = storageRef.child(`documents/blogPostPhotos/${file.name}`);
            docRef.put(file).on(
              "state_changed",
              (snapshot) => {
                console.log(snapshot);
              },
              (err) => {
                console.log(err);
              },
              async () => {
                const downloadURL = await docRef.getDownloadURL();
                Editor.insertEmbed(cursorLocation, "image", downloadURL);
                resetUploader();
              }
            );
        },
        textHandler(delta, oldDelta, source) {
          if(source) {
            const text = this.blogInfo;
            
            if(text.includes("youtube.com/embed")) {


              this.youtubeId = getVideoId_YT(text)
              
              // console.log(`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`)
              // console.log(`https://www.googleapis.com/youtube/v3/videos?key=${process.env.VUE_APP_GOOGLE_API_KEY}&part=snippet&id=${videoId}`)
              //https://www.youtube.com/watch?v=KpEXNP48rgA
              fetch(`https://www.googleapis.com/youtube/v3/videos?key=${process.env.VUE_APP_GOOGLE_API_KEY}&part=snippet&id=${this.youtubeId}`, {
                method: "GET",
                headers: {"Content-type": "application/json; charset=UTF-8"}
              })
              .then(response => response.json() )
              .then(data => { 
                
                const item0 = data.items[0];
                const snippet = item0.snippet;
                let images = getImages(snippet.thumbnails);
                this.file = images[images.length - 1]
                let payload = {
                  url: this.file,
                  youtubeId: this.youtubeId
                }
                this.$store.dispatch('getImageNameYoutube',payload);
                console.log(data);
              }).catch((err) => {
                console.log(err)
                
                this.file = `https://i.ytimg.com/vi/${this.youtubeId}/hqdefault.jpg`
                let payload = {
                  url: this.file,
                  youtubeId: this.youtubeId
                }
                this.$store.dispatch('getImageNameYoutube',payload);
              });
            }
          }
        },
        uploadBlog(){
          if(this.blogTitle.length != 0 && this.blogInfo.length !== 0 && this.category) {
            if (this.file) {
              let text = wrapVideo(this.blogInfo);

              this.loading = true;
              const storageRef = storage.ref();
              const docRef = storageRef.child(`documents/BlogCoverPhotos/${this.$store.state.blogPhotoName}`);

              docRef.put(this.file).on(
                "state_changed",
                (snapshot) => {
                  console.log(snapshot);
                },
                (err) => {
                  console.log(err);
                  this.loading = false;
                },
                 async () => {
                  const downloadURL = await docRef.getDownloadURL();
                  const timestamp = await Date.now();
                  const dataBase = await postsCollection.doc();
                  await dataBase.set({
                    blogID: dataBase.id,
                    blogTitle: this.blogTitle,
                    blogInfo: text,
                    blogCategory: this.category,
                    blogCoverPhoto: (this.youtubeId) ?  this.file : downloadURL,
                    blogCoverPhotoName:  this.blogCoverPhotoName,
                    profileId: this.profileId,
                    youtubeId: (this.youtubeId) ? this.youtubeId: '',
                    date: timestamp,
                  });
                  await this.$store.dispatch("getPost");
                  this.loading = false;
                  this.$router.push({ name: "ViewBlog", params: { blogid: dataBase.id } });
                });
              return;
            }
            this.error = true;
            this.errorMsg = "Please ensure that you uploaded a cover photo!";
            setTimeout(() => {
                this.error = false;
            },5000);
          }
          this.error = true;
          this.errorMsg = "Please ensure that Title and Post have been filled! Also, make sure you selected a category!";
          setTimeout(() => {
              this.error = false;
          },5000);
        },
        uploadBlogMongoDB() {
            if(this.blogTitle.length != 0 && this.blogInfo.length !== 0) {
                if(this.file) {
                  fetch(`http://localhost:${process.env.VUE_APP_SERVER_PORT}/api/create`, {
                    method: "POST",
                    body: JSON.stringify({
                      user: this.$store.state.user,
                      title: this.blogTitle,
                      information: this.blogInfo,
                      coverPhoto: this.$store.state.blogPhotoName,
                      coverPhotoURL: this.$store.state.blogPhotoFileURL
                    }),
                    headers: {"Content-type": "application/json; charset=UTF-8"}
                  })
                  .then(response => response.json() )
                  .then(data => {
                      if(data.message === "Blog failed to save.") {
                        this.error = true;
                        this.errorMsg = "We had a problem saving your post. Please try again.";
                        setTimeout(() => {
                            this.error = false;
                        },5000);
                        return;
                      } else if(data.message === "No user found.") {
                        this.error = true;
                        this.errorMsg = "Sorry you must be logged in to post a blog.";
                        setTimeout(() => {
                            this.error = false;
                        },5000);
                        return;
                      }
                      console.log(data);
                      this.$router.push({ name: "Home" });
                        return;
                    });
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
      }, 5000);
      return;
    },
  },
  computed: {
    profileId() {
      return this.$store.state.profileId;
    },
    blogCoverPhotoName() {
      return this.$store.state.blogPhotoName;
    },
    blogTitle: {
      get() {
        return this.$store.state.blogTitle;
      },
      set(payload) {
        this.$store.commit("updateBlogTitle", payload);
      },
    },
    blogInfo: {
      get() {
        return this.$store.state.blogInfo;
      },
      set(payload) {
        this.$store.commit("newBlogPost", payload);
      },
    },
  },
};
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

    .category {
      position: relative;
      margin: 0 20px;
      align-items: center;
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

    // .toggle-switch{
    //     display: flex;
    //     align-items: center;
    //     position: inherit;
    //     top: -70px;
    //     right: 0;

    //     span {
    //         margin-right: 16px;
    //     }

    //     input[type="checkbox"] {
    //         position: relative;
    //         border: none;
    //         -webkit-appearance: none;
    //         background: #FFFFFF;
    //         outline: none;
    //         width: 80px;
    //         height: 30px;
    //         border-radius: 20px;
    //         box-shadow: 0 4px 6px -1px rgba($color: #000000, $alpha: 0.1), 0 2px 4px -1px rgba($color: #000000, $alpha: 0.06);
    //     }

    //     input[type="checkbox"]:before {
    //         content: "";
    //         position: absolute;
    //         width: 30px;
    //         height: 30px;
    //         border-radius: 20px;
    //         top: 0;
    //         left: 0;
    //         background: #30303030;
    //         transform: scale(1.1);
    //         transition: 750ms ease all;
    //         box-shadow: 0 4px 6px -1px rgba($color: #000000, $alpha: 0.1), 0 2px 4px -1px rgba($color: #000000, $alpha: 0.06);
    //     }

    //     input:checked[type="checkbox"]:before {
    //         background: #FFFFFF;
    //         left: 52px;
    //     }
    // }
    // .url-container {
    //     margin-bottom: 30px;
    // }
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