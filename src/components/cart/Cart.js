import React, { Component } from 'react';
import {
    View,
    StyleSheet
} from 'react-native';
import Header from '../particle/Header';
import ContentCart from './ContentCart';
import { saveNavigation } from '../../redux/ActionCreators';

import { connect } from 'react-redux';
class Cart extends Component{
    componentWillMount(){
        //Cập nhập navigation
        this.props.saveNavigation(this.props.navigation);
    }
    render(){
        const { wrapper, content }= cart;
        return(
            <View style={wrapper}>
                <Header  />
                <ContentCart />
            </View>
        )
    }
}
var cart=StyleSheet.create({
    wrapper:{
        flex:1
    }
})
export default connect(null,{saveNavigation: saveNavigation})(Cart)