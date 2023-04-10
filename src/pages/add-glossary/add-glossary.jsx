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

import './add-glossary.less';

import {Component}                  from 'react';
import {createGlossary}             from '@/api/api';
import {View}                       from '@tarojs/components';
import {Button, Input, Row, Switch} from '@nutui/nutui-react-taro';
import Taro                         from '@tarojs/taro';

class AddGlossary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      glossaryName:        '',
      glossaryDescription: '',
      glossaryUrl:         '',
      glossaryToken:       '',
      showUrlInput:        false,
      buttonDisabled:      true,
    };
  }

  setButtonStatus = (
    type,
    value,
  ) => {
    if (type === 'description') {
      this.setState({
        glossaryDescription: value,
      });
      const {
              glossaryName,
              glossaryUrl,
              glossaryToken,
              showUrlInput,
            } = this.state;
      if (showUrlInput) {
        if (value && glossaryName && glossaryUrl && glossaryToken) {
          this.setState({
            buttonDisabled: false,
          });
        } else {
          this.setState({
            buttonDisabled: true,
          });
        }
      } else {
        if (value && glossaryName) {
          this.setState({
            buttonDisabled: false,
          });
        } else {
          this.setState({
            buttonDisabled: true,
          });
        }
      }
    }

    if (type === 'name') {
      this.setState({
        glossaryName: value,
      });
      const {
              glossaryDescription,
              glossaryUrl,
              glossaryToken,
              showUrlInput,
            } = this.state;
      if (showUrlInput) {
        if (value && glossaryUrl && glossaryToken && glossaryDescription) {
          this.setState({
            buttonDisabled: false,
          });
        } else {
          this.setState({
            buttonDisabled: true,
          });
        }
      } else {
        if (value && glossaryDescription) {
          this.setState({
            buttonDisabled: false,
          });
        } else {
          this.setState({
            buttonDisabled: true,
          });
        }
      }
    }

    if (type === 'url') {
      this.setState({
        glossaryUrl: value,
      });
      const {
              glossaryName,
              glossaryDescription,
              glossaryToken,
            } = this.state;
      if (value && glossaryName && glossaryToken && glossaryDescription) {
        this.setState({
          buttonDisabled: false,
        });
      } else {
        this.setState({
          buttonDisabled: true,
        });
      }
    }

    if (type === 'token') {
      this.setState({
        glossaryToken: value,
      });
      const {
              glossaryName,
              glossaryDescription,
              glossaryUrl,
            } = this.state;
      if (value && glossaryName && glossaryUrl && glossaryDescription) {
        this.setState({
          buttonDisabled: false,
        });
      } else {
        this.setState({
          buttonDisabled: true,
        });
      }
    }

    if (type === 'switch') {
      this.setState({
        showUrlInput: value,
      });
      const {
              glossaryName,
              glossaryDescription,
              glossaryUrl,
              glossaryToken,
            } = this.state;
      if (value) {
        if (glossaryName && glossaryDescription && glossaryUrl
            && glossaryToken) {
          this.setState({
            buttonDisabled: false,
          });
        } else {
          this.setState({
            buttonDisabled: true,
          });
        }
      } else {
        this.setState({
          glossaryUrl:   '',
          glossaryToken: '',
        });
        if (glossaryName && glossaryDescription) {
          this.setState({
            buttonDisabled: false,
          });
        } else {
          this.setState({
            buttonDisabled: true,
          });
        }
      }
    }
  };

  createGlossary = () => {
    const {
            glossaryName,
            glossaryDescription,
            glossaryUrl,
            glossaryToken,
          } = this.state;

    createGlossary(
      glossaryName,
      glossaryDescription,
      glossaryUrl,
      glossaryToken,
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
  };

  render() {
    const {
            showUrlInput,
            buttonDisabled,
          } = this.state;

    let urlInput = (
      <Row/>
    );

    let tokenInput = (
      <Row/>
    );

    if (showUrlInput) {
      urlInput = (
        <Row>
          <Input
            type={'url'}
            label={'URL'}
            placeholder={'请输入JSON文件的URL'}
            clearable={true}
            required={true}
            onChange={(value) => {
              this.setButtonStatus(
                'url',
                value,
              );
            }}
            onClear={() => {
              this.setButtonStatus(
                'url',
                '',
              );
            }}
          />
        </Row>
      );

      tokenInput = (
        <Row>
          <Input
            label={'令牌'}
            placeholder={'请输入访问仓库的令牌'}
            clearable={true}
            required={true}
            onChange={(value) => {
              this.setButtonStatus(
                'token',
                value,
              );
            }}
            onClear={() => {
              this.setButtonStatus(
                'token',
                '',
              );
            }}
          />
        </Row>
      );
    }

    return (
      <View className={'add-glossary-index'}>
        <Row>
          <Input
            label={'书名'}
            placeholder={'请输入词汇书的名称'}
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
          <Input
            label={'从GitHub仓库导入'}
            labelWidth={300}
            slotInput={
              <Switch
                onChange={(value) => {
                  this.setButtonStatus(
                    'switch',
                    value,
                  );
                }}
              />
            }
          />
        </Row>

        {urlInput}
        {tokenInput}

        <Row>
          <Button
            key={buttonDisabled}
            type={'primary'}
            block={true}
            disabled={buttonDisabled}
            onClick={() => {
              this.createGlossary();
            }}
          >添加
          </Button>
        </Row>
      </View>
    );
  }
}

export default AddGlossary;
