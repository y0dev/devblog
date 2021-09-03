<template>
    <div class="linkcard-container flex my-1">
        <img src="../assets/logo.png" alt="">
        <div class="info grid info-grid">
            <h5 class="">Title</h5>
            <div class="description">
                <p class="sm">Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident, consequatur. Minima cum modi ex possimus voluptas. Delectus aut eius tempore?</p>
                <div class="url-link">
                    <Chain class="chain" />
                    <a href="#" class="link">Some Link</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// import { getLinkInfo } from '../helpers';
import Chain from "../assets/icons/link-light.svg";
export default {
  name: "LinkCard",
  props: ["link"],
  components: {
    Chain
  },
  async mounted() {
    //   const info = await getLinkInfo('https://developpaper.com/the-method-of-introducing-external-js-file-into-vue-component/');
    //   console.log(info);
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