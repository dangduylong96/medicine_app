import { StackNavigator } from 'react-navigation';
import Home from '../home/Home';
import ProductDetail from '../product/ProductDetail';
import Cart from '../cart/Cart';

const Stack=StackNavigator({
    HomeScreen:{
        screen: Home
    },
    DetailProdouctScreen:{
        screen: ProductDetail
    },
    CartScreen:{
        screen: Cart
    }
},{
    initialRouteName: 'CartScreen',
    headerMode: 'none',
    navigationOptions:{
        headerVisible: false
    }
})
export default Stack;