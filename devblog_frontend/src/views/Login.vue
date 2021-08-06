<template>
    <div class="form-wrap">
        <form action="" class="login">
            <h2>Login to DevBlog</h2>
            <div class="inputs">
                <div class="input">
                    <input type="text" placeholder="Email or Username" v-model="usernameEmail">
                    <email class="icon"/>
                </div>
                <div class="input">
                    <input type="password" placeholder="Password" v-model="password">
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
            if(this.usernameEmail !== "" &&
               this.password !== "") {
                this.error = false;
                this.errorMsg = "";
                fetch("http://localhost:3600/api/login", {
                    method: "POST",
                    body: JSON.stringify({
                       usernameEmail: this.usernameEmail,
                       password: this.password
                    }),
                    headers: {"Content-type": "application/json; charset=UTF-8"}
                })
                .then(response => response.json() )
                .then(data => {
                    console.log(data);
                    if(data.token) {
                        let user = window.atob( data.token.split(".")[1] );
                        
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