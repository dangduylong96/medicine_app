import React from 'react';
import { StackNavigator } from 'react-navigation';
import Login from '../login/Login';
import Register from '../login/Register';

const singleStack=StackNavigator({
    loginscreen:{
        screen:Login
    },
    Registerscreen:{
        screen:Register
    }
},{
    initialRouteName:'loginscreen'
})
export default singleStack;