import { StackNavigator } from 'react-navigation';
import Home from '../home/Home';
import ProductDetail from '../product/ProductDetail';

const Stack=StackNavigator({
    HomeScreen:{
        screen: Home
    },
    DetailProdouctScreen:{
        screen: ProductDetail
    },
},{
    initialRouteName: 'HomeScreen',
    headerMode: 'none',
    navigationOptions:{
        headerVisible: false
    }
})
export default Stack;