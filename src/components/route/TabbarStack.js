import React from 'react';
import {
    Image,
    StyleSheet
} from 'react-native';
import { TabNavigator, TabBarBottom } from 'react-navigation';
import Home from '../home/Home';
import Stack from '../route/Stack';

const home='../../assets/images/icon/home.png';
const search='../../assets/images/icon/search.png';
const contact='../../assets/images/icon/contact.png';
const cart='../../assets/images/icon/cart.png';

const TabbarStack=TabNavigator({
    Home:{
        screen:Stack,
        navigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, tintColor }) => {
                return <Image style={styles.icon} source={require(home)} />
            },
        }),
    },
    Search:{
        screen:Home,
        navigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, tintColor }) => {
                return <Image style={styles.icon} source={require(search)} />
            },
        }),
    },
    Cart:{
        screen:Home,
        navigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, tintColor }) => {
                return <Image style={styles.icon} source={require(cart)} />
            },
        }),
    },
    detail:{
        screen:Home,
        navigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, tintColor }) => {
                return <Image style={styles.icon} source={require(contact)} />
            },
        }),
    }
},{
    tabBarComponent: TabBarBottom,
    tabBarPosition:'bottom',
    swipeEnabled:true,
    animationEnabled:true,
    tabBarOptions:{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray'
    }
})
var styles=StyleSheet.create({
    icon:{
        width:20,
        height:20
    }
})
export default TabbarStack;