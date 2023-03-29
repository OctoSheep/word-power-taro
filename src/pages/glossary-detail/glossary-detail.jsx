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

import {Component}                    from 'react';
import {getGlossary}                  from '@/api/api';
import {Image, View}                  from '@tarojs/components';
import {Word}                         from '@/components/word/word';
import {getCurrentInstance}           from '@tarojs/runtime';
import {Button, Pagination, Skeleton} from '@nutui/nutui-react-taro';
import Taro                           from '@tarojs/taro';

const ITEMS_PER_PAGE = 50;

const prev_arrow_url = require('@/assets/images/navigate_before_FILL0_wght500_GRAD-25_opsz48.svg');
const next_arrow_url = require('@/assets/images/navigate_next_FILL0_wght500_GRAD-25_opsz48.svg');

class GlossaryDetail extends Component {
  routerParams = getCurrentInstance().router.params;

  constructor(props) {
    super(props);
    this.state = {
      glossaryName: this.routerParams.glossaryName,
      wordIds:      [],
      currentPage:  1,
      loading:      true,
    };
  }

  componentDidMount() {
    const {glossaryName} = this.state;
    getGlossary(glossaryName).then((res) => {
      // noinspection JSUnresolvedVariable
      this.setState({
        wordIds: res.data.vocabularies,
        loading: false,
      });
    });
    Taro.setNavigationBarTitle({
      title: decodeURIComponent(this.routerParams.glossaryDescription.toString()),
    }).catch((err) => {
      console.log(err);
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
            wordIds,
            currentPage,
            loading,
          } = this.state;

    if (!loading) {
      const totalWords = wordIds.length;
      const newWordIds = wordIds.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE,
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

      const pagination = (
        <Pagination className={'glossary-pagination'}
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

      return (
        <View className={'glossary-index'}>
          {pagination}
          <View className={'glossary-word'}
                key={currentPage}
          >
            {wordElements}
          </View>
          {pagination}
          <Button className={'glossary-refresh-button'}
                  plain={true}
                  type='info'
                  onClick={() => {
                    this.setState({
                      loading: true,
                    });
                    this.componentDidMount();
                  }}
          >刷新
          </Button>
        </View>
      );
    } else {
      return (
        <View className={'glossary-index'}>
          <Skeleton className={'glossary-skeleton'}
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

export default GlossaryDetail;
