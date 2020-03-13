import Vue from 'vue'
import Router from 'vue-router'
import Search from '../views/Search'
import Show from '../views/Show'
import More from '../views/More'
import About from '../views/About'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Search',
      component: Search
    },
    {
      path: '/show',
      name: 'Show',
      component: Show
    },
    {
      path: '/more',
      name: 'More',
      component: More
    },
    {
      path: '/about',
      name: 'About',
      component: About
    }
  ]
})
