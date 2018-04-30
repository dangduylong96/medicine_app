import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TextInput,
    Dimensions,
    TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';

var { height, width } = Dimensions.get('window');
class Login extends Component{
    constructor(props){
        super(props);
        this.state={
            username: '',
            password: ''
        }
    }
    render(){
        const { wrapper,input,button,textbutton,button2,textbutton2,tittle,tittle2 }=login;
        return(
            <View style={wrapper}>
                <Text style={tittle}>MEDICINE</Text>                
                <Text style={tittle2}>PHARMACY</Text>                
                <TextInput
                    style={input}
                    underlineColorAndroid="transparent"
                    placeholder="Tên đăng nhập"
                    onChangeText={(username) => this.setState({username})}
                />
                <TextInput
                    style={input}
                    underlineColorAndroid="transparent"
                    secureTextEntry={true}
                    placeholder="Mật khẩu"
                    onChangeText={(password) => this.setState({password})}
                />
                <TouchableOpacity style={button}>
                    <Text style={textbutton}>Đăng nhập</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={()=>this.props.navigation.navigate('Registerscreen')} 
                    style={button2}
                >
                    <Text style={textbutton2}>Bạn chưa có tài khoản?</Text>
                </TouchableOpacity>
            </View>
        )
    }
}
export default connect()(Login)

var login=StyleSheet.create({
    wrapper:{
        flex:1,
        backgroundColor:'#DB612A',
        alignItems: 'center',
        justifyContent: 'center'
    },
    tittle:{
        fontSize:25,
        fontWeight:'bold',
        color:'white'
    },
    tittle2:{
        fontSize:35,
        fontWeight:'bold',
        color:'white',
        marginBottom: height/40
    },
    input:{
        width:width*0.9,
        borderRadius: 100,
        margin: width/80,
        backgroundColor:'white',
        marginBottom:height/50
    },
    button:{
        width:width*0.9,
        height:height/13,
        borderRadius: 100,
        margin: width/80,
        backgroundColor:'transparent',
        borderWidth: 1,
        borderColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: height/60,
        marginBottom: height/50
    },
    textbutton:{
        fontWeight: 'bold',
        color:'white',
        fontSize: 18
    },
    button2:{
        width:width*0.9,
        height:height/13,
        margin: width/80,
        backgroundColor:'white',
        borderWidth: 1,
        borderColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center'
    },
    textbutton2:{
        fontWeight: 'bold',
        color:'#DB612A',
        fontSize: 18
    },
})