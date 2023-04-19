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

import './edit-my-glossaries.less';

import {Component}                        from 'react';
import Taro                               from '@tarojs/taro';
import {View}                             from '@tarojs/components';
import {getGlossaries, updateUser}        from '@/api/api';
import {Button, Cell, Checkbox, Skeleton} from '@nutui/nutui-react-taro';

class EditMyGlossaries extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData:        {},
      glossaries:      [],
      myGlossaryNames: [],
      loading:         true,
    };
  }

  componentDidMount() {
    Taro.getStorage({
      key: 'userData',
    }).then((res) => {
      const userData        = res.data;
      const myGlossaries    = userData.glossaries;
      const myGlossaryNames = myGlossaries.map((glossary) => {
        return glossary.glossary;
      });
      this.setState({
        userData:        userData,
        myGlossaryNames: myGlossaryNames,
      });
    }).catch((err) => {
      console.log(err);
    });

    getGlossaries().then((res) => {
      this.setState({
        glossaries: res.data,
        loading:    false,
      });
    }).catch((err) => {
      console.log(err);
    });
  }

  updateMyGlossary = () => {
    const {
            userData,
            myGlossaryNames,
          }                = this.state;
    const oldGlossaries    = userData.glossaries;
    const oldGlossaryNames = oldGlossaries.map((glossary) => {
      return glossary.glossary;
    });

    let newGlossaries = [];
    for (let i = 0; i < myGlossaryNames.length; i++) {
      if (oldGlossaryNames.includes(myGlossaryNames[i])) {
        newGlossaries.push({
          glossary: myGlossaryNames[i],
          index:    oldGlossaries[oldGlossaryNames.indexOf(myGlossaryNames[i])].index,
        });
      } else {
        newGlossaries.push({
          glossary: myGlossaryNames[i],
          index:    0,
        });
      }
    }

    updateUser(
      userData.openid,
      userData.name,
      userData.globalData,
      newGlossaries,
      userData.todayCount,
    ).then(() => {
      Taro.showToast({
        icon:  'success',
        title: '修改成功',
      }).catch((err) => {
        console.log(err);
      });
    }).then(() => {
      Taro.navigateBack().catch((err) => {
        console.log(err);
      });
    }).catch((err) => {
      console.log(err);
      Taro.showToast({
        icon:  'error',
        title: '修改失败',
      }).catch((err) => {
        console.log(err);
      });
    });
  };

  render() {
    const {
            glossaries,
            myGlossaryNames,
            loading,
          } = this.state;

    if (!loading) {
      const glossaryList = glossaries.map((
        glossary,
        index,
      ) => {
        const glossaryName        = glossary.name;
        const glossaryDescription = glossary.description;

        return (
          <Cell>
            <Checkbox
              key={index}
              label={glossaryName}
            >{glossaryDescription}（{glossaryName}）
            </Checkbox>
          </Cell>
        );
      });

      return (
        <View className={'edit-my-glossaries-index'}>
          <Checkbox.Group className={'edit-my-glossaries-group'}
                          checkedValue={myGlossaryNames}
                          onChange={(value) => {
                            this.setState({
                              myGlossaryNames: value,
                            });
                          }}
          >{glossaryList}
          </Checkbox.Group>
          <Button
            type={'primary'}
            block={true}
            onClick={() => {
              this.updateMyGlossary();
            }}
          >修改
          </Button>
        </View>
      );
    } else {
      return (
        <View className={'edit-my-glossaries-index'}>
          <Skeleton className={'edit-my-glossaries-skeleton'}
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

export default EditMyGlossaries;
