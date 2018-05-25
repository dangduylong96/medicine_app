import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TextInput,
    Dimensions,
    TouchableOpacity,
    ScrollView,
    Alert,
    Modal,
    ActivityIndicator
} from 'react-native';
import DatePicker from 'react-native-datepicker'
import { connect } from 'react-redux';
import apiGetToken from '../../api/GetToken';

var { height, width } = Dimensions.get('window');
class Register extends Component{
    static navigationOptions = { header: null }
    constructor(props){
        super(props);
        this.state={
            username: '',
            password: '',
            repassword:'',
            name:'',
            date:'',
            phone:'',
            name_medicine:'',
            address:'',
            tax_code:'',
            modalVisible: false,
            _token: ''
        }
    }
    componentDidMount(){
        apiGetToken()
        .then((res)=>{
            this.setState({
                _token: res
            })
        })
        .catch((error)=>console.log('Lỗi rồi'))
    }
    onChanged(text){
        let newText = '';
        let numbers = '0123456789';
    
        for (var i=0; i < text.length; i++) {
            if(numbers.indexOf(text[i]) > -1 ) {
                newText = newText + text[i];
            }
            else {
                // your call back function
                alert("Vui lòng chỉ nhập số");
            }
        }
        this.setState({ phone: newText });
    }
    errorValidate(message){
        this.setState({
            modalVisible: false
        })
        return Alert.alert(
            'Chú ý',
            message,
            [
              {text: 'OK'},
            ],
            { cancelable: false }
        )
    }
    submit(){
        this.setState({
            modalVisible: true
        })
        const { username, password,repassword, name, date, phone, name_medicine, address, tax_code }=this.state;
        const {url}=this.props;
        //Kiểm tra dữ liệu
        if(username=='') return this.errorValidate('Bạn chưa nhập tên tài khoản');
        if(password=='') return this.errorValidate('Bạn chưa nhập mật khẩu');
        if(repassword=='') return this.errorValidate('Bạn chưa nhập mật khẩu nhập lại');
        if(password!=repassword) return this.errorValidate('Mật khẩu nhập lại không đúng');
        if(name=='') return this.errorValidate('Bạn chưa nhập tên');
        if(phone=='') return this.errorValidate('Bạn chưa nhập số điện thoại');
        if(date=='') return this.errorValidate('Bạn chưa nhập ngày sinh');
        if(name_medicine=='') return this.errorValidate('Bạn chưa nhập tên cửa hàng thuốc');
        if(address=='') return this.errorValidate('Bạn chưa nhập địa chỉ');
        if(tax_code=='') return this.errorValidate('Bạn chưa nhập mã số thuế');
        
        fetch(url+'/register',{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username        : username,
                password        : password,
                name            : name,
                date            : date,
                name_medicine   : name_medicine,
                address         : address,
                tax_code        : tax_code,
                phone           : phone,
                _token          : this.state._token
            })
        })
        .then((res)=>res.json())
        .then((resjson)=>{
            if(resjson.status==200){
                this.errorValidate('Bạn đã đăng kí thành công!!!');
                this.props.navigation.navigate('loginscreen');
            }else{
                this.errorValidate('Tên tài khoản đã tồn tại!!!Vui lòng chọn tên tài khoản khác');
            }
            this.setState({
                modalVisible: false
            })
        })
        .catch((error)=>{
            this.errorValidate('Có lỗi xảy ra!! Vui lòng liên hệ quản trị viên');
        })
    }
    render(){
        const { wrapper,input,inputdate,button,textbutton,button2,textbutton2,tittle,tittle2 }=register;
        return(
            <View style={wrapper}>
            <ScrollView contentContainerStyle={{flexGrow : 1, justifyContent : 'center'}}>
                <Text style={tittle}>OLINE</Text>                
                <Text style={tittle2}>PHARMA</Text>                
                <TextInput
                    style={input}
                    underlineColorAndroid="transparent"
                    placeholder="Tên đăng nhập"
                    onChangeText={(username) => this.setState({username})}
                    value={this.state.username}
                />
                <TextInput
                    style={input}
                    underlineColorAndroid="transparent"
                    secureTextEntry={true}
                    placeholder="Mật khẩu"
                    onChangeText={(password) => this.setState({password})}
                    value={this.state.password}
                />
                <TextInput
                    style={input}
                    underlineColorAndroid="transparent"
                    secureTextEntry={true}
                    placeholder="Nhập lại mật khẩu"
                    onChangeText={(repassword) => this.setState({repassword})}
                    value={this.state.repassword}
                />
                <TextInput
                    style={input}
                    underlineColorAndroid="transparent"
                    placeholder="Họ và tên"
                    onChangeText={(name) => this.setState({name})}
                    value={this.state.name}
                />
                <DatePicker
                    style={inputdate}
                    date={this.state.date}
                    mode="date"
                    placeholder="chọn ngày sinh của bạn"
                    format="DD-MM-YYYY"
                    minDate="01-01-1970"
                    maxDate="01-01-2010"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    showIcon={false}
                    androidMode="calendar"
                    onDateChange={(date) => {this.setState({date: date})}}
                />
                <TextInput
                    style={input}
                    underlineColorAndroid="transparent"
                    placeholder="Số điện thoại"
                    onChangeText={(phone)=> this.onChanged(phone)}
                    value={this.state.phone}
                    maxLength={10} 
                />
                <TextInput
                    style={input}
                    underlineColorAndroid="transparent"
                    placeholder="Tên nhà thuốc"
                    onChangeText={(name_medicine) => this.setState({name_medicine})}
                    value={this.state.name_medicine}
                />
                <TextInput
                    style={input}
                    underlineColorAndroid="transparent"
                    placeholder="Địa chỉ"
                    onChangeText={(address) => this.setState({address})}
                    value={this.state.address}
                />
                <TextInput
                    style={input}
                    underlineColorAndroid="transparent"
                    placeholder="Mã số thuế"
                    onChangeText={(tax_code) => this.setState({tax_code})}
                    value={this.state.tax_code}
                />
                <TouchableOpacity 
                    onPress={()=>this.submit()}                     
                    style={button}
                >
                    <Text style={textbutton}>Đăng kí</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    onPress={()=>this.props.navigation.navigate('loginscreen')} 
                    style={button2}
                >
                    <Text style={textbutton2}>Tôi đã có tài khoản?</Text>
                </TouchableOpacity>
                </ScrollView>
                <Modal
                    animationType='none'
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        alert('Modal has been closed.');
                    }}
                >
                    <View style={{flex:1,backgroundColor: '#00000040',justifyContent:'center',alignItems:'center'}}>
                        <ActivityIndicator size="large" color="#0000ff"/>
                    </View>
                </Modal>
            </View>
        )
    }
}
function mapStateToProps(state){
    return {
        url: state.url
    }
}
export default connect(mapStateToProps)(Register)

var register=StyleSheet.create({
    wrapper:{
        flex:1,
        backgroundColor:'#DB612A',
        alignItems: 'center',
        justifyContent: 'center'
    },
    tittle:{
        fontSize:25,
        fontWeight:'bold',
        color:'white',
        textAlign:'center'
    },
    tittle2:{
        fontSize:35,
        fontWeight:'bold',
        color:'white',
        marginBottom: height/40,
        textAlign:'center'
    },
    input:{
        width:width*0.9,
        borderRadius: 100,
        margin: width/80,
        backgroundColor:'white',
        marginBottom:height/50
    },
    inputdate:{
        width:width*0.9,
        borderRadius: 100,
        margin: width/80,
        backgroundColor:'white',
        marginBottom:height/50,
        alignItems: 'flex-start'
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