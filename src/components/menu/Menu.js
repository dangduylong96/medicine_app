import React, { Component } from 'react';
import {
    View,
    Dimensions,
    StyleSheet,
    AsyncStorage
} from 'react-native';
import { Icon } from 'react-native-elements';
import { Button } from 'react-native-elements';

import { connect } from 'react-redux';
var { height, width } = Dimensions.get('window');
class Menu extends Component{
    logOut=async ()=>{
        await AsyncStorage.clear();
        this.props.navigation.navigate('loginscreen')
    }
    render(){
        const { header, content, icon, button }=menu;
        return(
            <View style={{flex:1}}>
                <View style={header}>
                    <Icon
                        type='evilicon'
                        name='user'
                        color='white' 
                        size={120} 
                        iconStyle={icon}
                    />
                </View>
                <View style={content}>
                    <Button
                        buttonStyle={button}
                        icon={{ name: 'history', color:'#00b359'}}
                        title='Lịch sử đơn hàng'
                        textStyle={{color: '#00b359'}}
                        onPress={()=>this.props.navigation.navigate('OrderScreen')}
                    />
                    <Button
                        buttonStyle={button}
                        icon={{name: 'sign-out', type: 'font-awesome', color:'#00b359'}}
                        title='Đăng xuất'
                        textStyle={{color: '#00b359'}}
                        onPress={()=>this.logOut()}
                    />
                </View>
            </View>
        )
    }
}
var menu=StyleSheet.create({
    header:{
        flex: 1,
        backgroundColor: '#00b359',
        justifyContent: 'center',
        alignItems: 'center'
    },
    content:{
        flex: 5/2,
        backgroundColor: '#00b359',
        alignItems: 'center'
    },
    button:{
        marginBottom: height/60,
        width: (width/2)*0.9,
        borderRadius: 100,
        backgroundColor: 'white'
    }
})
export default connect()(Menu)