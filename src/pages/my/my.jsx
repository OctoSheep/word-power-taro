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

import {Component}           from 'react';
import {Text, View}          from '@tarojs/components';
import Taro                  from '@tarojs/taro';
import {Button, Icon, Input} from '@nutui/nutui-react-taro';
import {updateUser}          from '@/api/api';

class My extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: {},
      newName:  '',
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

  updateUser = (name) => {
    const {userData} = this.state;
    userData.name    = name;

    updateUser(
      userData.openid,
      userData.name,
      userData.globalData,
      userData.glossaries,
      userData.todayCount,
    ).then(() => {
      this.setState({
        userData: userData,
        loading:  false,
      });

      Taro.setStorage({
        key:  'userData',
        data: userData,
      }).catch((err) => {
        console.log(err);
      });
    }).catch((err) => {
      console.log(err);
    });
  };

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
            required={true}
            onBlur={(value) => {
              this.setState({
                newName: value,
              });
            }}
            slotButton={
              <Button
                type={'primary'}
                size={'small'}
                onClick={() => {
                  if (this.state.newName !== '') {
                    this.setState({
                      loading: true,
                    });
                    this.updateUser(this.state.newName);
                  } else {
                    Taro.showToast({
                      title: '昵称不能为空',
                      icon:  'error',
                      mask:  true,
                    }).catch((err) => {
                      console.log(err);
                    });
                  }
                }}
              ><Icon
                name={'checklist'}
                size={'1em'}
              />
              </Button>
            }
          />
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
