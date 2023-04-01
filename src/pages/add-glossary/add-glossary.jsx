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

import {Component}      from 'react';
import {createGlossary} from '@/api/api';
import {View}           from '@tarojs/components';
import {Button, Input}  from '@nutui/nutui-react-taro';
import Taro             from '@tarojs/taro';

class AddGlossary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      glossaryName:            '',
      nameErrorMessage:        '',
      glossaryDescription:     '',
      descriptionErrorMessage: '',
    };
  }

  createGlossary = () => {
    const {
            glossaryName,
            glossaryDescription,
          } = this.state;

    if (glossaryName === '') {
      this.setState({
        nameErrorMessage: '词汇书名称不能为空',
      });
    } else {
      this.setState({
        nameErrorMessage: '',
      });
    }

    if (glossaryDescription === '') {
      this.setState({
        descriptionErrorMessage: '词汇书描述不能为空',
      });
    } else {
      this.setState({
        descriptionErrorMessage: '',
      });
    }

    if (glossaryName !== '' && glossaryDescription !== '') {
      createGlossary(
        glossaryName,
        glossaryDescription,
      ).then(() => {
        Taro.showToast({
          icon:  'success',
          title: '创建成功',
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
          title: '创建失败',
        }).catch((err) => {
          console.log(err);
        });
      });
    }
  };

  render() {
    const {
            nameErrorMessage,
            descriptionErrorMessage,
          } = this.state;

    return (
      <View className={'add-glossary-index'}>
        <Input
          name={'text'}
          label={'书名'}
          placeholder={'请输入词汇书的名称'}
          clearable={true}
          errorMessage={nameErrorMessage}
          required={true}
          onBlur={(value) => {
            this.setState({
              glossaryName: value,
            });
          }}
        />
        <Input
          name={'text'}
          label={'描述'}
          placeholder={'请输入词汇书的描述'}
          clearable={true}
          errorMessage={descriptionErrorMessage}
          required={true}
          onBlur={(value) => {
            this.setState({
              glossaryDescription: value,
            });
          }}
        />
        <Button
          type={'primary'}
          block={true}
          onClick={() => {
            this.createGlossary();
          }}
        >添加
        </Button>
      </View>
    );
  }
}

export default AddGlossary;
