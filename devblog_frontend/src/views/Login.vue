<template>
    <div class="form-wrap">
        <form action="" class="login">
            <h2>Login to DevBlog</h2>
            <div class="inputs">
                <div class="input">
                    <input type="text" placeholder="Email" v-model="usernameEmail" />
                    <email class="icon"/>
                </div>
                <div class="input">
                    <input type="password" placeholder="Password" v-model="password" />
                    <password class="icon"/>
                </div>
                <div class="error" v-show="error"> {{ this.errorMsg }}</div>
            </div>
            <button @click.prevent="login">Sign In</button>
            <div class="angle"></div>
        </form>
        <div class="background"></div>
    </div>
</template>

<script>
import email from "../assets/icons/envelope-regular.svg";
import password from "../assets/icons/lock-alt-solid.svg";
import firebase from "firebase/app";
import "firebase/auth";
export default {
    name: "Login",
    components: {
        email,
        password
    },
    data() {
        return {
            usernameEmail: "",
            password: "",
            error:null,
            errorMsg: ""
        }
    },
    methods: {
        login() {
              firebase
                .auth()
                .signInWithEmailAndPassword(this.usernameEmail, this.password)
                .then(() => {
                    this.$router.push({ name: "Home" });
                    this.error = false;
                    this.errorMsg = "";
                    console.log(firebase.auth().currentUser.uid);
                })
                .catch((err) => {
                this.error = true;
                this.errorMsg = err.message;
                });
        },
        loginMongoDB() {
            if(this.usernameEmail !== "" &&
               this.password !== "") {
                this.error = false;
                this.errorMsg = "";
                fetch(`http://localhost:${process.env.VUE_APP_SERVER_PORT}/api/login`, {
                    method: "POST",
                    body: JSON.stringify({
                       usernameEmail: this.usernameEmail,
                       password: this.password
                    }),
                    headers: {"Content-type": "application/json; charset=UTF-8"}
                })
                .then(response => response.json() )
                .then(data => {
                    if(data.token) {
                        let user = window.atob( data.token.split(".")[1] );
                        this.$store.commit("setProfileInfo",user);
                        this.$store.commit("setProfileInitials");
                        console.log(this.$store.state.email)
                        this.$router.push({ name: "Home" });
                        return;
                    }
                    this.errorMsg = "Invalid Username/Password";
                    return;
                });
                
                this.error = true;
                this.errorMsg = "Invalid Username/Password";
                return;
            }
            this.error = true;
            this.errorMsg = "Please fill in all the fields";
            
        }
    },
    metaInfo() {
    let description = 'I would like to welcome you all to my blog. This is were I share what I am or have read. Along with my thoughts on what going on in the church and our view on this world. Hope you would share this site and come again!';
    let image = 'https://firebasestorage.googleapis.com/v0/b/devblog-322120.appspot.com/o/photos%2Flogo.png?alt=media&token=35466416-7b85-4627-830f-c60567e02e61';
    return { 
      meta: [
          { name: 'description', content:  description},
          { name: 'author', content:  'Devontae Reid'},
          { property: 'og:title', content: document.title},
          { property: 'og:image', content: image},
          { property: 'og:url', content: 'https://devssite.net/'},
          { property: 'og:site_name', content: 'Devssite'},
          {property: 'og:type', content: 'website'},
          { property: 'twitter:title', content: document.title},
          { property: 'twitter:description', content: description}, 
          { property: 'twitter:image', content: image},       
          { property: 'twitter:site', content: '@_yodev_'},      
          {name: 'robots', content: 'index,follow'} 
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.form-wrap {
    overflow: hidden;
    display: flex;
    height: 100vh;
    justify-content: center;
    align-self: center;
    margin: 0 auto;
    width: 90%;
    @media (min-width: 900px) {
        width: 100%;
    }

    form {
        padding: 0 10px;
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        flex: 1;
        @media (min-width: 900px) {
            padding: 0 50px;
        }

        h2 {
            text-align: center;
            font-size: 32px;
            color: #303030;
            margin-bottom: 40px;
            @media (min-width: 900px) {
                font-size: 40px;
            }
        }
        .inputs {
            width: 100%;
            max-width: 350px;

            .input {
                position: relative;
                display: flex;
                justify-content: center;
                align-items: center;
                margin-bottom: 8px;
                input {
                    width: 100%;
                    border: none;
                    background-color: #F2F7F6;
                    padding: 4px 4px 4px 30px;
                    height: 50px;

                    &:focus {
                        outline: none;
                    }
                }

                .icon {
                    width: 12px;
                    position: absolute;
                    left: 5px;
                }
            }
        }

        .angle {
            display: none;
            position: absolute;
            background-color: #FFFFFF;
            transform: rotateZ(3deg);
            width: 60px;
            right: -30px;
            height: 101%;
            @media (min-width: 900px) {
                display: initial;
            }
        }

    }

    .background {
        display: none;
        flex: 2;
        background-size: cover;
        background-image: url("../assets/background.jpg");
        width: 100%;
        height: 100%;
        @media (min-width: 900px) {
            display: initial;
        }
    }
}
</style>