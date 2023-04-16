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

import {Component}  from 'react';
import {Text, View} from '@tarojs/components';
import {getUser}    from '@/api/api';
import {Skeleton}   from '@nutui/nutui-react-taro';
import Taro         from '@tarojs/taro';

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
        console.log('登录失败！' + res.errMsg);
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
      return (
        <View className={'today-index'}>
          <Text>{`${userData.name}`}</Text>
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
