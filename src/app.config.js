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

// noinspection JSUnusedGlobalSymbols,SpellCheckingInspection
export default defineAppConfig({
  pages: [
    'pages/today/today',
    'pages/glossaries/glossaries',
    'pages/my/my',
    'pages/glossary-detail/glossary-detail',
    'pages/word-detail/word-detail',
    'pages/add-glossary/add-glossary',
    'pages/edit-glossary/edit-glossary',
  ],
  tabBar: {
    list: [
      {
        pagePath:         'pages/today/today',
        text:             '今日',
        iconPath:         'assets/images/home_FILL0_wght500_GRAD-25_opsz48.png',
        selectedIconPath: 'assets/images/home_FILL1_wght500_GRAD-25_opsz48.png',
      }, {
        pagePath:         'pages/glossaries/glossaries',
        text:             '词汇书',
        iconPath:         'assets/images/menu_book_FILL0_wght500_GRAD-25_opsz48.png',
        selectedIconPath: 'assets/images/menu_book_FILL1_wght500_GRAD-25_opsz48.png',
      }, {
        pagePath:         'pages/my/my',
        text:             '我',
        iconPath:         'assets/images/person_FILL0_wght500_GRAD-25_opsz48.png',
        selectedIconPath: 'assets/images/person_FILL1_wght500_GRAD-25_opsz48.png',
      }],
  },
  window: {
    backgroundTextStyle:          'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText:       'WeChat',
    navigationBarTextStyle:       'black',
  },
});
