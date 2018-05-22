import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TextInput,
    Dimensions,
    TouchableOpacity,
    Modal,
    ActivityIndicator,
    Alert,
    AsyncStorage 
} from 'react-native';
import { connect } from 'react-redux';
import { saveToken } from '../../redux/ActionCreators';
import apiGetToken from '../../api/GetToken';

var { height, width } = Dimensions.get('window');
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: 'long02',
            password: '1',
            modalVisible: false,
            _token: ''
        }
        // this.get();
    }
    //Lấy mã xác nhận
    componentDidMount() {
        apiGetToken()
            .then((res) => {
                this.setState({
                    _token: res
                })
            })
            .catch((error) => {
                this.setState({
                    _token: ''
                })
            })
    }
    errorValidate(message) {
        this.setState({
            modalVisible: false
        })
        return Alert.alert(
            'Chú ý',
            message,
            [
                { text: 'OK' },
            ],
            { cancelable: false }
        )
    }
    save = async (token) => {
        try {
            await AsyncStorage.setItem('@Mytoken', token);
        } catch (error) {
            // Error saving data
        }
    }
    login() {
        this.setState({
            modalVisible: true
        })
        const { username, password } = this.state;
        const { url } = this.props;
        //Kiểm tra dữ liệu
        if (username == '') return this.errorValidate('Bạn chưa nhập tên tài khoản');
        if (password == '') return this.errorValidate('Bạn chưa nhập mật khẩu');

        fetch(url + '/app-login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                password: password,
                _token: this.state._token
            })
        })
            .then((res) => res.json())
            .then((resjson) => {
                if (resjson.status == 200) {
                    // Lưu token vào asynstorage của máy
                    this.save(resjson._token);
                    //Thay đổi redux toke
                    this.props.saveToken(resjson._token);
                    this.props.navigation.navigate('TabbarDrawer');
                } else {
                    this.errorValidate('Tên đăng nhập hoặc mật khẩu không chính xác')
                }
                this.setState({
                    modalVisible: false
                })
            })
            .catch((error) => {
                this.errorValidate('Tên đăng nhập hoặc mật khẩu không chính xác')
            })
    }
    render() {
        const { wrapper, input, button, textbutton, button2, textbutton2, tittle, tittle2 } = login;
        return (
            <View style={wrapper}>
                <Text style={tittle}>MEDICINE</Text>
                <Text style={tittle2}>PHARMACY</Text>
                <TextInput
                    style={input}
                    underlineColorAndroid="transparent"
                    value={this.state.username}
                    placeholder="Tên đăng nhập"
                    onChangeText={(username) => this.setState({ username })}
                />
                <TextInput
                    style={input}
                    underlineColorAndroid="transparent"
                    value={this.state.password}
                    secureTextEntry={true}
                    placeholder="Mật khẩu"
                    onChangeText={(password) => this.setState({ password })}
                />
                <TouchableOpacity
                    onPress={() => this.login()}
                    style={button}
                >
                    <Text style={textbutton}>Đăng nhập</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('Registerscreen')}
                    style={button2}
                >
                    <Text style={textbutton2}>Bạn chưa có tài khoản?</Text>
                </TouchableOpacity>
                <Modal
                    animationType='none'
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        alert('Modal has been closed.');
                    }}
                >
                    <View style={{ flex: 1, backgroundColor: '#00000040', justifyContent: 'center', alignItems: 'center' }}>
                        <ActivityIndicator size="large" color="#0000ff" />
                    </View>
                </Modal>
            </View>
        )
    }
}
function mapStateToProps(state) {
    return {
        url: state.url,
        token: state.token
    }
}
export default connect(mapStateToProps,{saveToken: saveToken})(Login)

var login = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: '#DB612A',
        alignItems: 'center',
        justifyContent: 'center'
    },
    tittle: {
        fontSize: 25,
        fontWeight: 'bold',
        color: 'white'
    },
    tittle2: {
        fontSize: 35,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: height / 40
    },
    input: {
        width: width * 0.9,
        borderRadius: 100,
        margin: width / 80,
        backgroundColor: 'white',
        marginBottom: height / 50
    },
    button: {
        width: width * 0.9,
        height: height / 13,
        borderRadius: 100,
        margin: width / 80,
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: height / 60,
        marginBottom: height / 50
    },
    textbutton: {
        fontWeight: 'bold',
        color: 'white',
        fontSize: 18
    },
    button2: {
        width: width * 0.9,
        height: height / 13,
        margin: width / 80,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center'
    },
    textbutton2: {
        fontWeight: 'bold',
        color: '#DB612A',
        fontSize: 18
    },
})