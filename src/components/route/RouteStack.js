import { StackNavigator } from 'react-navigation';
import Login from '../login/Login';
import { connect } from 'react-redux';
const RouteStack = StackNavigator({
    loginScreen:{
        screen: Login
    }
},{
    headerMode: 'none',
    navigationOptions:{
        headerVisible: false
    }
})
export default connect()(RouteStack)