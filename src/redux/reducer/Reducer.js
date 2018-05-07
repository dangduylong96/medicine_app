import { combineReducers } from 'redux';
import url from './UrlReducer';
import token from './TokenReducer';
import route_navigation from './NavigationReducer';
import idDetailProduct from './DetailProductReducer';

const Reducer= combineReducers({
    url: url,
    token: token,
    route_navigation: route_navigation,
    idDetailProduct: idDetailProduct
});
export default Reducer;