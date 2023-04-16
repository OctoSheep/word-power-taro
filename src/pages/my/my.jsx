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

import './my.less';

import {Component}  from 'react';
import {Text, View} from '@tarojs/components';
import Taro         from '@tarojs/taro';
import {Input}      from '@nutui/nutui-react-taro';

class My extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: {},
      loading:  true,
    };
  }

  componentDidMount() {
    Taro.getStorage({
      key: 'userData',
    }).then((res) => {
      this.setState({
        userData: res.data,
        loading:  false,
      });
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
        <View className={'my-index'}>
          <Input
            type={'nickname'}
            label={'昵称'}
            placeholder={'请输入昵称'}
            defaultValue={userData.name}
          />
          <Text>成功</Text>
        </View>
      );
    } else {
      return (
        <View className={'my-index'}>
          <Text>loading...</Text>
        </View>
      );
    }
  }
}

export default My;
