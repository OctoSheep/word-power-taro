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

import {Component, useState}                         from 'react';
import {View}                                        from '@tarojs/components';
import {HomeRounded, MenuBookRounded, PersonRounded} from '@mui/icons-material';
import {BottomNavigation, BottomNavigationAction}    from '@mui/material';
import Taro                                          from '@tarojs/taro';
import {Sheet}                                       from '@mui/joy';

class Today extends Component {
  render() {
    const [value, setValue] = useState('today');

    return (
      <View>
        <Sheet sx={{
          position: 'fixed',
          bottom:   0,
          left:     0,
          right:    0,
        }} elevation={3}>
          <BottomNavigation
            value={value}
            onChange={(
              event,
              newValue,
            ) => {
              if (newValue === 'glossary') {
                Taro.redirectTo(
                  {url: '/pages/glossary/glossary'},
                ).then(r => console.log(r));
              }
              setValue(newValue);
            }}
          >
            <BottomNavigationAction
              label={'今日'}
              value={'today'}
              icon={<HomeRounded/>}
            />
            <BottomNavigationAction
              label={'词汇书'}
              value={'glossary'}
              icon={<MenuBookRounded/>}
            />
            <BottomNavigationAction
              label={'我'}
              value={'me'}
              icon={<PersonRounded/>}
            />
          </BottomNavigation>
        </Sheet>
      </View>
    );
  }
}

export default Today;
