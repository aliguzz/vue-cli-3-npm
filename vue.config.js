const path = require("path");

module.exports = {
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [
        '/Users/localhost8080/git/fantasyfootballfrontend/src/styles/global.scss'
      ]
    },
    cordovaPath: 'src-cordova'
  },

  pwa: {
    themeColor: '#0F265A',
    msTitleColor: '#0F265A',
  },

  publicPath: '',

  chainWebpack: (config) => {
    config
      .plugin('html')
      .tap(args => {
        args[0].title = 'Fantasy Football Scotland';
        args[0].meta = { viewport: 'width=device-width,initial-scale=1.0,viewport-fit=cover,user-scalable=no' };

        return args;
      })
  }
};