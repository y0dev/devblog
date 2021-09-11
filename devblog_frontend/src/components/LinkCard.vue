<template>
    <div class="linkcard-container flex my-1">
        <img class="website-img" src="../assets/logo.png" alt="">
        <div class="info grid info-grid">
            <h5 class="webpage-title">Title</h5>
            <div class="description">
                <p class="info sm">Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident, consequatur. Minima cum modi ex possimus voluptas. Delectus aut eius tempore?</p>
                <div class="url-link">
                    <Chain class="chain" />
                    <a :href="this.link" class="link">Some Link</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { getLinkInfo } from '../helpers';
import Chain from "../assets/icons/link-light.svg";
export default {
  name: "LinkCard",
  props: ["link"],
  components: {
    Chain
  },
  async mounted() {
      if(this.link) {
        const info = await getLinkInfo( this.link);
        console.log(info)
        let img = document.getElementsByClassName('website-img')[0];
        let title = document.getElementsByClassName('webpage-title')[0];
        let description = document.getElementsByClassName('description');
        let paragraph = description[0].children[0]
        let websiteTitle = description[0].children[1].children[1];


        img.src = (info.image) ? info.image : '../assets/logo.png';
        title.textContent = info.title;
        paragraph.textContent = info.metaDescription;
        websiteTitle.textContent =info.hostname;
      }
      //https://developpaper.com/the-method-of-introducing-external-js-file-into-vue-component
  },
};
</script>

<style lang="scss" scoped>
@import "../css/utilities.css";
.linkcard-container {
    // background-color: rgb(255, 255, 255);
    max-width: 500px;
    height: 130px;

    border-radius: 10px;
    border: 2px solid rgb(255, 255, 255);
    box-shadow: 0 3px 10px rgba($color: #000000, $alpha: 0.5);
    justify-content:left;
    overflow: hidden;
}


/* Elements */
img {
    width: 33%;
    height: 100%;
    border-right: 2px double #363636;
    padding: 0;
    margin: 0;
    object-fit: fill;
}


/* Information */
.info {
    margin: 0 5px;
    width:100%;
    .title {
        // border-bottom: 0.5px solid #363636;
        grid-column: 1 / span 2;
    }
    .description {
        // background-color: blue;
        grid-column: 1 / span 2;
        overflow: hidden;
        text-overflow: ellipsis;
        .sm{
            font-size: 11px;
        }
    }
    .url-link {
        font-size: 9px;
        .chain {
            margin: 5px 5px;
            pointer-events: none;
            height: 15px;
            width: auto;
        }
        
    }
}

.info-grid {
    row-gap: 0;
    gap: initial;
}
</style>