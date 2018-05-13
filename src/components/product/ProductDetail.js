import React, { Component } from 'react';
import {
    View,
    StyleSheet
} from 'react-native';
import Header from '../particle/Header';
import ContentProductDetail from './ContentProductDetail';
import { saveNavigation } from '../../redux/ActionCreators';

import { connect } from 'react-redux';
class ProductDetail extends Component{
    componentWillMount(){
        //Cập nhập navigation
        this.props.saveNavigation(this.props.navigation);
    }
    render(){
        const { wrapper, content }= home;
        return(
            <View style={wrapper}>
                <Header />
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
export default connect(null,{saveNavigation: saveNavigation})(ProductDetail)