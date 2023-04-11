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

import './edit-word.less';

import {Component}          from 'react';
import {getCurrentInstance} from '@tarojs/runtime';
import {getWords}           from '@/api/api';
import Taro                 from '@tarojs/taro';
import {View}               from '@tarojs/components';
import {WordInfo}           from '@/components/word-info/word-info';
import {Skeleton}           from '@nutui/nutui-react-taro';

class EditWord extends Component {
  routerParams = getCurrentInstance().router.params;

  constructor(props) {
    super(props);
    this.state = {
      glossaryName: this.routerParams.glossaryName,
      id:           this.routerParams.id,
      index:        '',
      word:         '',
      phonetic_uk:  '',
      phonetic_us:  '',
      translation:  [],
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
      const {
              index,
              word,
              phonetic_uk,
              phonetic_us,
              translation,
            } = res.data[0];
      this.setState({
        index:       index,
        word:        word,
        phonetic_uk: phonetic_uk,
        phonetic_us: phonetic_us,
        translation: translation,
        loading:     false,
      });
      Taro.setNavigationBarTitle({
        title: word.toString(),
      }).catch((err) => {
        console.log(err);
      });
    });
  }

  render() {
    const {
            glossaryName,
            id,
            index,
            word,
            phonetic_uk,
            phonetic_us,
            translation,
            loading,
          } = this.state;

    if (!loading) {
      return (
        <View className='edit-word-index'>
          <WordInfo
            glossaryName={glossaryName}
            pageType={'edit'}
            id={id}
            index={index}
            word={word}
            phonetic_uk={phonetic_uk}
            phonetic_us={phonetic_us}
            translation={translation}
          />
        </View>
      );
    } else {
      return (
        <View className='edit-word-index'>
          <Skeleton className={'edit-word-skeleton'}
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

export default EditWord;
