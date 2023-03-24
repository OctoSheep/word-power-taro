/*
 * Copyright (c) 2023. OctoSheep
 *
 * This file is part of Word Power.
 *
 * Word Power is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or any later version.
 *
 * Word Power is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License along with Word Power. If not, see <https://www.gnu.org/licenses/>.
 *
 */

const path = require('path');

const config = {
  projectName:     'word-power',
  date:            '2023-3-15',
  designWidth:     375,
  deviceRatio:     {
    640: 2.34 / 2,
    750: 1,
    828: 1.81 / 2,
    375: 2,
  },
  sourceRoot:      'src',
  outputRoot:      'dist',
  plugins:         ['@tarojs/plugin-html'],
  alias:           {
    '@': path.resolve(
      __dirname,
      '..',
      'src',
    ),
  },
  defineConstants: {},
  copy:            {
    patterns: [],
    options:  {},
  },
  framework:       'react',
  compiler:        'webpack5',
  cache:           {
    enable: false, // Webpack 持久化缓存配置，建议开启。默认配置请参考：https://docs.taro.zone/docs/config-detail#cache
  },
  sass:            {
    data: `@import "@nutui/nutui-react-taro/dist/styles/variables.scss";`,
  },
  mini:            {
    postcss: {
      pxtransform: {
        enable: true,
        config: {
          selectorBlackList: ['nut-'],
        },
      },
      url:         {
        enable: true,
        config: {
          limit: 1024, // 设定转换尺寸上限
        },
      },
      cssModules:  {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern:      'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]',
        },
      },
    },
  },
  h5:              {
    publicPath:      '/',
    staticDirectory: 'static',
    // esnextModules: ['nutui-react'],
    postcss: {
      pxtransform:  {
        enable: true,
        config: {
          selectorBlackList: ['nut-'],
        },
      },
      autoprefixer: {
        enable: true,
        config: {},
      },
      cssModules:   {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern:      'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]',
        },
      },
    },
  },
};

module.exports = function(merge) {
  if (process.env.NODE_ENV === 'development') {
    return merge(
      {},
      config,
      require('./dev'),
    );
  }
  return merge(
    {},
    config,
    require('./prod'),
  );
};
