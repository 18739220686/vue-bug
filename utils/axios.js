import axios from 'axios'
import * as router from "vue-router";
// import {getUser} from "@/utils/auth";
//创建axios实例
const service = axios.create({
  baseURL: 'http://127.0.0.1:8000/v1',//api的base_url
  timeout: 30000, //请求超时
  use: (config => {
    console.log(config)
    return config
    // headers: {'Authorization': 'Bearer ' + getUser().token},
  }),

})

export default service
/*
//挂载路由导航守卫
router.beforeEach((to, from, next) =>{
      // to 将访问的路径
      // from 代表从那个路径跳转而来
      // next 是一个函数，表示放行 next（'/login'） 强制跳转
      if(to.path === '/login/login') return next();
      //获取token
      const tokenStr = window.sessionStorage.getItem('token')
      if(!tokenStr) return next('/login/login')
      next()
})



*/

/*
// 添加一个请求拦截器，回调函数会在发出请求时执行
// config:请求配置
axios.interceptors.request.use(config => {
    // Do something before request is sent

    // console.log(config)
    let token = sessionStorage.getItem("token") ? sessionStorage.getItem("token") : "";
    config.headers.Authorization = token;
    return config;
}, error => {
    // Do something with request error
    return Promise.reject(error);
});

// 响应拦截器
axios.interceptors.response.use(response => {
    // Do something before response is sent
    return response.data;
}, error => {
    // Do something with response error
    return Promise.reject(error);
});


function get(url,params={}) {

  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url,
      params
    }).then((data) => {
      resolve(data)
    }).catch(err => {
      reject(err);
    })
  })
}

*/
