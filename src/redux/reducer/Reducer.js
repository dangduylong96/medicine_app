import { combineReducers } from 'redux';
import url from './UrlReducer';
import token from './TokenReducer';

const Reducer= combineReducers({
    url: url,
    token: token
});
export default Reducer;