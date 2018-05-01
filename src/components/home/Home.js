import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
class Home extends Component{
    render(){
        return(
            <View style={{backgroundColor:'red'}}>
                <Text>Đây là trang home</Text>
                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('DrawerOpen')}
                >
                    <Text>Mở menu</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => this.clear()}
                >
                    <Text>Xóa token</Text>
                </TouchableOpacity>
            </View>
        )
    }
}
export default connect()(Home)