import React, { Component } from 'react';
import {
    View,
    StyleSheet
} from 'react-native';
import Header from '../particle/Header';
import NewContent from './NewContent';
import { saveNavigation } from '../../redux/ActionCreators';

import { connect } from 'react-redux';
class New extends Component{
    componentWillMount(){
        //Cập nhập navigation
        this.props.saveNavigation(this.props.navigation);
    }
    render(){
        const { wrapper, content }= order;
        return(
            <View style={wrapper}>
                <NewContent />
            </View>
        )
    }
}
var order=StyleSheet.create({
    wrapper:{
        flex:1
    }
})
export default connect(null,{saveNavigation: saveNavigation})(New)