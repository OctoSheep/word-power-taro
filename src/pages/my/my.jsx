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

import {Component}                       from 'react';
import {
  View,
}                                        from '@tarojs/components';
import Taro                              from '@tarojs/taro';
import {
  Button,
  Col,
  Dialog,
  Icon,
  Input,
  Row,
  Skeleton,
}                                        from '@nutui/nutui-react-taro';
import {deleteUser, getUser, updateUser} from '@/api/api';

class My extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData:             {},
      newName:              '',
      deleteDialogVisible:  false,
      confirmDialogVisible: false,
      buttonDisabled:       true,
      loading:              true,
    };
  }

  componentDidMount() {
    Taro.getStorage({
      key: 'userData',
    }).then((res) => {
      getUser(res.data.openid).then((userData) => {
        Taro.setStorage({
          key:  'userData',
          data: userData.data,
        }).catch((err) => {
          console.log(err);
        });
        // noinspection JSUnresolvedReference
        this.setState({
          userData:       userData.data,
          buttonDisabled: userData.data.admin,
          loading:        false,
        });
      }).catch((err) => {
        console.log(err);
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

  deleteUser = () => {
    const {userData} = this.state;

    Taro.removeStorage({
      key: 'userData',
    }).then(() => {
      deleteUser(userData.openid).then(() => {
        Taro.exitMiniProgram().catch((err) => {
          console.log(err);
        });
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
            deleteDialogVisible,
            confirmDialogVisible,
            buttonDisabled,
            loading,
          } = this.state;

    const globalData = userData.globalData || {};

    if (!loading) {
      // noinspection JSUnresolvedReference
      return (
        <View className={'my-index'}>
          <Row>
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
          </Row>
          <Row>
            <Input
              label={'总学习词汇'}
              defaultValue={(userData.totalCount !== undefined
                             && userData.totalCount !== null)
                            ? userData.totalCount
                            : 0}
              readonly={true}
            />
          </Row>
          <Row>
            <Input
              label={'今日学习词汇'}
              defaultValue={(userData.todayCount !== undefined
                             && userData.todayCount !== null)
                            ? userData.todayCount
                            : 0}
              readonly={true}
            />
          </Row>
          <Row>
            <Input
              label={'总复习次数'}
              defaultValue={(globalData.totalReview !== undefined
                             && globalData.totalReview !== null)
                            ? globalData.totalReview
                            : 0}
              readonly={true}
            />
          </Row>
          <Row>
            <Input
              label={'词汇难度'}
              defaultValue={(globalData.totalDiff !== undefined
                             && globalData.totalDiff !== null)
                            ? globalData.totalDiff
                            : '暂无数据'}
              readonly={true}
              rightIcon={'ask2'}
              onClickRightIcon={() => {
                Taro.showToast({
                  icon:     'none',
                  duration: 3500,
                  title:    '值越小表示记忆起来越容易',
                }).catch((err) => {
                  console.log(err);
                });
              }}
            />
          </Row>
          <Row>
            <Input
              label={'记忆速度'}
              defaultValue={(globalData.defaultDifficulty !== undefined
                             && globalData.defaultDifficulty !== null)
                            ? globalData.defaultDifficulty
                            : '暂无数据'}
              readonly={true}
              rightIcon={'ask2'}
              onClickRightIcon={() => {
                Taro.showToast({
                  icon:     'none',
                  duration: 3500,
                  title:    '初始值为5，值越小表示记忆速度越快',
                }).catch((err) => {
                  console.log(err);
                });
              }}
            />
          </Row>
          <Row>
            <Input
              label={'记忆强度'}
              defaultValue={(globalData.defaultStability !== undefined
                             && globalData.defaultStability !== null)
                            ? globalData.defaultStability
                            : '暂无数据'}
              readonly={true}
              rightIcon={'ask2'}
              onClickRightIcon={() => {
                Taro.showToast({
                  icon:     'none',
                  duration: 3500,
                  title:    '初始值为2，值越大表示记忆强度越强',
                }).catch((err) => {
                  console.log(err);
                });
              }}
            />
          </Row>
          <Dialog
            title={'确认注销并删除您的帐号？'}
            visible={deleteDialogVisible}
            onOk={() => {
              this.setState({
                deleteDialogVisible:  false,
                confirmDialogVisible: true,
              });
            }}
            onCancel={() => {
              this.setState({
                deleteDialogVisible: false,
              });
            }}
          >此操作将会删除您的所有数据。
          </Dialog>
          <Dialog
            title={'是否真的要删除？'}
            visible={confirmDialogVisible}
            onOk={() => {
              this.setState({
                confirmDialogVisible: false,
              });
              this.deleteUser();
            }}
            onCancel={() => {
              this.setState({
                confirmDialogVisible: false,
              });
            }}
          >此操作不可逆，请谨慎操作！
          </Dialog>
          <Row className={'my-bottom-row'}
               type={'flex'}
               justify={'space-around'}
          >
            <Col span={5}>
              <Button className={'my-delete-button'}
                      type={'danger'}
                      block={true}
                      disabled={buttonDisabled}
                      onClick={() => {
                        this.setState({
                          deleteDialogVisible: true,
                        });
                      }}
              >注销
              </Button>
            </Col>
            <Col span={15}>
              <Button className={'my-refresh-button'}
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
        <View className={'my-index'}>
          <Skeleton className={'my-skeleton'}
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

export default My;
