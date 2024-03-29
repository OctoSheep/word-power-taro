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

import './glossary-detail.less';

import {Component} from 'react';
import {
  deleteGlossary,
  getGlossary,
  getWords,
}                  from '@/api/api';
import {
  Image,
  View,
}                  from '@tarojs/components';
import {
  Word,
}                  from '@/components/word/word';
import {
  getCurrentInstance,
}                  from '@tarojs/runtime';
import {
  Button,
  Col,
  Dialog,
  Empty,
  Pagination,
  Row,
  SearchBar,
  Skeleton,
}                  from '@nutui/nutui-react-taro';
import Taro        from '@tarojs/taro';

const ITEMS_PER_PAGE = 20;

const prev_arrow_url = require('@/assets/images/navigate_before_FILL0_wght500_GRAD-25_opsz48.svg');
const next_arrow_url = require('@/assets/images/navigate_next_FILL0_wght500_GRAD-25_opsz48.svg');

class GlossaryDetail extends Component {
  routerParams = getCurrentInstance().router.params;

  constructor(props) {
    super(props);
    this.state = {
      glossaryName:        this.routerParams.glossaryName,
      glossaryDescription: '',
      wordIds:             [],
      searchString:        '',
      currentPage:         1,
      deleteDialogVisible: false,
      userData:            {},
      loading:             true,
    };
  }

  componentDidMount() {
    Taro.getStorage({
      key: 'userData',
    }).then((res) => {
      this.setState({
        userData: res.data,
      });
    }).catch((err) => {
      console.log(err);
    });

    const {glossaryName} = this.state;

    getGlossary(glossaryName).then((res) => {
      // noinspection JSUnresolvedVariable
      this.setState({
        wordIds:             res.data.vocabularies,
        glossaryDescription: res.data.description,
        loading:             false,
      });
      Taro.setNavigationBarTitle({
        title: res.data.description,
      }).catch((err) => {
        console.log(err);
      });
    }).then(() => {
      this.searchWords(this.state.searchString).catch((err) => {
        console.log(err);
      });
    });
  }

  searchWords(searchString) {
    const {glossaryName} = this.state;
    return new Promise(() => {
      getWords(
        glossaryName,
        searchString,
      ).then((res) => {
        const wordIds = res.data.map((word) => word._id);
        this.setState({
          wordIds:      wordIds,
          searchString: searchString,
          currentPage:  1,
          loading:      false,
        });
      }).catch(() => {
        this.setState({
          wordIds:      [],
          searchString: searchString,
          currentPage:  1,
          loading:      false,
        });
      });
    });
  }

  deleteGlossary() {
    deleteGlossary(this.state.glossaryName).then(() => {
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
  }

  handlePageChange(page) {
    this.setState({
      currentPage: page,
    });
  }

  render() {
    const {
            glossaryName,
            glossaryDescription,
            wordIds,
            searchString,
            currentPage,
            deleteDialogVisible,
            userData,
            loading,
          } = this.state;

    const addButton = (
      <Button className={'glossary-add-button'}
              plain={true}
              type={'success'}
              size={'small'}
              icon={'plus'}
              onClick={() => {
                Taro.navigateTo({
                  url: `/pages/add-word/add-word?glossaryName=${glossaryName}`,
                }).catch((err) => {
                  console.log(err);
                });
              }}
      />
    );

    const refreshButton = (
      <Button className={'glossary-refresh-button'}
              plain={true}
              type={'info'}
              size={'small'}
              icon={'refresh2'}
              onClick={() => {
                this.setState({
                  loading: true,
                });
                this.componentDidMount();
              }}
      />
    );

    const searchBar = (
      <SearchBar className={'glossary-search-bar'}
                 shape={'round'}
                 placeholder={'请输入词汇'}
                 value={searchString}
                 actionText={'搜索'}
                 clearIconSize={'1em'}
                 onSearch={(value) => {
                   if (value !== undefined && value !== null && value
                       !== '') {
                     this.setState({
                       loading: true,
                     });
                     this.searchWords(value).catch((err) => {
                       console.log(err);
                     });
                   } else {
                     Taro.showToast({
                       icon:  'error',
                       title: '搜索内容为空',
                     }).catch((err) => {
                       console.log(err);
                     });
                   }
                 }}
                 onClear={() => {
                   this.setState({
                     searchString: '',
                     loading:      true,
                   });
                   this.componentDidMount();
                 }}
      />
    );

    let topRow = (
      <Row>
        <Col span={1}/>
        <Col span={2}>
          {refreshButton}
        </Col>
        <Col span={21}>
          {searchBar}
        </Col>
      </Row>
    );

    // noinspection JSUnresolvedReference
    if (userData.admin) {
      topRow = (
        <Row>
          <Col span={1}/>
          <Col span={2}>
            {addButton}
          </Col>
          <Col span={1}/>
          <Col span={2}>
            {refreshButton}
          </Col>
          <Col span={18}>
            {searchBar}
          </Col>
        </Row>
      );
    }

    if (!loading) {
      const totalWords = wordIds.length;
      const newWordIds = wordIds.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE,
      );

      const editButton = (
        <Button className={'glossary-edit-button'}
                type={'info'}
                icon={'edit'}
                onClick={() => {
                  Taro.navigateTo({
                    url: `/pages/edit-glossary/edit-glossary?glossaryName=${glossaryName}`,
                  }).catch((err) => {
                    console.log(err);
                  });
                }}
        >编辑
        </Button>
      );

      const deleteDialog = (
        <Dialog
          title={`确认删除${glossaryDescription}？`}
          visible={deleteDialogVisible}
          onOk={() => {
            this.setState({
              deleteDialogVisible: false,
            });
            this.deleteGlossary();
          }}
          onCancel={() => {
            this.setState({
              deleteDialogVisible: false,
            });
          }}
        >删除后将无法恢复
        </Dialog>
      );

      const deleteButton = (
        <Button className={'glossary-delete-button'}
                type={'danger'}
                icon={'del'}
                onClick={() => {
                  this.setState({
                    deleteDialogVisible: true,
                  });
                }}
        >删除
        </Button>
      );

      const wordElements = newWordIds.map((
        wordId,
        index,
      ) => {
        return (
          <Word
            glossaryName={glossaryName}
            id={wordId}
            key={index}
          />
        );
      });

      let view = (
        <View>
          {wordElements}
        </View>
      );

      if (wordElements.length === 0) {
        view = (
          <Empty
            image={'empty'}
            description={'无数据'}
          />
        );
      }

      let pagination = null;

      if (totalWords > ITEMS_PER_PAGE) {
        pagination = (
          <Pagination className={'glossary-pagination'}
                      key={`totalWords_${totalWords}`}
                      modelValue={currentPage}
                      totalItems={totalWords}
                      showPageSize={5}
                      itemsPerPage={ITEMS_PER_PAGE}
                      prevText={
                        <Image className={'glossary-pagination-arrow'}
                               src={prev_arrow_url}
                               svg={true}
                        />
                      }
                      nextText={
                        <Image className={'glossary-pagination-arrow'}
                               src={next_arrow_url}
                               svg={true}
                        />
                      }
                      onChange={(page) => {
                        this.handlePageChange(page);
                      }}
          />
        );
      }

      let bottomRow = null;

      // noinspection JSUnresolvedReference
      if (userData.admin) {
        bottomRow = (
          <Row className={'glossary-bottom-row'}
               type={'flex'}
               justify={'space-around'}
          >
            <Col span={10}>
              {editButton}
            </Col>
            <Col span={10}>
              {deleteButton}
            </Col>
          </Row>
        );
      }

      return (
        <View className={'glossary-index'}>
          {topRow}

          <View className={'glossary-word'}
                key={`${currentPage}_${searchString}`}
          >{view}
          </View>

          {deleteDialog}
          {pagination}
          {bottomRow}
        </View>
      );
    } else {
      return (
        <View className={'glossary-index'}>
          {topRow}

          <Row>
            <Skeleton className={'glossary-skeleton'}
                      width={'300px'}
                      height={'15px'}
                      animated={true}
                      row={3}
            />
          </Row>
        </View>
      );
    }
  }

}

export default GlossaryDetail;
