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
import Taro                 from '@tarojs/taro';
import {Tabbar, TabbarItem} from '@nutui/nutui-react-taro';

class BottomBar extends Component {
  constructor(props) {
    super(props);
    const {visible}   = this.props;
    this.state        = {
      visible: visible,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(active) {
    if (active === 0) {
      Taro.redirectTo({
        url: 'pages/today/today',
      }).catch(r => console.log(r));
    } else if (active === 1) {
      Taro.redirectTo({
        url: 'pages/glossary/glossary',
      }).catch(r => console.log(r));
    } else if (active === 2) {
      Taro.redirectTo({
        url: 'pages/my/my',
      }).catch(r => console.log(r));
    }
    this.setState({
      visible: active,
    });
  }

  render() {
    return (
      <>
        <Tabbar
          bottom={true}
          visible={this.state.visible}
          onSwitch={(
            child,
            active,
          ) => this.handleChange(active)}
        >
          <TabbarItem icon={'home'} tabTitle={'今日'}/>
          <TabbarItem icon={'category'} tabTitle={'词汇书'}/>
          <TabbarItem icon={'my'} tabTitle={'我'}/>
        </Tabbar>
      </>
    );
  }
}

export {BottomBar};
