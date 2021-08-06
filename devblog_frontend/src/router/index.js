import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Blogs from "../views/Blogs.vue";
import Login from "../views/Login.vue";

Vue.use(VueRouter);

const routes = [
    {
        path:"/",
        name: "Home",
        component: Home,
        meta: {
            title: "Home"
        },
    },
    {
        path:"/blogs",
        name: "Blogs",
        component: Blogs,
        meta: {
            title: "Blogs"
        },
    },
    {
        path:"/login",
        name: "Login",
        component: Login,
        meta: {
            title: "Login"
        },
    },
]

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,

});

router.beforeEach((to,from,next) => {
    document.title = `DevBlog | ${to.name}`;
    next();
})
export default router;