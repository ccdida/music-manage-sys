import Vue from 'vue'
import Router from 'vue-router'

const Login = ()=>import("views/login/Login.vue")
const Blog = ()=>import("views/blog/Blog.vue")
const Music = ()=>import("views/music/Music.vue")
const Swiper = ()=>import("views/swiper/Swiper.vue")
const Layout = ()=>import("../layout/Layout.vue")
const MusicEdit = ()=>import("views/music/musicedit/MusicEdit.vue")

Vue.use(Router)
// 解决双击路由报错
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
   return originalPush.call(this, location).catch(err => err)
}

const router=new Router({
  mode: 'history',
  // base: process.env.BASE_URL,
  routes: [
    {
      path:'/',
      redirect:'/login'
    },
    {
      path:'/login',
      component:Login,
      meta:{
        title:'登录'
      }
    },
    {
      path:'/layout',
      component:Layout,
      redirect:'/music',
      meta:{
        title:'后台'
      },
      children:[
        {
          path:'/blog',
          name:'博客列表',
          component:Blog,
          meta:{
            title:'博客管理'
          }
        },
        {
          path:'/music',
          name:'歌单列表',
          component:Music,
          meta:{
            title:'歌单管理'
          }
        },
        {
          path:'/music/edit',
          name:'修改信息',
          component:MusicEdit,
          meta:{
            title:'歌单信息修改'
          }
        },
        {
          path:"/swiper",
          name:'轮播图列表',
          component:Swiper,
          meta:{
            title:'轮播图管理'
          }
        }

      ]
    }
    
    
    
  ]
});
// console.log(router);
router.beforeEach((to, from, next) => {
  // console.log(to);
  let title=to.meta.title;
  document.title=title;
  next();
})

export default router 