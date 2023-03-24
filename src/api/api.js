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

import Taro from '@tarojs/taro';

const BASE_URL = 'https://api.cones.top/v1/';

const request = (
  url,
  method,
  data,
) => {
  return new Promise((
    resolve,
    reject,
  ) => {
    Taro.request({
      url: BASE_URL + url,
      method: method,
      data: data,
    }).then(res => {
      if (res.statusCode - 200 < 100) {
        resolve(res.data);
      } else {
        reject(res.data);
      }
    }).catch(err => {
      reject(err);
    });
  });
};

const getGlossaries = () => {
  return request(
    'glossaries',
    'GET',
    {},
  );
};

const getGlossary = (name) => {
  return request(
    'glossaries/' + name,
    'GET',
    {},
  );
};

export {
  getGlossaries,
  getGlossary,
};
