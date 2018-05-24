const viewnew=(state=0,action)=>{
    if(action.type=='CHECK_VIEW'){
        return 1;
    }
    return state;
}
export default viewnew;