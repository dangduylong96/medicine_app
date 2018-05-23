import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    Modal,
    ActivityIndicator,
    FlatList
} from 'react-native';
import { Button } from 'react-native-elements';
import { Icon } from 'react-native-elements'

var { height, width } = Dimensions.get('window');
import { connect } from 'react-redux';
import apiGetOrderHistory from '../../api/GetOrderHistory';

class OrderContent extends Component{
    constructor(props){
        super(props);
        this.state={
            modalVisible: true,
            dataOrder: []
        }
    }
    componentDidMount(){
        let url=this.props.url;
        let token=this.props.token;
        //Lấy tất cả đơn hàng của app
        apiGetOrderHistory(url,token)
        .then(res=>{
            console.log(res);
            this.setState({
                modalVisible: false,
                dataOrder: res
            })
        })
    }
    //Tổng tiền
    total(detail){
        let total=0;
        detail.forEach(e=>{
            let sales=parseInt(e.sales);
            let price=parseInt(e.price);
            let qty=parseInt(e.qty);
            total+=(price-sales)*qty;
        })
        return total.toString().replace(/(.)(?=(\d{3})+$)/g,'$1,');
    }
    //Xem chi tiết
    render(){
        const { wrapper, content, content_header, code, date, total, title_header, title_value, content_status, content_button }= ordercontent;
        const { url, route_navigation }= this.props;  
        const { dataProduct }=this.state;
        return(
            <View style={wrapper}>
                <FlatList
                        data={this.state.dataOrder}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={(data_item)=>
                        <View style={content}>
                            <View style={{margin: 5, marginLeft: 10, flex: 1}}>
                                <View style={content_header}>
                                    <View style={code}>
                                        <Text style={title_header}>Mã đơn</Text>
                                        <Text style={title_value}>{data_item.item.id}</Text>
                                    </View>
                                    <View style={date}>
                                        <Text style={title_header}>Ngày đặt</Text>
                                        <Text style={title_value}>{data_item.item.created_at}</Text>
                                    </View>
                                    <View style={total}>
                                        <Text style={title_header}>Tổng tiền</Text>
                                        <Text style={title_value}>{this.total(data_item.item.order_detail)} VNĐ</Text>
                                    </View>
                                </View>
                                <View style={content_status}>
                                    <Text style={{marginRight: 5}}>Trạng thái: </Text>
                                    <Icon
                                        name={data_item.item.status==0?'rocket':'pin'}
                                        type='entypo'
                                        color={data_item.item.status==0?'#ffcc00':'#3366ff'}
                                        containerStyle={{marginRight: 3}}
                                    />
                                    <Text style={{color: data_item.item.status==0?'#ffcc00':'#3366ff'}}>{data_item.item.status==0?'Đang giao':'Đã giao'}</Text>
                                </View>
                                <View style={content_button}>
                                    <Button
                                        onPress={()=>this.props.route_navigation.navigate('OrderDetailScreen',{detail: data_item.item.order_detail})}
                                        icon={{ name: 'eye', type: 'entypo' }}
                                        buttonStyle={{backgroundColor: '#00b359'}}
                                        title='Xem'
                                    />
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
export default connect(mapStateToProps)(OrderContent)
var ordercontent=StyleSheet.create({
    wrapper:{
        flex:12,
        backgroundColor:'#E0E0E0',
        alignItems: 'center'
    },
    content:{
        width: width*0.98,
        backgroundColor:'white',
        marginTop: height/120,
        height: height/4
    },
    content_header:{
        flexDirection: 'row',
        flex: 1
    },
    title_header:{
        fontWeight: 'bold',
        fontSize: 16,
        color: '#00b359'
    },
    title_value:{
        fontSize: 16,
        marginTop: 5,
        fontWeight: 'bold'
    },
    code:{
        flex: 1,
        alignItems: 'center'
    },
    date:{
        flex: 3,
        alignItems: 'center'
    },
    total:{
        flex: 3,
        alignItems: 'center'
    },
    content_status:{
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
    },
    content_button:{
        flex: 1
    }
})
// <View style={content}>
//     <View style={{margin: 5, marginLeft: 10, flex: 1}}>
//         <View style={content_header}>
//             <View style={code}>
//                 <Text style={title_header}>Mã đơn</Text>
//                 <Text style={title_value}>10</Text>
//             </View>
//             <View style={date}>
//                 <Text style={title_header}>Ngày đặt</Text>
//                 <Text style={title_value}>23/05/2018</Text>
//             </View>
//             <View style={total}>
//                 <Text style={title_header}>Tổng tiền</Text>
//                 <Text style={title_value}>17,000,000 VNĐ</Text>
//             </View>
//         </View>
//         <View style={content_status}>
//             <Text style={{marginRight: 5}}>Trạng thái: </Text>
//             <Icon
//                 name='pin'
//                 type='entypo'
//                 color='#3366ff'
//                 containerStyle={{marginRight: 3}}
//             />
//             <Text style={{color: '#3366ff'}}>Đã giao</Text>
//         </View>
//         <View style={content_button}>
//             <Button
//                 onPress={()=>console.log('a')}
//                 icon={{ name: 'eye', type: 'entypo' }}
//                 buttonStyle={{backgroundColor: '#00b359'}}
//                 title='Xem'
//             />
//         </View>
//     </View>
// </View>