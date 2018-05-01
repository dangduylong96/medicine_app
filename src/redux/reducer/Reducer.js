import { combineReducers } from 'redux';
import url from './UrlReducer';

const Reducer= combineReducers({
    url: url
});
export default Reducer;