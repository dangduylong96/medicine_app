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
    Alert
} from 'react-native';
import { Icon } from 'react-native-elements';

var { height, width } = Dimensions.get('window');
import { connect } from 'react-redux';
import apiGetProduct from '../../api/GetProduct';
import apiGetNewProduct from '../../api/GetNewProduct';
import { addCart } from '../../redux/ActionCreators';

class NewContent extends Component{
    constructor(props){
        super(props);
        this.state={
            list_product:[],
            modalVisible: true
        }
    }
    componentDidMount(){
        let data=this.props.route_navigation.state.params.data;
        this.setState({
            list_product: data,
            modalVisible: false
        })
    }
    addCart(item){
        this.props.addCart(item);
    }
    render(){
        const { wrapper, item, image, view_image, view_detail, title_pro, cate_pro, sales_pro, sales_label1, sales_label, action, view, addcart }= newcontent;
        const { url }= this.props;        
        return(
            <View style={wrapper}>
                <FlatList
                    keyExtractor={(item, index) => index.toString()}
                    data={this.state.list_product}
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
                                <Text style={cate_pro}>Loại: {data_item.item.category}</Text>
                                <Text style={cate_pro}>Giá: {data_item.item.price} VNĐ</Text>
                                {
                                    (parseInt(data_item.item.sales)<=0) ?null:( 
                                        <View style={sales_pro}>
                                            <Icon
                                            name='burst-sale'
                                            type='foundation'
                                            color='#ffcc00' 
                                            size={40}
                                            />
                                            <Text style={sales_label}>Sales: </Text>
                                            <Text style={sales_label1}>{data_item.item.sales} VNĐ</Text>
                                        </View>
                                    )
                                }
                                <View style={action}>
                                    <TouchableOpacity
                                        onPress={()=> this.props.route_navigation.navigate('DetailProdouctScreen',{id: data_item.item.id})}
                                    >
                                        <Text style={view}>Xem</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={()=> this.addCart(data_item.item)}
                                    >
                                        <Text style={addcart}>Mua</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    }
                />
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
export default connect(mapStateToProps,{addCart: addCart})(NewContent)

var newcontent=StyleSheet.create({
    wrapper:{
        flex:12,
        backgroundColor:'#E0E0E0'
    },
    item:{
        flexDirection: 'row',
        // borderWidth: 1,
        height: height/4,
        justifyContent:'space-around',
        marginTop: width/70,
        marginBottom: 0,
        backgroundColor:'white'
    },
    view_image:{
        flex:2/5,
        alignItems: 'center',
        justifyContent: 'center',
        // borderWidth:1
    },
    view_detail:{
        flex:3/5,
        // borderWidth:1
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
        fontSize: 15,
        paddingTop: 5,
    },
    sales_pro:{
        flexDirection: 'row', 
        alignItems: 'center'
    },
    sales_label:{
        fontWeight: 'bold'
    },
    sales_label1:{
        fontWeight: 'bold',
        textDecorationLine: 'line-through'
    },
    action:{
        flexDirection: 'row',
        justifyContent:'space-around',
        paddingTop: 5
    },
    view:{
        padding: width/50,
        paddingLeft: width/20,
        paddingRight: width/20,
        backgroundColor: 'transparent',
        justifyContent:'center',
        color: '#00b359',
        borderRadius: 50,
        borderWidth: 1,
        borderColor: '#00b359',
        fontWeight: 'bold',
    },
    addcart:{
        padding: width/50,
        paddingLeft: width/20,
        paddingRight: width/20,
        backgroundColor: '#00b359',
        justifyContent:'center',
        color: 'white',
        borderRadius: 50,
        fontWeight: 'bold'
    }
})
