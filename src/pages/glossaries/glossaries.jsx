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

import {Component}                        from 'react';
import {View}                             from '@tarojs/components';
import {Button, Grid, GridItem, Skeleton} from '@nutui/nutui-react-taro';
import {Cover}                            from '@/components/cover/cover';
import {getGlossaries}                    from '@/api/api';

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
      const glossaryElements = glossaries.map((
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

      return (
        <View className={'glossaries-index'}>
          <Grid
            columnNum={2}
            border={false}
            center={false}
          >{glossaryElements}
          </Grid>
          <Button className={'glossaries-refresh-button'}
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
