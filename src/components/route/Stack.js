import { StackNavigator } from 'react-navigation';
import Home from '../home/Home';
import ProductDetail from '../product/ProductDetail';
import Cart from '../cart/Cart';
import Search from '../search/Search';
import UserDetail from '../user_detail/UserDetail';
import Order from '../order/Order';
import OrderDetail from '../order/OrderDetail';
import New from '../new_product/New';
// import BackIcon from '../particle/BackIcon';

const Stack=StackNavigator({
    HomeScreen:{
        screen: Home,
        navigationOptions:{
            header: null 
        }
    },
    DetailProdouctScreen:{
        screen: ProductDetail,
        navigationOptions:{
            title: 'Chi tiết sản phẩm',
            headerTintColor: 'white',
            headerTitleStyle: {
                color: 'white'
            },
            // headerLeft: ()=><BackIcon />,
            headerStyle :{
                backgroundColor: '#00b359'
            },
            tabBarVisible: false
        }
    },
    CartScreen:{
        screen: Cart,
        navigationOptions:{
            header: null 
        }
    },
    SearchScreen:{
        screen: Search,
        navigationOptions:{
            header: null 
        }
    },
    UserDetailScreen:{
        screen: UserDetail,
        navigationOptions:{
            header: null 
        }
    },
    OrderScreen:{
        screen: Order,
        navigationOptions:{
            title: 'Lịch sử đặt hàng',
            headerTintColor: 'white',
            headerTitleStyle: {
                color: 'white'
            },
            // headerLeft: ()=><BackIcon />,
            headerStyle :{
                backgroundColor: '#00b359'
            },
            tabBarVisible: false
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
            },
            tabBarVisible: false
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
            // headerLeft: ()=><BackIcon />,
            headerStyle :{
                backgroundColor: '#00b359'
            },
            tabBarVisible: false
        }
    }
},{
    initialRouteName: 'HomeScreen'
})
export default Stack;