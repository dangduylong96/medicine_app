const route_navigation=(state='',action)=>{
    if(action.type=='SAVE_NAVIGATION'){
        return action.route_navigation;
    }
    return state;
}
export default route_navigation;