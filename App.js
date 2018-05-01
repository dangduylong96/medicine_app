import React, { Component } from 'react';
import {
	View
} from 'react-native';
import Store from './src/redux/Store';
import { Provider } from 'react-redux';
import SwitchNavigator from './src/components/route/SwitchNavigator';

export default class App extends Component {
	render() {
		return (
			<Provider store={Store}>
				<SwitchNavigator />
			</Provider>
    	)
	}
}