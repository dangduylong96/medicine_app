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

class ContentProductDetail extends Component{
    constructor(props){
        super(props);
        this.state={
            modalVisible: false,
        }
    }
    componentDidMount(){
        
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
        const { wrapper }= contentproductdetail;
        const { url }= this.props;        
        return(
            <View style={wrapper}>
                <Text>Đây là trang detail</Text>
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
        backgroundColor:'#E0E0E0'
    }
})
function mapStateToProps(state) {
    return {
        url: state.url,
        token: state.token
    }
}
export default connect(mapStateToProps)(ContentProductDetail)