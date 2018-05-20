import React, { Component } from 'react';
import {
    View,
    StyleSheet
} from 'react-native';
import Header from '../particle/Header';
import SearchContent from './SearchContent';
import { saveNavigation } from '../../redux/ActionCreators';

import { connect } from 'react-redux';
class Search extends Component{
    componentWillMount(){
        //Cập nhập navigation
        this.props.saveNavigation(this.props.navigation);
    }
    render(){
        const { wrapper, content }= search;
        return(
            <View style={wrapper}>
                <Header  />
                <SearchContent />
            </View>
        )
    }
}
var search=StyleSheet.create({
    wrapper:{
        flex:1
    }
})
export default connect(null,{saveNavigation: saveNavigation})(Search)