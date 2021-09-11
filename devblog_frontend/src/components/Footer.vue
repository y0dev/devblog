<template>
  <footer>
    <div class="container">
      <div class="left">
        <div class="col-1">
          <router-link class="header" :to="{ name: 'Home' }"><img src="../assets/logo/devontaereid_white.png" alt=""></router-link>
          <ul>
            <li>
              <a href="https://twitter.com/_yodev_"><twitter class="svg-icon"/></a>
            </li>
            <li>
              <a href="https://www.linkedin.com/in/devontaereid/"><linkedin class="svg-icon"/></a>
            </li>
            <li>
              <a href="https://github.com/y0dev"><github class="svg-icon"/></a>
            </li>
          </ul>
        </div>
        <div class="col-2">
          <ul>
                    <a class="link" href="mailto: devdoesit17@gmail.com">Email</a>
          </ul>
        </div>
      </div>
      <div class="right">
        <p>Copyright 2021 All Rights Reserved</p>
      </div>
    </div>
  </footer>
</template>

<script>
import twitter from "../assets/icons/twitter-brands.svg";
import linkedin from "../assets/icons/linkedin-brands.svg";
import github from "../assets/icons/github1-brands.svg";
export default {
  name: "footer-vue",
  components: {
    twitter,
    linkedin,
        github
  },
  computed: {
    user() {
      return this.$store.state.user;
        }
    }
}
</script>

<style lang="scss" scoped>
footer {
  margin-top: auto;
  padding: 100px 25px;
  background-color: #303030;
  .container {
    display: flex;
    flex-direction: column;
    gap: 32px;
    @media (min-width: 800px) {
      flex-direction: row;
      gap: 0px;
    }

    > div {
      display: flex;
      flex: 1;
    }

    .left {
      gap: 32px;
      color: #FFF;
      display: flex;
      flex-direction: column;
      align-items: center;
      @media (min-width: 800px) {
        flex-direction: row;
        align-items: initial;
        gap: 0;
      }

      .header {
        text-align: center;
        font-size: 24px;
        color: #FFF;
        //margin-bottom: 16px;
        text-decoration: none;
        font-weight: 600;
        @media (min-width: 800px) {
          text-align: initial;
        }
      }
      ul {
        gap: 16px;
        list-style: none;
        display: flex;
      }

      .col-1,
      .col-2 {
        gap: 32px;
        display: flex;
        flex: 1;
        @media (min-width: 800px) {
          gap: 32px;
        }
      }

      .col-1 {
        flex-direction: column;
        img{
          width: 40%;
        }
        ul {
          margin-top: auto;

          li {
            display: flex;
            align-items: center;
            .svg-icon {
              width: 24px;
              height: auto;
              color: #FFF;
            }
          }
        }
      }

      .col-2 {
        ul {
          height: 100%;
          justify-content: center;
          flex-direction: row;
          flex-wrap: wrap;
          @media (min-width: 800px) {
            flex-direction: column;
          }
          .link {
            font-size: 16px;
            font-weight: 500;
            color: #FFF;
            text-decoration: none;
          }
        }
      }
    }

    .right {
      gap: 32px;
      color: #FFF;
      align-items: center;
      flex-direction: column;
      @media (min-width: 800px) {
        align-items: flex-end;
        gap: 0;
      }
    }

    p {
      margin-top: auto;
    }
  }
}
</style>