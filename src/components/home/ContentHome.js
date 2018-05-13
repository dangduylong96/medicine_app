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
    ActivityIndicator
} from 'react-native';
var { height, width } = Dimensions.get('window');
import { connect } from 'react-redux';
import apiGetProduct from '../../api/GetProduct';

class ContentHome extends Component{
    constructor(props){
        super(props);
        this.state={
            skip: 0,
            take: 5,
            list_product:[],
            modalVisible: false,
            refreshing: false,
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
    goToDeatail(id){
        this.props.route_navigation.navigate('DetailProdouctScreen',{id: '11'});
    }
    render(){
        const { wrapper, item, image, view_image, view_detail, title_pro, cate_pro, sales_pro, action, view, addcart }= contenthome;
        const { url }= this.props;        
        return(
            <View style={wrapper}>
                <FlatList
                    refreshing={this.state.refreshing}
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
                                    (parseInt(data_item.item.sales)<=0) ? <Text>  </Text>: <Text style={sales_pro}>Sales: {data_item.item.sales} VNĐ</Text>
                                }
                                <View style={action}>
                                    <TouchableOpacity
                                        onPress={()=> this.props.route_navigation.navigate('DetailProdouctScreen',{id: data_item.item.id})}
                                    >
                                        <Text style={view}>Xem</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={()=>console.log('a')}
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
        route_navigation: state.route_navigation
    }
}
export default connect(mapStateToProps)(ContentHome)

var contenthome=StyleSheet.create({
    wrapper:{
        flex:9,
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
        alignSelf: 'flex-start',
        fontSize: 15,
        padding: 5,
        backgroundColor: '#ff9900',
        color: 'white',
        borderRadius: 50,
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
        color: '#DB612A',
        borderRadius: 50,
        borderWidth: 1,
        borderColor: '#DB612A',
        fontWeight: 'bold',
    },
    addcart:{
        padding: width/50,
        paddingLeft: width/20,
        paddingRight: width/20,
        backgroundColor: '#DB612A',
        justifyContent:'center',
        color: 'white',
        borderRadius: 50,
        fontWeight: 'bold'
    }
})
