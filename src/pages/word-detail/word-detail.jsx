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

import './word-detail.less';

import {Component}          from 'react';
import {Text, View}         from '@tarojs/components';
import {getCurrentInstance} from '@tarojs/runtime';
import {getWords}           from '@/api/api';
import {Button, Skeleton}   from '@nutui/nutui-react-taro';
import Taro                 from '@tarojs/taro';

class WordDetail extends Component {

  routerParams = getCurrentInstance().router.params;

  constructor(props) {
    super(props);
    this.state = {
      word:    '',
      loading: true,
    };
  }

  componentDidMount() {
    const {
            glossaryName,
            wordName,
          } = this.routerParams;
    getWords(
      glossaryName,
      wordName,
      null,
    ).then((res) => {
      this.setState({
        word:    res.data[0],
        loading: false,
      });
    });
    Taro.setNavigationBarTitle({
      title: wordName.toString(),
    }).catch((err) => {
      console.log(err);
    });
  }

  render() {
    const {
            word,
            loading,
          } = this.state;

    if (!loading) {
      const innerAudioContext    = Taro.createInnerAudioContext();
      innerAudioContext.autoplay = false;

      // noinspection JSUnresolvedVariable
      return (
        <View className={'word-detail-index'}>
          <View>
            <Text>{`词汇：${word.word}`}</Text>
          </View>
          <View>
            <Text>{`美式音标：${word.phonetic_us}`}</Text>
            <Button
              type={'default'}
              size={'small'}
              onClick={() => {
                innerAudioContext.src
                  = `https://dict.youdao.com/dictvoice?audio=${word.word}&type=2`;
                innerAudioContext.play();
              }}
            >美式发音</Button>
          </View>
          <View>
            <Text>{`英式音标：${word.phonetic_uk}`}</Text>
            <Button
              type={'default'}
              size={'small'}
              onClick={() => {
                innerAudioContext.src
                  = `https://dict.youdao.com/dictvoice?audio=${word.word}&type=1`;
                innerAudioContext.play();
              }}
            >英式发音</Button>
          </View>
          <View>
            <Text>{`释义：(${word.translation[0].part_of_speech}) ${word.translation[0].definition}`}</Text>
            {/*TODO 遍历*/}
          </View>
        </View>
      );
    } else {
      return (
        <View className={'word-detail-index'}>
          <Skeleton className={'word-detail-skeleton'}
                    width={'300px'}
                    height={'15px'}
                    animated={true}
                    row={3}
          />
        </View>
      );
    }
  }
}

export default WordDetail;
