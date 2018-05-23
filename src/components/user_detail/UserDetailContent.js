import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    TextInput,
    Dimensions,
    Modal,
    ActivityIndicator,
    Alert,
    AsyncStorage
} from 'react-native';
import DatePicker from 'react-native-datepicker'
import { Button } from 'react-native-elements';
import apiGetDetailUser from '../../api/GetDetailUserFromToken';
import apiUpdateDetailUser from '../../api/UpdateDetailUser';
import apiGetToken from '../../api/GetToken';
import { saveToken } from '../../redux/ActionCreators';

var { height, width } = Dimensions.get('window');
import { connect } from 'react-redux';

class UserDetailContent extends Component{
    constructor(props){
        super(props);
        this.state={
            modalVisible: true,
            name:'',
            date:'',
            phone:'',
            name_medicine:'',
            address:'',
            tax_code:'',
            token_laravel: ''
        }
    }
    componentDidMount(){
        //Lấy token của laravel
        apiGetToken()
        .then((res)=>{
            this.setState({
                token_laravel: res
            })
        })
        .catch((error)=>console.log('Lỗi rồi'))

        let url=this.props.url;
        let token=this.props.token;
        apiGetDetailUser(url,token)
        .then(res=>{
            this.setState({
                name: res.name,
                dob: res.dob,
                phone: res.phone,
                name_shop: res.name_shop,
                address: res.address,
                tax_code: res.tax_code,
                modalVisible: false
            })
        })
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
    save = async (token) => {
        try {
            await AsyncStorage.setItem('@Mytoken', token);
        } catch (error) {
            // Error saving data
        }
    }
    //Cập nhập thông tin cá nhân
    updateDetail(){
        this.setState({
            modalVisible: true
        })
        let {name, dob, phone, name_shop, address, tax_code }=this.state;
        let { url, token }=this.props;
        //Kiểm tra dữ liệu
        if(name=='') return this.errorValidate('Bạn chưa nhập tên');
        if(phone=='') return this.errorValidate('Bạn chưa nhập số điện thoại');
        if(phone=='') return this.errorValidate('Bạn chưa nhập ngày sinh');
        if(name_shop=='') return this.errorValidate('Bạn chưa nhập tên cửa hàng thuốc');
        if(address=='') return this.errorValidate('Bạn chưa nhập địa chỉ');
        if(tax_code=='') return this.errorValidate('Bạn chưa nhập mã số thuế');
        //Gom thành object data
        let data={
            token: token,
            name: name,
            dob: dob,
            phone: phone,
            name_shop: name_shop,
            address: address,
            tax_code: tax_code,
            _token: this.state.token_laravel
        };
        apiUpdateDetailUser(url,data)
        .then(res=>{
            this.save(res);
            // //Lưu redux
            this.props.saveToken(res);
            this.setState({
                modalVisible: false
            })
            alert("Cập nhập thông tin thành công!!!!");
        })
    }
    render(){
        const { wrapper, wrapper_input, title, label, input_label, inputdate }= userdetailcontent;
        const { url }= this.props;       
        return(
            <View style={wrapper}>
                <ScrollView style={wrapper_input}>
                    <View style={{margin: 20}}>
                        <Text style={title}>Thông tin tài khoản</Text>
                        <View>
                            <Text style={label}>Họ tên</Text>
                            <TextInput
                                style={input_label}
                                onChangeText={(name) => this.setState({name})}
                                value={this.state.name}
                                underlineColorAndroid="#9999ff"
                            />
                        </View>
                        <View>
                            <Text style={label}>Ngày sinh</Text>
                            <DatePicker
                                style={inputdate}
                                date={this.state.dob}
                                mode="date"
                                placeholder="chọn ngày sinh của bạn"
                                format="DD-MM-YYYY"
                                minDate="01-01-1970"
                                maxDate="01-01-2010"
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                showIcon={true}
                                androidMode="calendar"
                                onDateChange={(dob) => {this.setState({dob: dob})}}
                            />
                        </View>
                        <View>
                            <Text style={label}>Số điện thoại</Text>
                            <TextInput
                                style={input_label}
                                onChangeText={(phone)=> this.onChanged(phone)}
                                value={this.state.phone}
                                underlineColorAndroid="#9999ff"
                            />
                        </View>
                        <View>
                            <Text style={label}>Tên nhà thuốc</Text>
                            <TextInput
                                style={input_label}
                                onChangeText={(name_shop) => this.setState({name_shop})}
                                value={this.state.name_shop}
                                underlineColorAndroid="#9999ff"
                            />
                        </View>
                        <View>
                            <Text style={label}>Địa chỉ</Text>
                            <TextInput
                                style={input_label}
                                onChangeText={(address) => this.setState({address})}
                                value={this.state.address}
                                underlineColorAndroid="#9999ff"
                            />
                        </View>
                        <View>
                            <Text style={label}>Mã số thuế</Text>
                            <TextInput
                                style={input_label}
                                onChangeText={(tax_code) => this.setState({tax_code})}
                                value={this.state.tax_code}
                                underlineColorAndroid="#5c5cd6"
                            />
                        </View>
                        <Button
                            onPress={()=>this.updateDetail()}
                            icon={{ name: 'save' }}
                            buttonStyle={{backgroundColor: '#00b359', marginTop: 20}}
                            title='Cập nhập'
                        />
                    </View>
                    
                </ScrollView>
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
        token: state.token,
        route_navigation: state.route_navigation
    }
}
export default connect(mapStateToProps,{saveToken: saveToken})(UserDetailContent)

var userdetailcontent=StyleSheet.create({
    wrapper:{
        flex:12,
        backgroundColor:'#E0E0E0',
        alignItems: 'center',
    },
    wrapper_input:{
        width: width*0.95,
        backgroundColor: 'white',
        flex: 1,
        marginTop: height/80,
        marginBottom: height/80
    },
    title:{
        fontWeight: 'bold',
        fontSize: 20,
        marginBottom: 10
    },
    label:{
        fontSize: 15,
        color: '#9999ff'
    },
    input_label:{
        borderWidth: 0,
        height: height/18
    },
    inputdate:{
        width: '100%',
        borderColor: '#9999ff',
        borderWidth: 1,
        marginTop: 5,
        marginBottom: 5
    }
})
