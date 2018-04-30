import React, { Component } from 'react';
import {
    View,
    Text
} from 'react-native';
import { connect } from 'react-redux';
class Menu extends Component{
    render(){
        return(
            <View>
                <Text>Đây là menu</Text>
            </View>
        )
    }
}
export default connect()(Menu)