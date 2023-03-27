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

import './today.less';

import {Component}                            from 'react';
import {Text, View}                           from '@tarojs/components';
import {getGlossaries, getGlossary, getWords} from '@/api/api';
import {Skeleton}                             from '@nutui/nutui-react-taro';

class Today extends Component {
  constructor(props) {
    super(props);
    this.state = {
      words:   [],
      loading: true,
    };
  }

  componentDidMount() {
    getGlossaries().then((glossaries) => {
      getGlossary(glossaries.data[0].name).then((glossary) => {
        getWords(glossary.data.name).then((words) => {
          this.setState({
            words:   words.data,
            loading: false,
          });
        });
      });
    });
  }

  render() {
    const {
            words,
            loading,
          } = this.state;
    if (!loading) {
      // noinspection JSUnresolvedVariable
      return (
        <View className={'today-index'}>
          <Text>{`${words[0].word}`}</Text>
          <br/>
          <Text>{`${words[0].phonetic_uk}`}</Text>
          <br/>
          <Text>{`${words[0].phonetic_us}`}</Text>
          <br/>
          <Text>{`${words[0].translation[0].part_of_speech}`}</Text>
          <br/>
          <Text>{`${words[0].translation[0].definition}`}</Text>
        </View>
      );
    } else {
      return (
        <View className={'today-index'}>
          <Skeleton className={'today-skeleton'}
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

export default Today;
