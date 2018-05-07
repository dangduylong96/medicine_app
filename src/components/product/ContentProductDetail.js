import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Image,
    Dimensions,
    Modal,
    ActivityIndicator,
    ScrollView
} from 'react-native';
var { height, width } = Dimensions.get('window');
import { connect } from 'react-redux';
import apiGetProduct from '../../api/GetProduct';

class ContentProductDetail extends Component{
    constructor(props){
        super(props);
        this.state={
            modalVisible: false,
        }
    }
    componentDidMount(){
        let id=this.props.idDetailProduct;
        // this.setState({
        //     modalVisible: true
        // })
        // let token=this.props.token;
        // let skip=this.state.skip;
        // let take=this.state.take;
        // apiGetProduct(token,skip,take)
        // .then((res)=>{
        //     this.setState({
        //         list_product: res,
        //         modalVisible: false
        //     })
        // })
    }
    render(){
        const { wrapper, content, image, nameproduct, price, price_product, sales_product, add_cart, button }= contentproductdetail;
        const { url }= this.props;  
        return(
            <View style={wrapper}>
                <View style={content}>
                    
                    <ScrollView style={{margin: 10}}>
                        <Image 
                            style={image} 
                            source={{uri: url+'/public/images/product/bEa35STTTG618944376037.jpg'}} 
                        />
                        <Text style={nameproduct}>Thông Xoang Tán</Text>
                        <Text style={price}>Loại: Đông y</Text>
                        <Text style={price}>Giá: <Text style={price_product}>100.000 VNĐ</Text></Text>
                        <Text style={price}>Giảm giá: <Text style={sales_product}>100.000 VNĐ</Text></Text>
                        <Text>MÔ TẢMÔ TẢMÔ TẢMÔ TẢMÔ TẢMÔ TẢMÔ TẢMÔ TẢMÔ TẢMÔ TẢMÔ TẢMÔ TẢMÔ TẢMÔ TẢMÔ TẢMÔ TẢMÔ TẢMÔ TẢMÔ TẢMÔ TẢMÔ TẢMÔ TẢMÔ TẢMÔ TẢMÔ TẢMÔ TẢMÔ TẢMÔ TẢMÔ TẢMÔ TẢMÔ TẢMÔ TẢMÔ TẢMÔ TẢMÔ TẢMÔ TẢMÔ TẢMÔ TẢMÔ TẢMÔ TẢMÔ TẢMÔ TẢMÔ TẢMÔ TẢMÔ TẢMÔ TẢMÔ TẢMÔ TẢMÔ TẢMÔ TẢMÔ TẢMÔ TẢMÔ TẢMÔ TẢMÔ TẢMÔ TẢMÔ TẢMÔ TẢMÔ TẢMÔ TẢMÔ TẢMÔ TẢMÔ TẢMÔ TẢMÔ TẢMÔ TẢMÔ TẢMÔ TẢMÔ TẢMÔ TẢMÔ TẢMÔ TẢMÔ TẢMÔ TẢMÔ TẢMÔ TẢMÔ TẢMÔ TẢMÔ TẢMÔ TẢMÔ TẢMÔ TẢMÔ TẢMÔ TẢMÔ TẢMÔ TẢMÔ TẢMÔ TẢMÔ TẢMÔ TẢMÔ TẢMÔ TẢMÔ TẢMÔ TẢMÔ TẢMÔ TẢMÔ TẢMÔ TẢMÔ TẢMÔ TẢMÔ TẢMÔ TẢMÔ TẢMÔ TẢMÔ TẢMÔ TẢMÔ TẢ</Text>
                        <View style={{justifyContent:'space-between'}}>
                            <TouchableOpacity
                                style={button}
                                onPress={()=>console.log('a')}
                            >
                                <Text style={add_cart}>Thêm vào giỏ hàng</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </View>

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
var contentproductdetail=StyleSheet.create({
    wrapper:{
        flex:9,
        backgroundColor:'#E0E0E0',
        justifyContent: 'center',
        alignItems: 'center'
    },
    content:{
        flex:1,
        width: width*0.95,
        backgroundColor:'white',
        marginTop: height/80,
        marginBottom: height/80,
        borderRadius: 10,
    },
    image:{
        width: '95%',
        height: height/4,
        margin: 10,
        borderWidth: 1
    },
    nameproduct:{
        fontSize: 25,
        fontWeight: 'bold',
        marginTop: height/80
    },
    price:{
        fontWeight: 'bold',
        marginTop: height/80,
        fontSize:18
    },
    price_product:{
        fontWeight: 'normal',
        fontSize:18,
        color: '#3366ff'
    },
    sales_product:{
        fontWeight: 'normal',
        fontSize:18,
        color: '#ff8533',
        textDecorationLine: 'line-through'
    },
    button: {
        width: width * 0.9,
        height: height / 13,
        margin: width / 80,
        marginLeft: 0,
        backgroundColor: '#DB612A',
        borderWidth: 1,
        borderColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center'
    },
    add_cart:{
        fontWeight: 'bold',
        color: 'white',
        fontSize: 18
    }
})
function mapStateToProps(state) {
    return {
        url: state.url,
        token: state.token,
        route_navigation: state.route_navigation,
        idDetailProduct: state.idDetailProduct
    }
}
export default connect(mapStateToProps)(ContentProductDetail)