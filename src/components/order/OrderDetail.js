import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Dimensions,
    Image,
    Text
} from 'react-native';
import { Icon } from 'react-native-elements';

var { height, width } = Dimensions.get('window');
import { connect } from 'react-redux';
class OrderDetail extends Component{
    constructor(props){
        super(props);
        this.state={
            detail: []
        }
    }
    componentDidMount(){
        let detail=this.props.navigation.state.params.detail;
        // let detail=[ 
        //     { id: 1,order_id: 1,id_product: 11,name: 'LIVERTIS - DANAPHA', qty: 200,sales: 100000,price: 215000,img: '2sf5Q7tryKlivertis.jpg' },
        //     { id: 2, order_id: 1,id_product: 10,name: 'Potenciator',qty: 100,sales: 0,price: 160000,img: 'Vo8IAMuindpotenciator.jpg' },
        //     { id: 3,order_id: 1,id_product: 9,name: 'Fudteno',qty: 50,sales: 0,price: 770000,img: '1FYnw63PRMfudteno_1.jpg' } 
        // ];
        this.setState({
            detail: detail
        })
    }
    changeValueToPrice(number){
        return number.toString().replace(/(.)(?=(\d{3})+$)/g,'$1,');
    }
    render(){
        const { wrapper, wrapper_list_cart, item, image, view_image, view_detail, view_qty, qty, title_pro, cate_pro, sales_pro }= content_order_detail;
        const { url }= this.props; 
        return(
            <View style={wrapper}>
                <View style={wrapper_list_cart}>
                    <FlatList
                        data={this.state.detail}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={(data_item)=>
                            <View style={item}>
                                <View style={view_image}>
                                    <Image 
                                        style={image} 
                                        source={{uri: url+'/public/images/product/'+data_item.item.img}} 
                                    />
                                </View>
                                <View style={view_detail}>
                                    <Text style={title_pro}>{data_item.item.name}</Text>
                                    <View style={view_qty}>
                                        <Text>Số lượng: </Text>
                                        <Text style={qty}> {data_item.item.qty.toString()}</Text>
                                    </View>
                                    {
                                        (parseInt(data_item.item.sales)<=0) ?null: (
                                        <View style={view_qty}>
                                            <Icon
                                                name='burst-sale'
                                                type='foundation'
                                                color='#ffcc00' 
                                                size={30}
                                            />
                                            <Text style={sales_pro}> {this.changeValueToPrice(data_item.item.sales)} VNĐ</Text>
                                        </View>)
                                    }
                                    
                                    <View style={view_qty}>
                                        <Icon
                                            name='money'
                                            type='font-awesome'
                                            color='#ffcc00' 
                                            size={30}
                                        />
                                        <Text style={cate_pro}> {this.changeValueToPrice(data_item.item.price-data_item.item.sales)} VNĐ</Text>
                                    </View>
                                    <View style={view_qty}>
                                        <Icon
                                            name='credit'
                                            type='entypo'
                                            color='#9933ff' 
                                            size={25}
                                        />
                                        <Text style={cate_pro}>{this.changeValueToPrice((data_item.item.price-data_item.item.sales)*data_item.item.qty)} VNĐ</Text>
                                    </View>
                                </View>
                            </View>
                        }
                    />
                </View>
            </View>
        )
    }
}
function mapStateToProps(state) {
    return {
        url: state.url
    }
}
export default connect(mapStateToProps)(OrderDetail)
var order_detail=StyleSheet.create({
    wrapper:{
        flex:1
    }
})
var content_order_detail=StyleSheet.create({
    wrapper:{
        flex:10,
        backgroundColor:'#E0E0E0',
        justifyContent:'space-between'
    },
    wrapper_list_cart:{
        flex:7
    },
    item:{
        flexDirection: 'row',
        height: 'auto',
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
        marginTop: height/90,
        alignItems: 'center',
    },
    qty:{
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
        fontWeight: 'bold',
    },
    sales_pro:{
        fontSize: 15,
        textDecorationLine: 'line-through',
        color: '#b3b3b3',
        marginRight: 5,
    }
})
