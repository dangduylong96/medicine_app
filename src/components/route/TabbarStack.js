import React from 'react';
import {
    Image,
    StyleSheet
} from 'react-native';
import { TabNavigator, TabBarBottom } from 'react-navigation';
import Home from '../home/Home';
import Cart from '../cart/Cart';
import Search from '../search/Search';
import UserDetail from '../user_detail/UserDetail';
import Stack from '../route/Stack';

const home='../../assets/images/icon/home.png';
const search='../../assets/images/icon/search.png';
const contact='../../assets/images/icon/contact.png';
const cart='../../assets/images/icon/cart.png';

const TabbarStack=TabNavigator({
    Home:{
        screen: Stack,
        navigationOptions: ({ navigation }) => ({
            title: 'Trang Chủ',
            tabBarIcon: ({ focused, tintColor }) => {
                return <Image style={styles.icon} source={require(home)} />
            },
        }),
    },
    Search:{
        screen:Search,
        navigationOptions: ({ navigation }) => ({
            title: 'Tìm kiếm',
            tabBarIcon: ({ focused, tintColor }) => {
                return <Image style={styles.icon} source={require(search)} />
            },
        }),
    },
    Cart:{
        screen:Cart,
        navigationOptions: ({ navigation }) => ({
            title: 'Giỏ hàng',
            tabBarIcon: ({ focused, tintColor }) => {
                return <Image style={styles.icon} source={require(cart)} />
            },
            badgeNumber: 19
        }),
    },
    detail:{
        screen:UserDetail,
        navigationOptions: ({ navigation }) => ({
            title: 'Cá nhân',
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