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
              <option>Theology</option>
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
import { getYouTubeThumbnail, getVideoId_YT,getLinksInText } from '../helpers';
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
      videoId:null,
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
    async textHandler(delta, oldDelta, source) {
      if(source) {
        const text = this.blogInfo;
        console.log(text)
        getLinksInText(text)
        if(text.includes("youtube.com/embed") && !this.file) {


          this.videoId = getVideoId_YT(text)
          
          this.file = await getYouTubeThumbnail(this.videoId);
          
          let payload = {
            url: this.file,
            videoId: this.videoId
          }
          this.$store.dispatch('getImageNameYoutube',payload);
        }
      }
    },
    async uploadBlog(){
      if(this.blogTitle.length != 0 && this.blogInfo.length !== 0 && this.category) {
        if (this.file) {

          this.loading = true;
          if(!this.$store.state.blogPhotoName.includes("https:")) {
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
                blogInfo: this.blogInfo,
                blogCategory: this.category,
                blogCoverPhoto: downloadURL,
                blogCoverPhotoName:  this.blogCoverPhotoName,
                profileId: this.profileId,
                videoId: '',
                date: timestamp,
              });
              await this.$store.dispatch("getPost");
              this.loading = false;
              this.$router.push({ name: "ViewBlog", params: { blogid: dataBase.id } });
            });
          } else {
            const timestamp = await Date.now();
            const dataBase = await postsCollection.doc();
            await dataBase.set({
              blogID: dataBase.id,
              blogTitle: this.blogTitle,
              blogInfo: this.blogInfo,
              blogCategory: this.category,
              blogCoverPhoto: this.file,
              blogCoverPhotoName:  this.blogCoverPhotoName,
              profileId: this.profileId,
              videoId: this.videoId,
              date: timestamp,
            });
            await this.$store.dispatch("getPost");
            this.loading = false;
            this.$router.push({ name: "ViewBlog", params: { blogid: dataBase.id } });
            
          }
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

<style lang="scss">
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
    
    
    gap: 20px;
    justify-content: center;
    align-items: center;
    margin-bottom: 32px;
    flex-wrap: wrap;
    @media (min-width: 500px) {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
    }
    @media (max-width: 768px) {
      display: none;
      grid-template-rows: 1fr;
      grid-template-columns: 1fr;
    }
    .upload-file {
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
      z-index: 100;
    }
  }
  .blog-actions {
    margin-top: 32px;
    @media (max-width: 500px) {
      display: flex;
      flex-direction: column-reverse;
      gap: 10px;
    }
    button {
      margin-right: 16px;
    }
  }
}
</style>