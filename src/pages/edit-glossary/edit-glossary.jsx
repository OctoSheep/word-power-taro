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

import './edit-glossary.less';

import {Component}                    from 'react';
import {getCurrentInstance}           from '@tarojs/runtime';
import {View}                         from '@tarojs/components';
import {Button, Input, Row, Skeleton} from '@nutui/nutui-react-taro';
import {getGlossary, updateGlossary}  from '@/api/api';
import Taro                           from '@tarojs/taro';

class EditGlossary extends Component {
  routerParams = getCurrentInstance().router.params;

  constructor(props) {
    super(props);
    this.state = {
      glossaryName:           '',
      oldGlossaryName:        '',
      glossaryDescription:    '',
      oldGlossaryDescription: '',
      buttonDisabled:         true,
      loading:                true,
    };
  }

  componentDidMount() {
    const glossaryName = this.routerParams.glossaryName;
    getGlossary(glossaryName).then((res) => {
      this.setState({
        glossaryName:           res.data.name,
        oldGlossaryName:        res.data.name,
        glossaryDescription:    res.data.description,
        oldGlossaryDescription: res.data.description,
        nameChanged:            false,
        loading:                false,
      });
      Taro.setNavigationBarTitle({
        title: `编辑${res.data.description}`,
      }).catch((err) => {
        console.log(err);
      });
    });
  }

  updateGlossary = () => {
    const {
            glossaryName,
            oldGlossaryName,
            glossaryDescription,
            nameChanged,
          } = this.state;

    updateGlossary(
      oldGlossaryName,
      glossaryName,
      glossaryDescription,
    ).then(() => {
      Taro.showToast({
        icon:  'success',
        title: '修改成功',
      }).catch((err) => {
        console.log(err);
      });
    }).then(() => {
      let delta = 1;
      if (nameChanged) {
        delta = 2;
      }
      Taro.navigateBack({
        delta,
      }).catch((err) => {
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

  setButtonStatus = (
    type,
    value,
  ) => {
    if (type === 'name') {
      this.setState({
        glossaryName: value,
      });
      const {
              oldGlossaryName,
              glossaryDescription,
              oldGlossaryDescription,
            } = this.state;
      if (value !== oldGlossaryName) {
        this.setState({
          nameChanged: true,
        });
      } else {
        this.setState({
          nameChanged: false,
        });
      }
      if (value && glossaryDescription && (value !== oldGlossaryName
                                           || glossaryDescription
                                           !== oldGlossaryDescription)) {
        this.setState({
          buttonDisabled: false,
        });
      } else {
        this.setState({
          buttonDisabled: true,
        });
      }
    } else if (type === 'description') {
      this.setState({
        glossaryDescription: value,
      });
      const {
              glossaryName,
              oldGlossaryName,
              oldGlossaryDescription,
            } = this.state;
      if (value && glossaryName && (value !== oldGlossaryDescription
                                    || glossaryName !== oldGlossaryName)) {
        this.setState({
          buttonDisabled: false,
        });
      } else {
        this.setState({
          buttonDisabled: true,
        });
      }
    }
  };

  render() {
    const {
            glossaryName,
            glossaryDescription,
            buttonDisabled,
            loading,
          } = this.state;

    if (!loading) {
      return (
        <View className={'edit-glossary-index'}>
          <Row>
            <Input
              label={'书名'}
              placeholder={'请输入词汇书的名称'}
              defaultValue={glossaryName}
              clearable={true}
              required={true}
              onChange={(value) => {
                this.setButtonStatus(
                  'name',
                  value,
                );
              }}
              onClear={() => {
                this.setButtonStatus(
                  'name',
                  '',
                );
              }}
            />
          </Row>
          <Row>
            <Input
              label={'描述'}
              placeholder={'请输入词汇书的描述'}
              defaultValue={glossaryDescription}
              clearable={true}
              required={true}
              onChange={(value) => {
                this.setButtonStatus(
                  'description',
                  value,
                );
              }}
              onClear={() => {
                this.setButtonStatus(
                  'description',
                  '',
                );
              }}
            />
          </Row>
          <Row>
            <Button
              key={buttonDisabled}
              type={'primary'}
              block={true}
              disabled={buttonDisabled}
              onClick={() => {
                this.updateGlossary();
              }}
            >修改
            </Button>
          </Row>
        </View>
      );
    } else {
      return (
        <View className={'edit-glossary-index'}>
          <Skeleton className={'edit-glossary-skeleton'}
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

export default EditGlossary;
