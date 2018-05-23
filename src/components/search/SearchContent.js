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
    Picker
} from 'react-native';
import { SearchBar, Button, Icon  } from 'react-native-elements';

var { height, width } = Dimensions.get('window');
import { connect } from 'react-redux';
import apiGetCategory from '../../api/GetCategory';
import apiSearchProduct from '../../api/SearchProduct';
import { addCart } from '../../redux/ActionCreators';

class SearchContent extends Component{
    constructor(props){
        super(props);
        this.state={
            list_product:[],
            modalVisible: false,
            list_category: [],
            pick_category: -1, //Mặc định là tất cả
            key_word: ''
        }
    }
    componentDidMount(){
        let url=this.props.url;
        this.setState({
            modalVisible: true
        })
        apiGetCategory(url)
        .then((res)=>{
            this.setState({
                list_category: res,
                modalVisible: false
            })
        })
    }
    addCart(item){
        this.props.addCart(item);
    }
    search(){
        this.setState({
            modalVisible: true
        })
        let keyword=this.state.key_word;
        let category=this.state.pick_category;
        let url=this.props.url;
        let token=this.props.token;
        apiSearchProduct(url,token,keyword,category)
        .then(res=>{
            if(res.length<1){
                alert('Không tìm thấy kết quả phù hợp!!!');
                this.setState({
                    list_product: [],
                    modalVisible: false
                })
            }else{
                this.setState({
                    list_product: res,
                    modalVisible: false
                })
            }
        })
    }
    render(){
        const { wrapper, wrapper_list_search, container_searchbar, inputstyle_searchbar, style_picker, item, image, view_image, view_detail, title_pro, cate_pro, sales_pro, action, view, addcart, wrapper_search, sales_label, sales_label1 }= searchcontent;
        const { url }= this.props;    
        let serviceItems = this.state.list_category.map( (e) => {
            return <Picker.Item key={e.id} value={e.id} label={e.name} />
        });    
        return(
            <View style={wrapper}>
                <View style={wrapper_search}>
                    <View style={{flexDirection: 'row',flex:1,alignItems: 'center'}}>
                        <View style={{flex:3}}>
                            <SearchBar
                                round
                                lightTheme
                                containerStyle={container_searchbar}
                                inputStyle={inputstyle_searchbar}
                                onChangeText={(keyword)=>this.setState({key_word: keyword})}
                                onClearText={()=>this.setState({key_word: ''})}
                                placeholder='Nhập từ khóa cần tìm kiếm ' 
                            />
                        </View>
                        <View style={style_picker}>
                            <Picker
                                lightTheme
                                selectedValue={this.state.pick_category}
                                style={{height: height/20}}
                                onValueChange={(itemValue, itemIndex) => this.setState({pick_category: itemValue})}>
                                <Picker.Item key="-1" value="-1" label="Tất cả" />
                                {serviceItems}
                            </Picker>
                        </View>
                    </View>
                    <View>
                        <Button
                            onPress={()=>this.search()}
                            buttonStyle={{marginBottom: 5,backgroundColor: '#3385ff'}}
                            icon={{name: 'search'}}
                            title='Tìm kiếm' 
                        />
                    </View>
                </View>
                <View style={wrapper_list_search}>
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
export default connect(mapStateToProps,{addCart: addCart})(SearchContent)

var searchcontent=StyleSheet.create({
    wrapper:{
        flex:12,
        backgroundColor:'#E0E0E0'
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
    },
    wrapper_list_search:{
        flex: 4
    },
    wrapper_search:{
        flex: 1,
        alignItems: 'center',
        justifyContent:'space-around',
        backgroundColor: 'white',
        marginTop: height/100,
        marginBottom: 5
    },
    container_searchbar:{
        backgroundColor: 'white',
        borderWidth: 0,
        shadowColor: 'white',
        borderBottomColor: 'transparent',
        borderTopColor: 'transparent',
        width: '100%'
    },
    inputstyle_searchbar:{

    },
    style_picker:{
        borderWidth: 1,
        width: '100%',
        flex: 1
    }
})
