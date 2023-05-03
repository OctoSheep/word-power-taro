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

import {Component}                           from 'react';
import {getCurrentInstance}                  from '@tarojs/runtime';
import {getLatestCard, getWords, updateCard} from '@/api/api';
import {View}                                from '@tarojs/components';
import {Button, Col, Empty, Row, Skeleton}   from '@nutui/nutui-react-taro';
import {
  WordInfo,
}                                            from '@/components/word-info/word-info';
import Taro                                  from '@tarojs/taro';

class Card extends Component {
  routerParams = getCurrentInstance().router.params;

  constructor(props) {
    super(props);
    this.state = {
      glossaryName:  this.routerParams.glossaryName,
      userId:        this.routerParams.userId,
      wordId:        '',
      index:         1,
      word:          '',
      phonetic_uk:   '',
      phonetic_us:   '',
      translation:   [],
      showTrans:     false,
      showSubmitRow: false,
      empty:         false,
      loading:       true,
    };
  }

  componentDidMount() {
    this.getLatestCard();
  }

  getLatestCard = () => {
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
                _id,
                index,
                word,
                phonetic_uk,
                phonetic_us,
                translation,
              } = res.data[0];
        this.setState({
          wordId:      _id,
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
    }).catch((err) => {
      console.log(err);
      if (err.status === 404) {
        this.setState({
          empty:   true,
          loading: false,
        });
      }
    });
  };

  updateCard = (
    grade,
  ) => {
    this.setState({
      loading: true,
    });

    const {
            wordId,
            userId,
          } = this.state;

    updateCard(
      wordId,
      userId,
      grade,
    ).then(() => {
      this.setState({
        showTrans:     false,
        showSubmitRow: false,
      });
      this.getLatestCard();
    }).catch((err) => {
      console.log(err);
    });
  };

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
            empty,
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
                onClick={() => {
                  this.updateCard(0);
                }}
              >困难
              </Button>
            </Col>
            <Col span={6}>
              <Button
                type={'info'}
                block={true}
                onClick={() => {
                  this.updateCard(1);
                }}
              >记住
              </Button>
            </Col>
            <Col span={6}>
              <Button
                type={'success'}
                block={true}
                onClick={() => {
                  this.updateCard(2);
                }}
              >容易
              </Button>
            </Col>
            <Col span={1}/>
          </Row>
        );
      }

      let info = (
        <>
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
        </>
      );

      if (empty) {
        info = (
          <Empty
            description={'当前暂无需要复习的词汇'}
          />
        );
      }

      return (
        <View className={'card-index'}>
          {info}
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
