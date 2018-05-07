const idDetailProduct=(state='',action)=>{
    if(action.type=='SET_ID_DETAIL'){
        return action.id;
    }
    return state;
}
export default idDetailProduct;