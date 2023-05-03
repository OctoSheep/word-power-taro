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

import {Component}                            from 'react';
import {Image, Text, View}                    from '@tarojs/components';
import {hexToHsl, hslToHex, randomHex}        from '@/utils/color-utils';
import {getGlossaries, getGlossary, getWords} from '@/api/api';
import Taro                                   from '@tarojs/taro';
import {Skeleton}                             from '@nutui/nutui-react-taro';

const right_arrow_url = require('@/assets/images/arrow_right_FILL0_wght500_GRAD-25_opsz48.svg');

class Word extends Component {
  constructor(props) {
    super(props);
    const {
            type,
            glossaryName,
            id,
            date,
            count,
            color,
          }    = this.props;
    this.state = {
      type:                type || 'word',
      glossaryName:        glossaryName || '',
      glossaryDescription: '',
      id:                  id || '',
      index:               0,
      word:                'loading...',
      date:                date || new Date(),
      count:               count || 0,
      color:               color || randomHex(),
      userData:            {},
      loading:             true,
    };
  }

  componentDidMount() {
    Taro.getStorage({
      key: 'userData',
    }).then((res) => {
      this.setState({
        userData: res.data,
      });
    }).catch((err) => {
      console.log(err);
    });

    const {
            type,
            glossaryName,
            id,
          } = this.state;

    if (type === 'word') {
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
    } else if (type === 'daily') {
      this.setState({
        loading: false,
      });
    } else if (type === 'glossary') {
      getGlossaries().then((res) => {
        const glossaries = res.data;
        for (let i = 0; i < glossaries.length; i++) {
          if (glossaries[i].name === glossaryName) {
            this.setState({
              glossaryDescription: glossaries[i].description,
              loading:             false,
            });
            break;
          }
        }
      }).catch((err) => {
        console.log(err);
      });
    }
  }

  getWord = (
    glossaryName,
    id,
  ) => {
    getWords(
      glossaryName,
      null,
      id,
    ).then(() => {
      Taro.navigateTo({
        url: `/pages/word-detail/word-detail?glossaryName=${glossaryName}&id=${id}`,
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

  getCard = (
    glossaryName,
    userId,
  ) => {
    getGlossary(
      glossaryName,
    ).then(() => {
      Taro.navigateTo({
        url: `/pages/card/card?glossaryName=${glossaryName}&userId=${userId}`,
      }).catch((err) => {
        console.log(err);
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
            type,
            glossaryName,
            glossaryDescription,
            id,
            index,
            word,
            date,
            count,
            color,
            userData,
            loading,
          } = this.state;

    const colorHsl  = hexToHsl(color);
    const bgColor   = hslToHex([colorHsl[0], colorHsl[1], 90]);
    const textColor = hslToHex([colorHsl[0], colorHsl[1], 20]);

    if (!loading) {
      const indexText        = index.toString().padStart(
        4,
        '0',
      );
      const dateStr          = `${date.getMonth() + 1}月${date.getDate()}日`;
      const dailyCountStr    = `今日已学习${count}个词汇`;
      const glossaryCountStr = `${glossaryDescription}（第${count}个）`;

      let text  = null;
      let arrow = null;
      if (type === 'word') {
        text = (
          <>
            <Text className={'word-index-text'}
                  style={{color: bgColor}}
            >{indexText}
            </Text>
            <Text className={'word-text'}
                  style={{color: textColor}}
            >{word}
            </Text>
          </>
        );

        arrow = (
          <>
            <View className={'word-mask'}/>
            <View className={'word-arrow'}>
              <Image className={process.env.TARO_ENV === 'weapp'
                                ? 'word-arrow-image-weapp'
                                : 'word-arrow-image-h5'}
                     src={right_arrow_url}
                     svg={true}
              />
            </View>
          </>
        );
      } else if (type === 'daily') {
        text = (
          <>
            <Text className={'word-date-text'}
                  style={{color: bgColor}}
            >{dateStr}
            </Text>
            <Text className={'word-count-text'}
                  style={{color: textColor}}
            >{dailyCountStr}
            </Text>
          </>
        );
      } else if (type === 'glossary') {
        text = (
          <>
            <Text className={'word-date-text'}
                  style={{color: bgColor}}
            >{glossaryName}
            </Text>
            <Text className={'word-count-text'}
                  style={{color: textColor}}
            >{glossaryCountStr}
            </Text>
          </>
        );

        arrow = (
          <>
            <View className={'word-mask'}/>
            <View className={'word-arrow'}>
              <Image className={process.env.TARO_ENV === 'weapp'
                                ? 'word-arrow-image-weapp'
                                : 'word-arrow-image-h5'}
                     src={right_arrow_url}
                     svg={true}
              />
            </View>
          </>
        );
      }

      return (
        <View className={'word-index'}
              onClick={() => {
                if (type === 'word') {
                  this.getWord(
                    glossaryName,
                    id,
                  );
                } else if (type === 'glossary') {
                  this.getCard(
                    glossaryName,
                    userData.openid,
                  );
                }
              }}
        ><View className={'word-container'}
               style={{borderColor: textColor}}
        >{text}
          {arrow}
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
