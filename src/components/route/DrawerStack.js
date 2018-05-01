import React from 'react';
import { DrawerNavigator } from 'react-navigation';
import {
    Dimensions
} from 'react-native';
import TabbarStack from './TabbarStack';
import Menu from '../menu/Menu';
import Home from '../home/Home';

var { height, width } = Dimensions.get('window');
const DrawerStack=DrawerNavigator({
    TabbarDrawer:{
        screen: TabbarStack
    }
},{
    drawerWidth:width/2,
    drawerPosition:'left',
    contentComponent: props=> <Menu {...props} />
})
export default DrawerStack;