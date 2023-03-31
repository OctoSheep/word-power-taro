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

class Glossaries extends Component {
  constructor(props) {
    super(props);
    this.state = {
      glossaries: [],
      loading:    true,
    };
  }

  componentDidMount() {
    getGlossaries().then((res) => {
      this.setState({
        glossaries: res.data,
        loading:    false,
      });
    });
  }

  render() {
    const {
            glossaries,
            loading,
          } = this.state;

    if (!loading) {
      const addButton = (
        <Button className={'glossaries-add-button'}
                plain={true}
                type={'success'}
                size={'small'}
                icon={'plus'}
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
                   actionText={'搜索'}
                   onSearch={(value) => {
                     console.log(value);
                   }}
                   onClear={() => {
                     this.setState({
                       loading: true,
                     });
                     this.componentDidMount();
                   }}
        />
      );

      let glossaryElements = glossaries.map((
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

      if (glossaryElements.length === 0) {
        glossaryElements = (
          <Empty
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

          <Grid
            columnNum={2}
            border={false}
            center={false}
          >{glossaryElements}
          </Grid>
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
