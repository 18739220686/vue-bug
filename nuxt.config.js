import axios from "./utils/axios";

module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'nuxt-demo',
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {hid: 'description', name: 'description', content: 'Nuxt.js project'}
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/logo.png'}
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: {color: '#3B8070'},
  /*
  ** Build configuration
  */
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/proxy',
  ],
  axios: {
    proxy: true, // 表示开启代理
//     axios.interceptors.request({
//   use: (config => {
//     console.log(config)
//     return config
// })
  },
  plugins: ['~/plugins/element'],
  proxy: {
    //过滤 webstorm 的更新 socket ：sockjs-node  ，其余都执行替换
    '/v1': {
      target: 'http://127.0.0.1:8000',
      changeOrigin: true, // 表示是否跨域
      pathRewrite: {
        '^/v1': '/', // 把 /api 替换成 /
      }}
  },
css: [
     'element-ui/lib/theme-chalk/index.css',
   ],
  build: {
    /*
    ** Run ESLint on save
    */
    extend(config, {isDev, isClient}) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}

