import Vue from 'vue'
import VueRouter from 'vue-router'
import CustomerCTRForm from "@/components/CustomerCTRForm";
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: CustomerCTRForm
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
