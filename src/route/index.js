import { createRouter, createWebHistory } from "vue-router"
import Posts from "../views/posts.vue"
import Signup from "../views/signup.vue"
import ContactUs from "../views/contactus.vue"
import LogIn from "../views/login.vue"
import ViewPost from "../views/viewpost.vue"
import AddPost from "../views/addpost.vue"

const routes = [{
    path: "/", 
    name: "posts", 
    component: Posts,
    meta: { title: "Posts", requiresAuth: true} 
},{
    path: "/signup", 
    name: "signup", 
    component: Signup,
    meta: { title: "Sign up" }
},{
    path: "/contactus", 
    name: "contactus", 
    component: ContactUs,
    meta: { title: "Contact Us" }
},{
    path: "/login", 
    name: "login", 
    component: LogIn,
    meta: { title: "Log in" }
},{
    path: "/viewpost/:id", 
    name: "viewpost", 
    component: ViewPost,
    meta: { title: "View post", requiresAuth: true},
    props: true,
},{
    path: "/addpost", 
    name: "addpost", 
    component: AddPost,
    meta: { title: "Add post", requiresAuth: true}
}]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// check if the user is logged in
router.beforeEach((to) => {
  const token = localStorage.getItem('token')
  const needsAuth = to.matched.some(r => r.meta && r.meta.requiresAuth)

  if (needsAuth && !token) {
    return { name: 'login' }
  }
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
