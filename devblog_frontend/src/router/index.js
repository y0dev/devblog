import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Blogs from "../views/Blogs.vue";
import Login from "../views/Login.vue";
import CreatePost from "../views/CreatePost.vue";
import BlogPreview from "../views/BlogPreview.vue";
import ViewBlog from "../views/ViewBlog.vue";
import EditBlog from "../views/EditBlog.vue";

import {auth} from '../firebase'

Vue.use(VueRouter);

const routes = [
    {
        path:"/",
        name: "Home",
        component: Home,
        meta: {
            title: "Home",
            requiresAuth: false,
        },
    },
    {
        path:"/blogs",
        name: "Blogs",
        component: Blogs,
        meta: {
            title: "Blogs",
            requiresAuth: false,
        },
    },
    {
        path:"/login",
        name: "Login",
        component: Login,
        meta: {
            title: "Login",
            requiresAuth: false,
        },
    },
    {
        path:"/post",
        name: "CreatePost",
        component: CreatePost,
        meta: {
            title: "Create Post",
            requiresAuth: true,
            requiresAdmin: false,
        },
    },
    {
        path:"/post",
        name: "BlogPreview",
        component: BlogPreview,
        meta: {
            title: "Preview Blog Post",
            requiresAuth: true,
            requiresAdmin: true,
        },
    },
    {
        path:"/v=:blogid",
        name: "ViewBlog",
        component: ViewBlog,
        meta: {
            title: "View Blog Post",
            requiresAuth: false,
        },
    },
    {
        path:"/edit/v=:blogid",
        name: "EditBlog",
        component: EditBlog,
        meta: {
            title: "Edit Blog Post",
            requiresAuth: true,
            requiresAdmin: false,
        },
    },
]

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,

});

router.beforeEach((to,from,next) => {
    document.title = `DevBlog | ${to.meta.title}`;
    next();
});

router.beforeEach(async (to, from, next) => {
    let user = auth.currentUser;
    let admin = null;
    if (user) {
      let token = await user.getIdTokenResult();
      admin = token.claims.admin;
    }
    if (to.matched.some((res) => res.meta.requiresAuth)) {
      if (user) {
        if (to.matched.some((res) => res.meta.requiresAdmin)) {
          if (admin) {
            return next();
          }
          return next({ name: "Home" });
        }
        return next();
      }
      return next({ name: "Home" });
    }
    return next();
});
export default router;