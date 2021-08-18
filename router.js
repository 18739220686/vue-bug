//挂载路由导航守卫
import * as router from "vue-router";

router.beforeEach((to, from, next) =>{
      // to 将访问的路径
      // from 代表从那个路径跳转而来
      // next 是一个函数，表示放行 next（'/login'） 强制跳转
      if(to.path === '/login') return next();
      //获取token
      const tokenStr = window.sessionStorage.getItem('token')
      if(!tokenStr) return next('/login')
      next()
})
