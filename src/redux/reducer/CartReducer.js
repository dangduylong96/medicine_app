import {
    AsyncStorage
} from 'react-native';
save = async (cart) => {
    try {
        let data=JSON.stringify(cart);
        await AsyncStorage.setItem('@MyCart', data);
    } catch (error) {
        alert('Bạn chưa kích hoạt quyền cho ứng dụng!!');
    }
}
const cart=(state=[],action)=>{
    //Lưu lại toàn bộ giỏ hàng
    if(action.type=='SET_CART'){
        return action.cart;
    }
    //Thêm item hoặc tăng giảm
    if(action.type=='ADD_CART'){
        let item=action.item;
        let check=0; //check =0 là chưa tồn có sản phẩm
        let result_state=state.map((e)=>{
            if(e.id==item.id){
                check=1;//Đã có sản phẩm
                let qty=parseInt(e.qty)+parseInt(item.qty);
                if(qty<1) qty=1;
                return {
                    ...e,
                    qty: qty
                }
            }
            return e;
        })
        if(check==1){
            //Lưu vào storage
            this.save(result_state);
            return result_state;
        }
         //Lưu vào storage
        this.save(state.concat(item));
        return state.concat(item);
    }
    //Sửa số lượng
    if(action.type=='CHANGE_QTY_CART'){
        let id=action.id;
        let qty=action.qty;
        let result_state=state.map((item)=>{
            if(item.id==id){
                return {
                    ...item,
                    qty: qty
                }
            }
            return item;
        })
        //Lưu vào storage
        this.save(state.concat(result_state));
        return result_state;
    }
    //Xóa item
    if(action.type=='DELETE_ITEM_CART'){
        let id=action.id;
        let result_state=state.filter((item)=>{
            return item.id!=id
        })
        //Lưu vào storage
        this.save(state.concat(result_state));
        return result_state;
    }
    return state;
}
export default cart;