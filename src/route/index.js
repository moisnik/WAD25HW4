import { createRouter, createWebHistory } from "vue-router"
import Posts from "../views/posts.vue"
import Signup from "../views/signup.vue"

const routes = [{
    path: "/posts", 
    name: "posts", 
    component: Posts,
    meta: { title: "Posts" } 
},{
    path: "/signup", 
    name: "signup", 
    component: Signup,
    meta: { title: "Sign up" }
}]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

//for titles
router.afterEach((to) => {
  if (to.meta.title) {
    document.title = to.meta.title
  } else {
    document.title = "WAD25HW3"
  }
})

export default router
