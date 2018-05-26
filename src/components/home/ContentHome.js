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
import { addCart, checkViewNew } from '../../redux/ActionCreators';

class ContentHome extends Component{
    constructor(props){
        super(props);
        this.state={
            skip: 0,
            take: 5,
            list_product:[],
            modalVisible: false,
            refreshing: false
        }
    }
    getProductApi(){
        let token=this.props.token;
        let skip=this.state.skip;
        let take=this.state.take;
        let url=this.props.url;
        return apiGetProduct(url,token,skip,take);
    }
    componentDidMount(){
        this.setState({
            modalVisible: true
        })
        this.getProductApi()
        .then((res)=>{
            this.setState({
                list_product: res,
                modalVisible: false
            })
        })
    }
    componentWillMount(){
        let url=this.props.url;
        //Kiểm tra có sản phẩm mới không
        apiGetNewProduct(url)
        .then(res=>{
            let qty_new=parseInt(res.total);
            let data=res.data;
            let viewnew=this.props.viewnew;
            if(qty_new>0 && viewnew==0){
                this.props.checkViewNew();
                Alert.alert(
                    'Thông báo',
                    'Có '+qty_new+' sản phẩm mới. Bạn có muốn xem ngay?',
                    [
                        {text: 'Xem ngay', onPress: () => this.props.route_navigation.navigate('NewProductScreen',{data: data})},
                        {text: 'Để sau'},
                      ],
                      { cancelable: false }
                )
            }
        })
    }
    _onRefresh(){
        this.setState({
            refreshing: true,
            skip: 0
        },function(){
            this.getProductApi()
            .then((res)=>{
                this.setState({
                    list_product: res,
                    refreshing: false
                })
            })
        })
    }
    _loadmore(){
        this.setState({
            refreshing: true,
            skip: this.state.skip+this.state.take
        },function(){
            this.getProductApi()
            .then((res)=>{
                this.setState({
                    list_product: this.state.list_product.concat(res),
                    refreshing: false
                })
            })
        });
    }
    addCart(item){
        this.props.addCart(item);
    }
    render(){
        const { wrapper, item, image, view_image, view_detail, title_pro, cate_pro, sales_pro, sales_label1, sales_label, action, view, addcart }= contenthome;
        const { url }= this.props;        
        return(
            <View style={wrapper}>
                <FlatList
                    refreshing={this.state.refreshing}
                    keyExtractor={(item, index) => index.toString()}
                    onRefresh={()=>this._onRefresh()}
                    onEndReachedThreshold={0.2}
                    onEndReached={()=>this._loadmore()}
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
        cart: state.cart,
        viewnew: state.viewnew
    }
}
export default connect(mapStateToProps,{addCart: addCart, checkViewNew: checkViewNew})(ContentHome)

var contenthome=StyleSheet.create({
    wrapper:{
        flex:10,
        backgroundColor:'#E0E0E0'
    },
    item:{
        flexDirection: 'row',
        // borderWidth: 1,
        height: 'auto',
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
        fontSize: 18,
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
        paddingTop: 5,
        marginBottom: 10
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
