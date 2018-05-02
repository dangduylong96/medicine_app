import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Image,
    Dimensions
} from 'react-native';
var { height, width } = Dimensions.get('window');
import { connect } from 'react-redux';
class Header extends Component{
    render(){
        const { wrapper, icon, text }= header;      
        const ic_menu='../../assets/images/icon/ic_menu.png';          
        return(
            <View style={wrapper}>
                <TouchableOpacity
                    onPress={()=>this.props.navigation.navigate('DrawerOpen')}
                >
                    <Image style={icon} source={require(ic_menu)} />
                </TouchableOpacity>
                <Text style={text}>MEDICINE PHARMACY</Text>
                <View style={{width: width/6}} />
            </View>
        )
    }
}
var header=StyleSheet.create({
    wrapper:{
        flex:1,
        flexDirection:'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor:'#DB612A'
    },
    icon:{
        width: width/10,
        height: height/20
    },
    text:{
        fontSize: 20,
        fontWeight: 'bold',
        color:'white'
    }
})
export default connect()(Header)