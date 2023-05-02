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

import './card.less';

import {Component}                  from 'react';
import {getCurrentInstance}         from '@tarojs/runtime';
import {getLatestCard, getWords}    from '@/api/api';
import {View}                       from '@tarojs/components';
import {Button, Col, Row, Skeleton} from '@nutui/nutui-react-taro';
import {WordInfo}                   from '@/components/word-info/word-info';
import Taro                         from '@tarojs/taro';

class Card extends Component {
  routerParams = getCurrentInstance().router.params;

  constructor(props) {
    super(props);
    this.state = {
      glossaryName:  this.routerParams.glossaryName,
      userId:        this.routerParams.userId,
      showTrans:     false,
      showSubmitRow: false,
      loading:       true,
    };
  }

  componentDidMount() {
    const {
            glossaryName,
            userId,
          } = this.state;

    getLatestCard(
      glossaryName,
      userId,
    ).then((res) => {
      // noinspection JSUnresolvedReference
      getWords(
        glossaryName,
        null,
        res.data.wordId,
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
    });
  }

  render() {
    const {
            glossaryName,
            wordId,
            index,
            word,
            phonetic_uk,
            phonetic_us,
            translation,
            showTrans,
            loading,
          } = this.state;

    if (!loading) {
      let submitRow = (
        <Row
          key={showTrans}
          type={'flex'}
          justify={'space-around'}
        ><Col span={1}/>
          <Col span={18}>
            <Button
              block={true}
              onClick={() => {
                this.setState({
                  showTrans: true,
                });
              }}
            >显示答案
            </Button>
          </Col>
          <Col span={1}/>
        </Row>
      );

      if (showTrans) {
        submitRow = (
          <Row
            key={showTrans}
            type={'flex'}
            justify={'space-around'}
          ><Col span={1}/>
            <Col span={6}>
              <Button
                type={'warning'}
                block={true}
              >遗忘
              </Button>
            </Col>
            <Col span={6}>
              <Button
                type={'info'}
                block={true}
              >记住
              </Button>
            </Col>
            <Col span={6}>
              <Button
                type={'success'}
                block={true}
              >容易
              </Button>
            </Col>
            <Col span={1}/>
          </Row>
        );
      }

      return (
        <View className={'card-index'}>
          <WordInfo
            key={`${wordId}${showTrans}`}
            glossaryName={glossaryName}
            pageType={'card'}
            id={wordId}
            index={index}
            word={word}
            phonetic_uk={phonetic_uk}
            phonetic_us={phonetic_us}
            translation={translation}
            showTrans={showTrans}
          />
          {submitRow}
        </View>
      );
    } else {
      return (
        <View className={'card-index'}>
          <Skeleton className={'card-skeleton'}
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

export default Card;
