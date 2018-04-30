import { StackNavigator } from 'react-navigation';
import Login from '../login/Login';
import Register from '../login/Register';

const singleStack=StackNavigator({
    loginscreen:{
        screen:Login
    },
    Registerscreen:{
        screen:Register
    },
},{
    initialRouteName:'loginscreen',
    headerMode: 'none',
    navigationOptions:{
        headerVisible: false
    }
})
export default singleStack;