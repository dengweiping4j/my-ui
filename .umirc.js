// ref: https://umijs.org/config/
export default {
  treeShaking: true,
  history: 'hash',
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: true,
      dynamicImport: { webpackChunkName: true },
      title: '程序员工具箱',
      links: [
        {
          rel: 'icon',
          href: '/images/logo.svg',
        },
      ],
      dll: false,
      locale: {
        enable: true,
        default: 'en-US',
      },

      routes: {
        exclude: [
          /models\//,
          /services\//,
          /model\.(t|j)sx?$/,
          /service\.(t|j)sx?$/,
          /components\//,
        ],
      },
    }],
  ],

};
