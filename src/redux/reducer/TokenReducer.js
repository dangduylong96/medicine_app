const token=(state='',action)=>{
    if(action.type=='SAVE_TOKEN'){
        return action.token
    }
    return state;
}
export default token;