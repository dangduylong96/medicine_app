const cart=(state=[{key:1,id: 1,name: 'Thông Xoang Tán',image: 'bEa35STTTG618944376037.jpg',price: 30000,sales: 5000,qty: 2}],action)=>{
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
        if(check==1) return result_state;
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
        return result_state;
    }
    //Xóa item
    if(action.type=='DELETE_ITEM_CART'){
        let id=action.id;
        let result_state=state.filter((item)=>{
            return item.id!=id
        })
        return result_state;
    }
    return state;
}
export default cart;