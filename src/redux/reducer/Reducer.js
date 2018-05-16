import { combineReducers } from 'redux';
import url from './UrlReducer';
import token from './TokenReducer';
import route_navigation from './NavigationReducer';
import cart from './CartReducer';

const Reducer= combineReducers({
    url: url,
    token: token,
    route_navigation: route_navigation,
    cart: cart
});
export default Reducer;