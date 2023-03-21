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

import {Component}          from 'react';
import {Tabbar, TabbarItem} from '@nutui/nutui-react-taro';
import {Text, View}         from '@tarojs/components';

import './today.less';

class Today extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View className='today-index'>
        <Text>今日</Text>
        <Tabbar bottom={true} visible={0}>
          <TabbarItem icon={'home'} tabTitle={'今日'}/>
          <TabbarItem icon={'category'} tabTitle={'词汇书'}
                      href={'../#/pages/glossary/glossary'}/>
          <TabbarItem icon={'my'} tabTitle={'我'}/>
        </Tabbar>
      </View>
    );
  }
}

export default Today;
