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

import './cover.less';

import React, {Component}              from 'react';
import {Text, View}                    from '@tarojs/components';
import {hexToHsl, hslToHex, randomHex} from '@/utils/color-utils';
import Taro                            from '@tarojs/taro';
import {getGlossary}                   from '@/api/api';

class Cover extends Component {
  constructor(props) {
    super(props);
    const {
            title,
            coverText,
            color,
          }    = this.props;
    this.state = {
      title:     title || '更多……',
      coverText: coverText || 'More',
      color:     color || randomHex(),
    };
  }

  getGlossary = (
    glossaryName,
  ) => {
    getGlossary(glossaryName).then(() => {
      Taro.navigateTo({
        url: `/pages/glossary-detail/glossary-detail?glossaryName=${glossaryName}`,
      }).catch((err) => {
        console.log(err);
      });
    }).catch((err) => {
      console.log(err);
      Taro.showToast({
        icon:  'error',
        title: '词汇书不存在',
      }).catch((err) => {
        console.log(err);
      });
    });
  };

  render() {
    const {
            title,
            coverText,
            color,
          } = this.state;

    const colorHsl  = hexToHsl(color);
    const bgColor   = hslToHex([colorHsl[0], colorHsl[1], 30]);
    const textColor = hslToHex([colorHsl[0], colorHsl[1], 70]);
    return (
      <View className={'cover-index'}
            onClick={() => {
              this.getGlossary(
                coverText,
              );
            }}
      ><View className={'cover-container'}
             style={{
               backgroundColor: bgColor,
               borderColor:     textColor,
             }}
      ><Text className={'cover-text'}
             style={{color: textColor}}
      >{coverText}
      </Text>
      </View>
        <View className={'cover-title'}>
          <Text>
            {title}
          </Text>
        </View>
      </View>
    );
  }
}

export {Cover};
