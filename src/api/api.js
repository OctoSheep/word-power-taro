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

let BASE_URL = 'https://api.cones.top/';

const request = (
  url,
  method,
  data    = {},
  header  = {},
  version = '1',
) => {
  return new Promise((
    resolve,
    reject,
  ) => {
    const newUrl = `${BASE_URL}v${version}/${url}`;
    Taro.request({
      url:    newUrl,
      method: method,
      data:   data,
      header: header,
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
  );
};

const getGlossary = (glossaryName) => {
  return request(
    'glossaries/' + glossaryName,
    'GET',
  );
};

const createGlossary = (
  glossaryName,
  glossaryDescription,
  glossaryUrl,
  glossaryToken,
) => {
  return request(
    'glossaries',
    'POST',
    {
      name:        glossaryName,
      description: glossaryDescription,
      url:         glossaryUrl,
    },
    {
      'Authorization': 'Bearer ' + glossaryToken,
    },
  );
};

const updateGlossary = (
  oldGlossaryName,
  newGlossaryName,
  glossaryDescription,
) => {
  return request(
    'glossaries/' + oldGlossaryName,
    'PATCH',
    {
      name:        newGlossaryName,
      description: glossaryDescription,
    },
  );
};

const deleteGlossary = (glossaryName) => {
  return request(
    'glossaries/' + glossaryName,
    'DELETE',
  );
};

const getWords = (
  glossaryName,
  word,
  id,
) => {
  let url = 'words/' + glossaryName;
  if (id) {
    url += '?id=' + id;
  } else if (word) {
    url += '?word=' + word;
  }
  return request(
    url,
    'GET',
  );
};

const createWord = (
  glossaryName,
  index,
  word,
  phonetic_uk,
  phonetic_us,
  translation,
) => {
  return request(
    'words/' + glossaryName,
    'POST',
    {
      index:       index,
      word:        word,
      phonetic_uk: phonetic_uk,
      phonetic_us: phonetic_us,
      translation: translation,
    },
  );
};

const updateWord = (
  glossaryName,
  newGlossaryName,
  id,
  index,
  word,
  phonetic_uk,
  phonetic_us,
  translation,
) => {
  return request(
    'words/' + glossaryName + '/' + id,
    'PATCH',
    {
      glossary:    newGlossaryName,
      index:       index,
      word:        word,
      phonetic_uk: phonetic_uk,
      phonetic_us: phonetic_us,
      translation: translation,
    },
  );
};

const deleteWord = (
  glossaryName,
  id,
) => {
  return request(
    'words/' + glossaryName + '/' + id,
    'DELETE',
  );
};

const getUser = (codeOrId) => {
  return request(
    'users/' + codeOrId,
    'GET',
    {},
    {},
    '2',
  );
};

const updateUser = (
  openid,
  name,
  globalData,
  glossaries,
  todayCount,
) => {
  return request(
    'users/' + openid,
    'PATCH',
    {
      name:       name,
      globalData: globalData,
      glossaries: glossaries,
      todayCount: todayCount,
    },
    {},
    '2',
  );
};

const deleteUser = (openid) => {
  return request(
    'users/' + openid,
    'DELETE',
    {},
    {},
    '2',
  );
};

const getLatestCard = (
  glossaryName,
  userId,
) => {
  return request(
    'cards/' + glossaryName + '/' + userId,
    'GET',
    {},
    {},
    '2',
  );
};

const updateCard = (
  wordId,
  userId,
  grade,
) => {
  return request(
    'cards/' + wordId + '/' + userId,
    'PATCH',
    {
      grade: grade,
    },
    {},
    '2',
  );
};

export {
  getGlossaries,
  getGlossary,
  createGlossary,
  updateGlossary,
  deleteGlossary,
  getWords,
  createWord,
  updateWord,
  deleteWord,
  getUser,
  updateUser,
  deleteUser,
  getLatestCard,
  updateCard,
};
