import Vue from 'vue'
import Router from 'vue-router'
import Axios from 'Axios'
import Article from '../components/Article'
import Postlist from '../components/Postlist'
import UserInfo from '../components/UserInfo'
import SlideBar from '../components/SlideBar'
Vue.use(Router)
Vue.prototype.$http = Axios

export default new Router({
  routes: [
    {
      name:'root',
      path:'/',
      components:{
        main:Postlist
      }
    },
    {
      name:'post_content',
      path:'/topic/:id&author=:name',
      components:{
        main:Article,
        slidebar:SlideBar
      }
    },{
      name:'user_info',
      path:'/user/:name',
      components:{
        main:UserInfo,
      }
    }
  ]
})
