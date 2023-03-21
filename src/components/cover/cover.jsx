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

import React, {Component}              from 'react';
import {Text, View}                    from '@tarojs/components';
import {hexToHSL, hslToHex, randomHex} from '../../utils/color-utils';

import './cover.less';

class Cover extends Component {
  static defaultProps = {
    title:     '更多……',
    coverText: 'More',
    // color: '#096148',
  };

  render() {
    const {
            title,
            coverText,
            color,
          }         = this.props;
    const newColor  = color || randomHex();
    const colorHsl  = hexToHSL(newColor);
    const bgColor   = hslToHex([colorHsl[0], colorHsl[1], 30]);
    const textColor = hslToHex([colorHsl[0], colorHsl[1], 70]);
    return (
      <View className={'cover-index'}>
        <View className={'cover-cover'} style={{backgroundColor: bgColor}}>
          <Text className={'cover-text'}
                style={{color: textColor}}>
            {coverText}
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
