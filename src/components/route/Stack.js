import { StackNavigator } from 'react-navigation';
import Home from '../home/Home';
import ProductDetail from '../product/ProductDetail';
import Cart from '../cart/Cart';
import Search from '../search/Search';
import UserDetail from '../user_detail/UserDetail';

const Stack=StackNavigator({
    HomeScreen:{
        screen: Home
    },
    DetailProdouctScreen:{
        screen: ProductDetail
    },
    CartScreen:{
        screen: Cart
        
    },
    SearchScreen:{
        screen: Search
    },
    UserDetailScreen:{
        screen: UserDetail
    }
},{
    initialRouteName: 'HomeScreen',
    headerMode: 'none',
    navigationOptions:{
        headerVisible: false
    }
})
export default Stack;