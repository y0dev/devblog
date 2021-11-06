import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Blogs from "../views/Blogs.vue";
import Login from "../views/Login.vue";
import Profile from "../views/Profile.vue";
import CreatePost from "../views/CreatePost.vue";
import BlogPreview from "../views/BlogPreview.vue";
import ViewBlog from "../views/ViewBlog.vue";
import EditBlog from "../views/EditBlog.vue";
import ViewAboutMe from "../views/ViewAboutMe.vue";

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
    path:"/blogs/all",
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
    path: "/profile",
    name: "Profile",
    component: Profile,
    meta: {
      title: "Profile",
      requiresAuth: true,
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
        requiresAdmin: false,
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
    path:"/aboutme",
    name: "ViewAboutMe",
    component: ViewAboutMe,
    meta: {
        title: "About Me",
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
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
});

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | DevBlog`;
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