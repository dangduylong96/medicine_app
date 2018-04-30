import React, { Component } from 'react';
import {
    Dimensions
} from 'react-native';
import { DrawerNavigator, StackNavigator } from 'react-navigation';
import singleStack from './SingleStack';
import RouteStack from './RouteStack';
import Menu from '../menu/Menu';

var { height, width } = Dimensions.get('window');

// const DrawerStack = DrawerNavigator({
//     loginScreen:{
//         screen: Login
//     }
// }, {
//     initialRouteName: 'loginScreen',
//     drawWidth: width / 2,
//     drawPosition: 'left',
//     useNativeAnimations: true,
//     contentComponent: props => <Menu {...props} />
// })

// const DrawerNavigation = StackNavigator({
//     DrawerStack: { screen: DrawerStack }
// },{
//     headerMode: 'none',
//     navigationOptions:{
//         headerVisible: false
//     }
// })

const PrimaryNav = StackNavigator({
    singleStack:{ 
        screen: singleStack
    }
},{
    headerMode: 'none',
    navigationOptions:{
        headerVisible: false
    }
})
export default PrimaryNav;