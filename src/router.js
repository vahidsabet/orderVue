import Vue from "vue";
import VueRouter from "vue-router";
import AuthRequired from "./utils/AuthRequired";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: () => import(/* webpackChunkName: "home" */ "./views/home"),
    redirect: "/app/home",
  },
  {
    path: "/app",
    component: () => import(/* webpackChunkName: "app" */ "./views/app"),
    redirect: "/app/home",
    beforeEnter: AuthRequired,
    children: [
      {
        path: "home",
        component: () =>
          import(/* webpackChunkName: "piaf" */ "./views/app/home"),
        redirect: "/app/home/start",
        children: [
          { path: 'start', component: () => import(/* webpackChunkName: "piaf" */ './views/app/home/Start') }
        ]
      },
      {
        path: "ziplinOrders",
        component: () =>
          import(/* webpackChunkName: "piaf" */ "./views/app/home/Ziplin")
      },
      {
        path: "takyekOrders",
        component: () =>
          import(/* webpackChunkName: "piaf" */ "./views/app/home/Takyek")
      },
      {
        path: "second-menu",
        component: () =>
          import(/* webpackChunkName: "second-menu" */ "./views/app/second-menu"),
        redirect: "/app/second-menu/second",
        children: [
          { path: 'second', component: () => import(/* webpackChunkName: "piaf" */ './views/app/second-menu/Second') }
        ]
      },
     /* {
        path: "userlist",
        component: () =>
          import(// webpackChunkName: "user" // "./views/app/list"),        
      },*/
      {
        path: "addorderZiplin",
        component: () =>
          import(/* webpackChunkName: "single" */ "./views/app/single/ziplinOrder")
      },
      {
        path: "addorderTakyek",
        component: () =>
          import(/* webpackChunkName: "single" */ "./views/app/single/takOrder")
      }
    ]
  },
  {
    path: "/error",
    component: () => import(/* webpackChunkName: "error" */ "./views/Error")
  },
  {
    path: "/user",
    component: () => import(/* webpackChunkName: "user" */ "./views/user"),
    redirect: "/user/login",
    
   /* beforeEach(to, from, next){
      if (localStorage.getItem('user') != null) {
        console.log("before each");
        
        next('/app')
      }
      next();
    },*/
    children: [
      {
        path: "login",
        component: () =>
          import(/* webpackChunkName: "user" */ "./views/user/Login"),
          beforeEnter(to, from, next){
            localStorage.removeItem('user')
            next();
        },
      },
      {
        path: "register",
        component: () =>
          import(/* webpackChunkName: "user" */ "./views/user/Register"),
          beforeEnter: AuthRequired,
      },
      /*{
        path: "forgot-password",
        component: () =>
          import(// webpackChunkName: "user" // "./views/user/ForgotPassword")
      },*/
      {
        path: "reset-password",
        component: () =>
          import(/* webpackChunkName: "user" */ "./views/user/ResetPassword"),
          beforeEnter: AuthRequired,
      },

    ]
  },
  {
    path: "*",
    component: () => import(/* webpackChunkName: "error" */ "./views/Error")
  }
];

const router = new VueRouter({
  linkActiveClass: "active",
  routes,
  mode: "history"
});

export default router;
