import React, { Component } from 'react';
import {
    View,
    StyleSheet
} from 'react-native';
import Header from '../particle/Header';
import ContentProductDetail from './ContentProductDetail';

import { connect } from 'react-redux';
class ProductDetail extends Component{
    render(){
        const { wrapper, content }= home;
        return(
            <View style={wrapper}>
                <Header navigation={this.props.navigation} />
                <ContentProductDetail />
            </View>
        )
    }
}
var home=StyleSheet.create({
    wrapper:{
        flex:1
    }
})
export default connect()(ProductDetail)