import React, { Component } from 'react';
import {
	View
} from 'react-native';
import Store from './src/redux/Store';
import { Provider } from 'react-redux';
import Route from './src/components/route/Route';

export default class App extends Component {
	render() {
		return (
			<Provider store={Store}>
				<Route />
			</Provider>
    	)
	}
}