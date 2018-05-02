import React, { Component } from 'react';
import {
    View,
    StyleSheet
} from 'react-native';
import Header from '../particle/Header';
import ContentHome from './ContentHome';

import { connect } from 'react-redux';
class Home extends Component{
    render(){
        const { wrapper, content }= home;
        return(
            <View style={wrapper}>
                <Header navigation={this.props.navigation} />
                <ContentHome />
            </View>
        )
    }
}
var home=StyleSheet.create({
    wrapper:{
        flex:1
    }
})
export default connect()(Home)