import Vue from "vue";
import Router from "vue-router";
import { firebase } from "@/store-old/firestore";

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import(/* webpackChunkName: "Home" */ './views/Home.vue'),
      meta: {
        public: true
      }
    },
    {
      path: "/about",
      name: "about",
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
    },
    {
      path: "/sign-in",
      name: "signin",
      component: () => import(/* webpackChunkName: "signin" */ './views/SignIn.vue'),
      meta: {
        public: true
      }
    }
  ]
});

router.beforeEach((to, from, next) => {
  const isPublic = to.matched.some(record => record.meta.public);

  if (isPublic) {
    next();
  } else {
    const user = firebase.auth().currentUser;
    if (user) {
      next();
    } else {
      next("/sign-in");
    }
  }
});

export default router;
