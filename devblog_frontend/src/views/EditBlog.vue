<template>
  <div class="create-post">
    <BlogCoverPreview v-show="this.$store.state.blogPhotoPreview" />
    <Loading v-show="loading" />
    <div class="container">
      <div :class="{ invisible: !error }" class="err-message">
        <p><span>Error:</span>{{ this.errorMsg }}</p>
      </div>
      <div class="blog-info">
        <input type="text" placeholder="Enter Blog Title" v-model="blogTitle" />
        <div class="category">
          <select v-model="category">
            <option disabled value="">Please select one</option>
            <option>Faith</option>
            <option>Sports</option>
            <option>Technology</option>
          </select>
        </div>
        <div class="upload-file">
          <label for="blog-photo">Upload Cover Photo</label>
          <input type="file" ref="blogPhoto" id="blog-photo" @change="fileChanged" accept=".png, .jpg, .jpeg" />
          <button @click="openPreview" class="preview" :class="{ 'button-inactive': !this.$store.state.blogPhotoFileURL }">
            Preview Photo
          </button>
          <span>File Chosen: {{ this.$store.state.blogPhotoName }}</span>
        </div>
      </div>
      <div class="editor">
        <vue-editor :editorOptions="editorSettings" v-model="blogInfo" useCustomImageHandler @image-added="imageHandler"  @text-change="textHandler"/>
      </div>
      <div class="blog-actions">
        <button @click="updateBlog">Save Changes</button>
        <router-link class="router-button" :to="{ name: 'BlogPreview' }">Preview Changes</router-link>
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
Quill.register("modules/imageResize", ImageResize);

import { storage, postsCollection } from '../firebase'
import { getImages } from '../helpers';
export default {
  name: "CreatePost",
  data() {
    return {
      file: null,
      error: null,
      errorMsg: null,
      category:null,
      loading: null,
      routeID: null,
      uploadYoutube:null,
      currentBlog: null,
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
  components: {
    BlogCoverPreview,
    Loading,
  },
  async mounted() {
    this.routeID = this.$route.params.blogid;
    this.currentBlog = await this.$store.state.blogPosts.filter((post) => {
      return post.blogID === this.routeID;
    });
    this.$store.commit("setBlogState", this.currentBlog[0]);
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


              let startingIdx = text.indexOf("youtube.com/embed") + "youtube.com/embed".length + 1
              let endingIdx = text.indexOf("?showinfo")
              
              const videoId = text.substring(startingIdx, endingIdx);
              
              fetch(`https://www.googleapis.com/youtube/v3/videos?key=${process.env.VUE_APP_GOOGLE_API_KEY}&part=snippet&id=${videoId}`, {
                method: "GET",
                headers: {"Content-type": "application/json; charset=UTF-8"}
              })
              .then(response => response.json() )
              .then(data => { 
                const item0 = data.items[0];
                const snippet = item0.snippet;
                let images = getImages(snippet.thumbnails);
                this.file = images[images.length - 1]
                this.youtubeId = videoId;
                console.log(snippet)
                let payload = {
                  url: `https://img.youtube.com/vi/${this.youtubeId}/maxresdefault.jpg`,
                  youtubeId: this.youtubeId
                }
                this.$store.dispatch('getImageName',payload);
                //this.$store.commit("blogYoutubeURL",snippet.thumbnails.maxres.url);
                console.log(data);
              }).catch((err) => {
                console.log(err)
                
                this.file = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`
                this.youtubeId = videoId
                let payload = {
                  url: `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
                  youtubeId: this.youtubeId
                }
                this.$store.dispatch('getImageName',payload);
              });
            }
          }
        },

    async updateBlog() {
      const dataBase = await postsCollection.doc(this.routeID);
      if (this.blogTitle.length !== 0 && this.blogInfo.length !== 0) {
        if (this.file) {
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

              await dataBase.update({
                blogInfo: this.blogInfo,
                blogCoverPhoto: (this.youtubeId) ? '' : downloadURL,
                blogCoverPhotoName: this.blogCoverPhotoName,
                blogTitle: this.blogTitle,
                youtubeId: (this.youtubeId) ? this.youtubeId: '',
                youtubeImageURL: (this.youtubeId) ? `https://img.youtube.com/vi/${this.youtubeId}/maxresdefault.jpg` : '',
              });
              await this.$store.dispatch("updatePost", this.routeID);
              this.loading = false;
              this.$router.push({ name: "ViewBlog", params: { blogid: dataBase.id } });
            }
          );
          return;
        }
        this.loading = true;
        await dataBase.update({
          blogInfo: this.blogInfo,
          blogTitle: this.blogTitle,
        });
        await this.$store.dispatch("updatePost", this.routeID);
        this.loading = false;
        this.$router.push({ name: "ViewBlog", params: { blogid: dataBase.id } });
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

  label,
  button,
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