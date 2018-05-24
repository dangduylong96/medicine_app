import React from 'react';
import { StackNavigator } from 'react-navigation';
import Login from '../login/Login';
import Register from '../login/Register';
import Order from '../order/Order';
import OrderDetail from '../order/OrderDetail';
import New from '../new_product/New';
import BackIcon from '../particle/BackIcon';

const singleStack=StackNavigator({
    loginscreen:{
        screen:Login
    },
    Registerscreen:{
        screen:Register
    },
    OrderScreen:{
        screen: Order,
        navigationOptions:{
            title: 'Lịch sử đặt hàng',
            headerTintColor: 'white',
            headerTitleStyle: {
                color: 'white'
            },
            headerLeft: ()=><BackIcon />,
            headerStyle :{
                backgroundColor: '#00b359'
            }
        }
    },
    OrderDetailScreen:{
        screen: OrderDetail,
        navigationOptions:{
            title: 'Chi tiết đơn hàng',
            headerTintColor: 'white',
            headerTitleStyle: {
                color: 'white'
            },
            headerStyle :{
                backgroundColor: '#00b359'
            }
        }
    },
    NewProductScreen:{
        screen: New,
        navigationOptions:{
            title: 'Sản phẩm mới',
            headerTintColor: 'white',
            headerTitleStyle: {
                color: 'white'
            },
            headerLeft: ()=><BackIcon />,
            headerStyle :{
                backgroundColor: '#00b359'
            }
        }
    },
},{
    initialRouteName:'loginscreen'
})
export default singleStack;