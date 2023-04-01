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

import './glossaries.less';

import {Component} from 'react';
import {
  View,
}                  from '@tarojs/components';
import {
  Button,
  Col,
  Empty,
  Grid,
  GridItem,
  Row,
  SearchBar,
  Skeleton,
}                  from '@nutui/nutui-react-taro';
import {
  Cover,
}                  from '@/components/cover/cover';
import {
  getGlossaries,
}                  from '@/api/api';
import Taro        from '@tarojs/taro';

class Glossaries extends Component {
  constructor(props) {
    super(props);
    this.state = {
      glossaries:   [],
      searchString: '',
      searchResult: [],
      loading:      true,
    };
  }

  componentDidMount() {
    getGlossaries().then((res) => {
      const {searchString} = this.state;
      let glossaries       = [];

      if (!searchString) {
        glossaries = res.data;
      } else {
        for (let i = 0; i < res.data.length; i++) {
          if (res.data[i].name.includes(searchString)
              || res.data[i].description.includes(searchString)) {
            glossaries.push(res.data[i]);
          }
        }
      }

      this.setState({
        glossaries:   res.data,
        searchResult: glossaries,
        loading:      false,
      });
    });
  }

  searchGlossaries = (searchString) => {
    let glossaries = [];

    if (!searchString) {
      glossaries = this.state.glossaries;
    } else {
      for (let i = 0; i < this.state.glossaries.length; i++) {
        if (this.state.glossaries[i].name.includes(searchString)
            || this.state.glossaries[i].description.includes(searchString)) {
          glossaries.push(this.state.glossaries[i]);
        }
      }
    }

    this.setState({
      searchString: searchString,
      searchResult: glossaries,
      loading:      false,
    });
  };

  render() {
    const {
            searchString,
            searchResult,
            loading,
          } = this.state;

    if (!loading) {
      const addButton = (
        <Button className={'glossaries-add-button'}
                plain={true}
                type={'success'}
                size={'small'}
                icon={'plus'}
                onClick={() => {
                  Taro.navigateTo({
                    url: '/pages/add-glossary/add-glossary',
                  }).catch((err) => {
                    console.log(err);
                  });
                }}
        />
      );

      const refreshButton = (
        <Button className={'glossaries-refresh-button'}
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
        <SearchBar className={'glossaries-search-bar'}
                   shape={'round'}
                   placeholder={'请输入书名'}
                   value={searchString}
                   actionText={'搜索'}
                   clearIconSize={'1em'}
                   onSearch={(value) => {
                     if (value !== undefined && value !== null && value
                         !== '') {
                       this.setState({
                         loading: true,
                       });
                       this.searchGlossaries(value);
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

      const glossaryElements = searchResult.map((
        glossary,
        index,
      ) => {
        return (
          <GridItem
            key={index}
            text={
              <Cover
                title={glossary.description}
                coverText={glossary.name}
              />
            }
          />
        );
      });

      let grid = (
        <Grid
          key={searchString}
          columnNum={2}
          border={false}
          center={false}
        >{glossaryElements}
        </Grid>
      );

      if (glossaryElements.length === 0) {
        grid = (
          <Empty
            key={searchString}
            image={'empty'}
            description={'无数据'}
          />
        );
      }

      return (
        <View className={'glossaries-index'}>
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

          {grid}
        </View>
      );
    } else {
      return (
        <View className={'glossaries-index'}>
          <Skeleton className={'glossaries-skeleton'}
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

export default Glossaries;
