import React from 'react';
import { StackNavigator } from 'react-navigation';
import Login from '../login/Login';
import Register from '../login/Register';

const singleStack=StackNavigator({
    loginscreen:{
        screen:Login,
        navigationOptions:{
            header: null 
        }
    },
    Registerscreen:{
        screen:Register,
        navigationOptions:{
            header: null 
        }
    }
},{
    initialRouteName:'loginscreen'
})
export default singleStack;