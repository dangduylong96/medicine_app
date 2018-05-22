import React, { Component } from 'react';
import {
    View,
    StyleSheet
} from 'react-native';
import Header from '../particle/Header';
import UserDetailContent from './UserDetailContent';
import { saveNavigation } from '../../redux/ActionCreators';

import { connect } from 'react-redux';
class UserDetail extends Component{
    componentWillMount(){
        //Cập nhập navigation
        this.props.saveNavigation(this.props.navigation);
    }
    render(){
        const { wrapper, content }= search;
        return(
            <View style={wrapper}>
                <Header  />
                <UserDetailContent />
            </View>
        )
    }
}
var search=StyleSheet.create({
    wrapper:{
        flex:1
    }
})
export default connect(null,{saveNavigation: saveNavigation})(UserDetail)