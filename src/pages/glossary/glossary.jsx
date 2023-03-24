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

import './glossary.less';

import {Component}      from 'react';
import {View}           from '@tarojs/components';
import {Grid, GridItem} from '@nutui/nutui-react-taro';
import {Cover}          from '@/components/cover/cover';
import {BottomBar}      from '@/components/bottomBar/bottomBar';

class Glossary extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View className={'glossary-index'}>
        <Grid className={'glossary-grid'} columnNum={2} border={false}
              center={false}>
          <GridItem
            text={
              <Cover title={'四级词汇'} coverText={'CET4'}/>
            }
          />
          <GridItem
            text={
              <Cover title={'六级词汇'} coverText={'CET6'}/>
            }
          />
          <GridItem
            text={
              <Cover title={'考研词汇'} coverText={'Yan'}/>
            }
          />
          <GridItem
            text={
              <Cover title={'四级核心词汇'} coverText={'CET4 Core'}/>
            }
          />
          <GridItem
            text={
              <Cover title={'六级核心词汇'} coverText={'CET6 Core'}/>
            }
          />
          <GridItem
            text={
              <Cover title={'考研核心词汇'} coverText={'Yan Core'}/>
            }
          />
          <GridItem
            text={
              <Cover color={'#096148'}/>
            }
          />
        </Grid>
        <BottomBar visible={1}/>
      </View>
    );
  }
}

export default Glossary;
