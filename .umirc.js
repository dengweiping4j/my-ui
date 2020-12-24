
// ref: https://umijs.org/config/
export default {
  treeShaking: true,
/* 此处配置放开后会导致umi不使用自动路由
 routes: [
    {
      path: '/',
      component: '../layouts/index',
      routes: [
        { path: '/', component: '../pages/index' }
      ]
    }
  ],*/
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: false,
      dynamicImport: false,
      title: '程序员工具箱',
      links:[
        {
          rel:'icon',
          href:'/images/logo2.svg'
        }
      ],

      dll: false,

      routes: {
        exclude: [
          /components\//,
        ],
      },
    }],
  ],

  proxy: {
    '/api': {
      'target': 'http://localhost:8080',
      'changeOrigin': true,
      'pathRewrite': { '^/api' : '' },
    },
  },

}
