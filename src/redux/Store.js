import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import Reducer from './reducer/Reducer';

const Store=createStore(Reducer,applyMiddleware(thunk));
export default Store;