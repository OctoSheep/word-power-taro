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

import {Component} from 'react';
import {
  View,
}                  from '@tarojs/components';
import {getUser}   from '@/api/api';
import {
  Animate,
  Button,
  Col,
  Divider,
  Empty,
  Row,
  Skeleton,
}                  from '@nutui/nutui-react-taro';
import Taro        from '@tarojs/taro';
import {
  Word,
}                  from '@/components/word/word';

class Today extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: {},
      loading:  true,
    };
  }

  componentDidMount() {
    Taro.login().then((res) => {
      if (res.code) {
        getUser(res.code).then((userData) => {
          this.setState({
            userData: userData.data,
            loading:  false,
          });
          Taro.setStorage({
            key:  'userData',
            data: userData.data,
          }).catch((err) => {
            console.log(err);
          });
        }).catch((err) => {
          console.log(err);
        });
      } else {
        console.log('登录失败！');
        Taro.showToast({
          icon:  'error',
          title: '登录失败！',
        }).catch((err) => {
          console.log(err);
        });
      }
    }).catch((err) => {
      console.log(err);
    });
  }

  render() {
    const {
            userData,
            loading,
          } = this.state;

    if (!loading) {
      let glossaryElements = (
        <Empty description={'您没有任何正在学习的词汇书'}/>
      );

      const myGlossaries = userData.glossaries;
      if (myGlossaries.length > 0) {
        glossaryElements = myGlossaries.map((glossary) => {
          return (
            <Word
              type={'glossary'}
              glossaryName={glossary.glossary}
              count={glossary.index}
            />
          );
        });
      }

      // noinspection JSUnresolvedReference
      return (
        <View className={'today-index'}>
          <Animate className={'today-animate'}
                   type={'shake'}
                   action={'click'}
          ><Word
            type={'daily'}
            date={new Date(userData.date)}
            count={userData.todayCount}
          />
          </Animate>
          <Divider/>
          {glossaryElements}
          <Row className={'today-button-row'}
               type={'flex'}
               justify={'space-around'}
          ><Col span={10}>
            <Button className={'today-edit-button'}
                    type={'success'}
                    icon={'edit'}
                    onClick={() => {
                      Taro.navigateTo({
                        url: '/pages/edit-my-glossaries/edit-my-glossaries',
                      }).catch((err) => {
                        console.log(err);
                      });
                    }}
            >修改
            </Button>
          </Col>
            <Col span={10}>
              <Button className={'today-refresh-button'}
                      type={'info'}
                      icon={'refresh2'}
                      onClick={() => {
                        this.setState({
                          loading: true,
                        });
                        this.componentDidMount();
                      }}
              >刷新
              </Button>
            </Col>
          </Row>
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
