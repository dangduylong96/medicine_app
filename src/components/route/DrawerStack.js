import React from 'react';
import { DrawerNavigator } from 'react-navigation';
import {
    Dimensions
} from 'react-native';
import TabbarStack from './TabbarStack';
import singleStack from './SingleStack';
import Menu from '../menu/Menu';

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