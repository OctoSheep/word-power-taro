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

import {Component}          from 'react';
import {getGlossary}        from '@/api/api';
import {View}               from '@tarojs/components';
import {Word}               from '@/components/word/word';
import {getCurrentInstance} from '@tarojs/runtime';
import {Skeleton}           from '@nutui/nutui-react-taro';

class Glossary extends Component {
  $instance = getCurrentInstance();

  config = {
    navigationBarTitleText: this.$instance.router.params.glossaryDescription,
  };

  constructor(props) {
    super(props);
    this.state = {
      glossaryName: this.$instance.router.params.glossaryName,
      wordIds:      [],
      loading:      true,
    };
  }

  componentDidMount() {
    const {glossaryName} = this.state;
    getGlossary(glossaryName).then((res) => {
      console.log(res);
      // noinspection JSUnresolvedVariable
      this.setState({
        wordIds: res.data.vocabularies,
        loading: false,
      });
    });
  }

  render() {
    const {
            glossaryName,
            wordIds,
            loading,
          } = this.state;

    if (!loading) {
      const wordElements = wordIds.map((
        wordId,
        index,
      ) => {
        return (
          <Word glossaryName={glossaryName} id={wordId} key={index}/>
        );
      });

      return (
        <View className={'glossary-index'}>
          {/*<Word glossaryName={glossaryName} id={wordIds[0]}/>*/}
          {wordElements}
        </View>
      );
    } else {
      return (
        <View className={'glossary-index'}>
          <Skeleton className={'glossary-skeleton'}
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

export default Glossary;
