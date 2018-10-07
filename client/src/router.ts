import Vue from "vue";
import Router from "vue-router";
import { firebase } from "@/store/firestore";

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: () =>
        import(/* webpackChunkName: "Home" */ "./views/Home.vue"),
      meta: {
        public: true
      }
    },
    {
      path: "/register",
      name: "register",
      component: () =>
        import(/* webpackChunkName: "register" */ "./views/Register.vue")
    },
    {
      path: "/list",
      name: "list",
      component: () => import(/* webpackChunkName: "list" */ "./views/List.vue")
    },
    {
      path: "/sign-in",
      name: "signin",
      component: () =>
        import(/* webpackChunkName: "signin" */ "./views/SignIn.vue"),
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
