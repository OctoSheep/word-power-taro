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

import {Cover} from '../../components/cover/cover';

import {Component, useState}                         from 'react';
import {Box, Grid, Sheet}                            from '@mui/joy';
import {HomeRounded, MenuBookRounded, PersonRounded} from '@mui/icons-material';
import {BottomNavigation, BottomNavigationAction}    from '@mui/material';
import Taro                                          from '@tarojs/taro';

class Glossary extends Component {
  render() {
    const [value, setValue] = useState('glossary');

    return (
      <Box sx={{
        pt: 1,
        pl: 1,
        pr: 1,
        pb: 7,
      }}>
        <Grid container>
          <Grid item xs={6}>
            <Cover title={'四级词汇'} coverText={'CET4'}/>
          </Grid>
          <Grid item xs={6}>
            <Cover title={'六级词汇'} coverText={'CET6'}/>
          </Grid>
          <Grid item xs={6}>
            <Cover title={'考研词汇'} coverText={'Yan'}/>
          </Grid>
          <Grid item xs={6}>
            <Cover title={'四级核心词汇'} coverText={'CET4 Core'}/>
          </Grid>
          <Grid item xs={6}>
            <Cover title={'六级核心词汇'} coverText={'CET6 Core'}/>
          </Grid>
          <Grid item xs={6}>
            <Cover title={'考研核心词汇'} coverText={'Yan Core'}/>
          </Grid>
          <Grid item xs={6}>
            <Cover xs={6} color={'#096148'}/>
          </Grid>
        </Grid>
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
              if (newValue === 'today') {
                Taro.redirectTo(
                  {url: '/pages/today/today'},
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
      </Box>
    );
  }
}

export default Glossary;
