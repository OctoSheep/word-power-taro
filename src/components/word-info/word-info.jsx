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

import './word-info.less';

import {Component}              from 'react';
import Taro                     from '@tarojs/taro';
import {
  View,
}                               from '@tarojs/components';
import {
  Button,
  Col,
  Dialog,
  Icon,
  Input,
  InputNumber,
  Row,
}                               from '@nutui/nutui-react-taro';
import {createWord, deleteWord} from '@/api/api';

class WordInfo extends Component {
  constructor(props) {
    super(props);
    const {
            glossaryName,
            pageType,
            id,
            index,
            word,
            phonetic_uk,
            phonetic_us,
            translation,
          }    = this.props;
    this.state = {
      glossaryName:        glossaryName,
      pageType:            pageType,
      id:                  id || '',
      index:               index || '',
      word:                word || '',
      phonetic_uk:         phonetic_uk || '',
      phonetic_us:         phonetic_us || '',
      translation:         translation || [
        {
          'part_of_speech': '',
          'definition':     '',
        },
      ],
      buttonDisabled:      true,
      deleteDialogVisible: false,
    };
  }

  changeTransCount = (value) => {
    const {
            index,
            word,
            phonetic_uk,
            phonetic_us,
            translation,
          }      = this.state;
    const length = translation.length;

    if (value > length) {
      for (let i = 0; i < value - length; i++) {
        translation.push({
          'part_of_speech': '',
          'definition':     '',
        });
      }
    } else {
      translation.splice(
        value,
        length - value,
      );
    }

    this.setState({
      translation,
    });

    let disabled = !index || !word || !phonetic_uk || !phonetic_us;
    for (let i = 0; i < value; i++) {
      if (!translation[i].part_of_speech || !translation[i].definition) {
        disabled = true;
        break;
      }
    }
    this.setState({
      buttonDisabled: disabled,
    });
  };

  setButtonStatus = (
    type,
    value,
  ) => {
    if (type === 'index') {
      this.setState({
        index: value,
      });
      const {
              word,
              phonetic_uk,
              phonetic_us,
              translation,
            }      = this.state;
      const length = translation.length;
      let disabled = !value || !word || !phonetic_uk || !phonetic_us;
      for (let i = 0; i < length; i++) {
        if (!translation[i].part_of_speech || !translation[i].definition) {
          disabled = true;
          break;
        }
      }
      this.setState({
        buttonDisabled: disabled,
      });
    } else if (type === 'word') {
      this.setState({
        word: value,
      });
      const {
              index,
              phonetic_uk,
              phonetic_us,
              translation,
            }      = this.state;
      const length = translation.length;
      let disabled = !index || !value || !phonetic_uk || !phonetic_us;
      for (let i = 0; i < length; i++) {
        if (!translation[i].part_of_speech || !translation[i].definition) {
          disabled = true;
          break;
        }
      }
      this.setState({
        buttonDisabled: disabled,
      });
    } else if (type === 'phonetic_uk') {
      this.setState({
        phonetic_uk: value,
      });
      const {
              index,
              word,
              phonetic_us,
              translation,
            }      = this.state;
      const length = translation.length;
      let disabled = !index || !word || !value || !phonetic_us;
      for (let i = 0; i < length; i++) {
        if (!translation[i].part_of_speech || !translation[i].definition) {
          disabled = true;
          break;
        }
      }
      this.setState({
        buttonDisabled: disabled,
      });
    } else if (type === 'phonetic_us') {
      this.setState({
        phonetic_us: value,
      });
      const {
              index,
              word,
              phonetic_uk,
              translation,
            }      = this.state;
      const length = translation.length;
      let disabled = !index || !word || !phonetic_uk || !value;
      for (let i = 0; i < length; i++) {
        if (!translation[i].part_of_speech || !translation[i].definition) {
          disabled = true;
          break;
        }
      }
      this.setState({
        buttonDisabled: disabled,
      });
    } else if (type === 'translation') {
      this.setState({
        translation: value,
      });
      const {
              index,
              word,
              phonetic_uk,
              phonetic_us,
            }      = this.state;
      const length = value.length;
      let disabled = !index || !word || !phonetic_uk || !phonetic_us;
      for (let i = 0; i < length; i++) {
        if (!value[i].part_of_speech || !value[i].definition) {
          disabled = true;
          break;
        }
      }
      this.setState({
        buttonDisabled: disabled,
      });
    }
  };

  createWord = () => {
    const {
            glossaryName,
            index,
            word,
            phonetic_uk,
            phonetic_us,
            translation,
          } = this.state;

    createWord(
      glossaryName,
      Number(index),
      word,
      phonetic_uk,
      phonetic_us,
      translation,
    ).then(() => {
      Taro.showToast({
        icon:  'success',
        title: '创建成功',
      }).catch((err) => {
        console.log(err);
      });
      this.setState({
        index:       '',
        word:        '',
        phonetic_uk: '',
        phonetic_us: '',
        translation: [
          {
            'part_of_speech': '',
            'definition':     '',
          },
        ],
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

  deleteWord = () => {
    const {
            glossaryName,
            id,
          } = this.state;

    deleteWord(
      glossaryName,
      id,
    ).then(() => {
      Taro.showToast({
        icon:  'success',
        title: '删除成功',
      }).then(() => {
        Taro.navigateBack().catch((err) => {
          console.log(err);
        });
      }).catch((err) => {
        console.log(err);
      });
    }).catch(() => {
      Taro.showToast({
        icon:  'error',
        title: '删除失败',
      }).catch((err) => {
        console.log(err);
      });
    });
  };

  render() {
    const {
            pageType,
            index,
            word,
            phonetic_uk,
            phonetic_us,
            translation,
            buttonDisabled,
            deleteDialogVisible,
          } = this.state;

    const clearable = pageType === 'add';
    const required  = pageType === 'add';
    const readonly  = pageType === 'show';

    const innerAudioContext    = Taro.createInnerAudioContext();
    innerAudioContext.autoplay = false;

    const translationElements = translation.map((
      trans,
      index,
    ) => {
      return (
        <View
          key={index}
        ><Row>
          <Input
            label={`词性${index + 1}`}
            placeholder={`请输入词性${index + 1}`}
            defaultValue={trans.part_of_speech}
            clearable={clearable}
            required={required}
            readonly={readonly}
            border={false}
            onChange={(value) => {
              translation[index].part_of_speech = value;
              this.setButtonStatus(
                'translation',
                translation,
              );
            }}
            onClear={() => {
              translation[index].part_of_speech = '';
              this.setButtonStatus(
                'translation',
                translation,
              );
            }}
          />
        </Row>
          <Row>
            <Input
              label={`释义${index + 1}`}
              placeholder={`请输入释义${index + 1}`}
              defaultValue={trans.definition}
              clearable={clearable}
              required={required}
              readonly={readonly}
              onChange={(value) => {
                translation[index].definition = value;
                this.setButtonStatus(
                  'translation',
                  translation,
                );
              }}
              onClear={() => {
                translation[index].definition = '';
                this.setButtonStatus(
                  'translation',
                  translation,
                );
              }}
            />
          </Row>
        </View>
      );
    });

    const deleteDialog = (
      <Dialog
        title={`确认删除 ${word}？`}
        visible={deleteDialogVisible}
        onOk={() => {
          this.setState({
            deleteDialogVisible: false,
          });
          this.deleteWord();
        }}
        onCancel={() => {
          this.setState({
            deleteDialogVisible: false,
          });
        }}
      >删除后将无法恢复
      </Dialog>
    );

    let uk_button  = null;
    let us_button  = null;
    let transCount = null;
    let submitRow  = null;

    if (pageType === 'add') {
      transCount = (
        <Row>
          <Input
            label={'释义数量'}
            labelWidth={300}
            slotInput={
              <InputNumber
                modelValue={translation.length}
                max={9}
                onChangeFuc={(value) => {
                  this.changeTransCount(
                    Number(value),
                  );
                }}
              />
            }
          />
        </Row>
      );

      submitRow = (
        <Row>
          <Button
            key={buttonDisabled}
            type={'primary'}
            block={true}
            disabled={buttonDisabled}
            onClick={() => {
              this.createWord();
            }}
          >添加
          </Button>
        </Row>
      );
    } else if (pageType === 'show') {
      uk_button = (
        <Button
          type={'info'}
          size={'small'}
          onClick={() => {
            innerAudioContext.src
              = `https://dict.youdao.com/dictvoice?audio=${word}&type=1`;
            innerAudioContext.play();
          }}
        ><Icon
          name={'voice'}
          size={'1em'}
        />
        </Button>
      );

      us_button = (
        <Button
          type={'info'}
          size={'small'}
          onClick={() => {
            innerAudioContext.src
              = `https://dict.youdao.com/dictvoice?audio=${word}&type=2`;
            innerAudioContext.play();
          }}
        ><Icon
          name={'voice'}
          size={'1em'}
        />
        </Button>
      );

      submitRow = (
        <Row
          type={'flex'}
          justify={'space-around'}
        >
          <Col span={10}>
            <Button className={'glossary-edit-button'}
                    type={'info'}
                    icon={'edit'}
                    onClick={() => {
                      console.log('Edit.');
                    }}
            >编辑词汇
            </Button>
          </Col>
          <Col span={10}>
            <Button className={'glossary-delete-button'}
                    type={'danger'}
                    icon={'del'}
                    onClick={() => {
                      this.setState({
                        deleteDialogVisible: true,
                      });
                    }}
            >删除词汇
            </Button>
          </Col>
        </Row>
      );
    } else if (pageType === 'edit') {
      submitRow = (
        <Row>
          <Button
            key={buttonDisabled}
            type={'primary'}
            block={true}
            disabled={buttonDisabled}
            onClick={() => {
              console.log('Edit.');
            }}
          >修改
          </Button>
        </Row>
      );
    }

    return (
      <View className='word-info-index'>
        <Row>
          <Input
            type={'digit'}
            label={'序号'}
            placeholder={'请输入序号'}
            defaultValue={index}
            clearable={clearable}
            required={required}
            readonly={readonly}
            formatter={(value) => {
              return value !== '' ? Number(value).toString() : '';
            }}
            formatTrigger={'onBlur'}
            onChange={(value) => {
              this.setButtonStatus(
                'index',
                value,
              );
            }}
            onClear={() => {
              this.setButtonStatus(
                'index',
                '',
              );
            }}
          />
        </Row>

        <Row>
          <Input
            label={'词汇'}
            placeholder={'请输入词汇'}
            defaultValue={word}
            clearable={clearable}
            required={required}
            readonly={readonly}
            onChange={(value) => {
              this.setButtonStatus(
                'word',
                value,
              );
            }}
            onClear={() => {
              this.setButtonStatus(
                'word',
                '',
              );
            }}
          />
        </Row>

        <Row>
          <Input
            label={'英式音标'}
            placeholder={'请输入英式音标'}
            defaultValue={phonetic_uk}
            clearable={clearable}
            required={required}
            readonly={readonly}
            slotButton={uk_button}
            onChange={(value) => {
              this.setButtonStatus(
                'phonetic_uk',
                value,
              );
            }}
            onClear={() => {
              this.setButtonStatus(
                'phonetic_uk',
                '',
              );
            }}
          />
        </Row>

        <Row>
          <Input
            label={'美式音标'}
            placeholder={'请输入美式音标'}
            defaultValue={phonetic_us}
            clearable={clearable}
            required={required}
            readonly={readonly}
            slotButton={us_button}
            onChange={(value) => {
              this.setButtonStatus(
                'phonetic_us',
                value,
              );
            }}
            onClear={() => {
              this.setButtonStatus(
                'phonetic_us',
                '',
              );
            }}
          />
        </Row>

        {transCount}
        {translationElements}
        {deleteDialog}
        {submitRow}
      </View>
    );
  }
}

export {WordInfo};
