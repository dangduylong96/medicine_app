import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Image,
    Dimensions,
    FlatList,
    Modal,
    ActivityIndicator,
    TextInput
} from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

var { height, width } = Dimensions.get('window');
import { connect } from 'react-redux';
import { changeQtyItemCart, addCart, deleteItemCart } from '../../redux/ActionCreators';


class ContentCart extends Component{
    constructor(props){
        super(props);
        this.state={
            modalVisible: true,
        }
    }
    componentDidMount(){
        this.setState({
            modalVisible: false
        })
    }
    changeQtyItem(id,qty){
        //Kiểm tra nhập vào có phải số hay không???
        let newText = '';
        let numbers = '0123456789';
        for (var i=0; i < qty.length; i++) {
            if(numbers.indexOf(qty[i]) == -1) {
                return alert("Vui lòng chỉ nhập số");
            }
        }
        //Nếu là số thì tiếp tục
        this.props.changeQtyItemCart(id,qty);
    }
    addCart(item,qty){
        this.props.addCart(item,qty);
    }
    totalPriceCart(){
        let cart=this.props.cart;
        let total=0;
        cart.forEach((item)=>{
            let real_price=item.price.toString().replace(',','');
            let sales=item.sales.toString().replace(',','');
            if(parseInt(sales)>0) real_price=parseInt(real_price)-parseInt(sales);
            total+=real_price*item.qty;
        })
        return total.toString().replace(/(.)(?=(\d{3})+$)/g,'$1,');
    }
    getPriceItem(price,sales){
        //Bỏ dấu , đi dể tính toán
        let price_change=price.toString().replace(',','');
        let sales_change=sales.toString().replace(',','');
        if(parseInt(sales_change)>0) price_change=parseInt(price_change)-parseInt(sales_change);
        
        return price_change.toString().replace(/(.)(?=(\d{3})+$)/g,'$1,');
    }
    render(){
        const { wrapper, wrapper_list_cart, wrapper_checkout, item, image, view_image, view_detail, view_qty, change, qty, title_pro, cate_pro, sales_pro, delete_pro, checkout, total }= contentcart;
        const { url }= this.props;        
        return(
            <View style={wrapper}>
                <View style={wrapper_list_cart}>
                    <FlatList
                        data={this.props.cart}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={(data_item)=>
                            <View style={item}>
                                <View style={view_image}>
                                    <TouchableOpacity
                                        onPress={()=> this.props.route_navigation.navigate('DetailProdouctScreen',{id: data_item.item.id})}
                                    >
                                        <Image 
                                            style={image} 
                                            source={{uri: url+'/public/images/product/'+data_item.item.image}} 
                                        />
                                    </TouchableOpacity>
                                </View>
                                <View style={view_detail}>
                                    <Text style={title_pro}>{data_item.item.name}</Text>
                                    <View style={view_qty}>
                                        <TouchableOpacity
                                            onPress={()=> this.addCart(data_item.item,-1)}
                                        >
                                            <Text style={change}>-</Text>
                                        </TouchableOpacity>
                                        <TextInput
                                            style={qty}
                                            keyboardType='numeric'
                                            value={data_item.item.qty.toString()}
                                            onChangeText={(qty) => this.changeQtyItem(data_item.item.id,qty)}
                                            onBlur={()=>data_item.item.qty<1?this.changeQtyItem(data_item.item.id,1):null}
                                            underlineColorAndroid='transparent'
                                        />
                                        <TouchableOpacity
                                            onPress={()=> this.addCart(data_item.item,1)}
                                        >
                                            <Text style={change}>+</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{flexDirection:'row', marginBottom:height/70}}>
                                        {
                                            (parseInt(data_item.item.sales)<=0) ? <Text>  </Text>: <Text style={sales_pro}>{data_item.item.sales} VNĐ</Text>
                                        }
                                        <Text style={cate_pro}>{this.getPriceItem(data_item.item.price,(parseInt(data_item.item.sales)<=0) ?0:data_item.item.sales)} VNĐ</Text>
                                    </View>
                                    <TouchableOpacity
                                        onPress={()=> this.props.deleteItemCart(data_item.item.id)}
                                    >
                                        <Text style={delete_pro}>Xóa sản phẩm</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        }
                    />
                </View>
                <View style={wrapper_checkout}>
                    <Text style={total}>Tổng tiền: <Text style={{color:'#FF9472'}}>{this.totalPriceCart()} VNĐ</Text></Text>
                    <Button
                        icon={
                            <Icon
                            name='home'
                            size={15}
                            color='red'
                        />
                        }
                        title='Đặt hàng'
                        buttonStyle={checkout}
                    />
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
function mapStateToProps(state) {
    return {
        url: state.url,
        token: state.token,
        route_navigation: state.route_navigation,
        cart: state.cart
    }
}
export default connect(mapStateToProps,{changeQtyItemCart: changeQtyItemCart,addCart: addCart,deleteItemCart: deleteItemCart})(ContentCart)

var contentcart=StyleSheet.create({
    wrapper:{
        flex:9,
        backgroundColor:'#E0E0E0',
        justifyContent:'space-between'
    },
    wrapper_list_cart:{
        flex:7
    },
    wrapper_checkout:{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'space-around',
        backgroundColor: 'white',
        marginTop: height/100
    },
    total:{
        fontWeight: 'bold'
    },
    checkout:{
        backgroundColor: '#FF9472'
    },
    item:{
        flexDirection: 'row',
        height: height/4,
        justifyContent:'space-around',
        marginTop: width/70,
        marginBottom: 0,
        backgroundColor:'white'
    },
    view_image:{
        flex:2/5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    view_detail:{
        flex:3/5
    },
    view_qty:{
        flexDirection: 'row',
        marginTop: height/70,
        marginBottom: height/70,
    },
    change:{
        padding: 3,
        paddingHorizontal: 10,
        borderWidth: 2,
        borderColor: '#F3F3F3',
        fontSize: 18
    },
    qty:{
        padding: 5,
        paddingLeft: width/10,
        paddingRight: width/10,
        borderBottomColor: '#F3F3F3',
        borderBottomWidth: 2
    },
    image:{
        width: width/3,
        height: height/5
    },
    title_pro:{
        fontSize: 20,
        fontWeight: 'bold',
    },
    cate_pro:{
        // fontSize: 15,
        // paddingTop: 5,
        color: '#FF9472',
        fontSize: 15,
        fontWeight: 'bold'
    },
    sales_pro:{
        fontSize: 15,
        textDecorationLine: 'line-through',
        color: '#ebebe0',
        marginRight: 5
    },
    delete_pro:{
        color: '#4080ff',
        textDecorationLine: 'underline'
    }
})
