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

import './word.less';

import {Component}                     from 'react';
import {Image, Text, View}             from '@tarojs/components';
import {hexToHsl, hslToHex, randomHex} from '@/utils/color-utils';
import {getWords}                      from '@/api/api';
import Taro                            from '@tarojs/taro';
import {Skeleton}                      from '@nutui/nutui-react-taro';

const right_arrow_url = require('@/assets/images/arrow_right_FILL0_wght500_GRAD-25_opsz48.svg');

class Word extends Component {
  constructor(props) {
    super(props);
    const {
            glossaryName,
            id,
            color,
          }    = this.props;
    this.state = {
      glossaryName: glossaryName || '',
      id:           id || '',
      index:        0,
      word:         'loading...',
      color:        color || randomHex(),
      loading:      true,
    };
  }

  componentDidMount() {
    const {
            glossaryName,
            id,
          } = this.state;
    getWords(
      glossaryName,
      null,
      id,
    ).then((res) => {
      this.setState({
        index:   res.data[0].index,
        word:    res.data[0].word,
        loading: false,
      });
    }).catch((err) => {
      console.log(err);
    });
  }

  getWord = (
    glossaryName,
    word,
    id,
  ) => {
    getWords(
      glossaryName,
      null,
      id,
    ).then(() => {
      Taro.navigateTo({
        url: `/pages/word-detail/word-detail?glossaryName=${glossaryName}&wordName=${word}`,
      }).catch((err) => {
        console.log(err);
      });
    }).catch((err) => {
      console.log(err);
      Taro.showToast({
        icon:  'error',
        title: '词汇不存在',
      }).catch((err) => {
        console.log(err);
      });
    });
  };

  render() {
    const {
            glossaryName,
            id,
            index,
            word,
            color,
            loading,
          } = this.state;

    const indexText = index.toString().padStart(
      4,
      '0',
    );
    const colorHsl  = hexToHsl(color);
    const bgColor   = hslToHex([colorHsl[0], colorHsl[1], 90]);
    const textColor = hslToHex([colorHsl[0], colorHsl[1], 20]);

    if (!loading) {
      // noinspection SpellCheckingInspection
      return (
        <View className={'word-index'}
              onClick={() => {
                this.getWord(
                  glossaryName,
                  word,
                  id,
                );
              }}
        ><View className={'word-container'}
               style={{borderColor: textColor}}
        ><Text className={'word-index-text'}
               style={{color: bgColor}}
        >{indexText}
        </Text>
          <Text className={'word-text'}
                style={{color: textColor}}
          >{word}
          </Text>
          <View className={'word-mask'}/>
          <View className={'word-arrow'}>
            <Image className={process.env.TARO_ENV === 'weapp'
                              ? 'word-arrow-image-weapp'
                              : 'word-arrow-image-h5'}
                   src={right_arrow_url}
                   svg={true}
            />
          </View>
        </View>
        </View>
      );
    } else {
      return (
        <View className={'word-index'}
        ><View className={'word-container'}
               style={{borderColor: textColor}}
        ><View className={'word-mask'}/>
          <Skeleton className={'word-skeleton'}
                    width={'300px'}
                    height={'30px'}
                    round={true}
                    animated={true}
                    row={1}
          />
        </View>
        </View>
      );
    }
  }
}

export {Word};
