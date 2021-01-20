// ref: https://umijs.org/config/
export default {
  treeShaking: true,
  history: 'hash',
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: true,
      dynamicImport: {
        loadingComponent: './utils/loadable',
        webpackChunkName: true,
        level: 3
      },
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
    }]
  ],
  chainWebpack(config, { webpack }) {
    config.module
      .rule('raw-loader')
      .test(/\.md$/);
  },
};