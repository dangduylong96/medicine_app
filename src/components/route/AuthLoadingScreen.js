import React, { Component } from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View
} from 'react-native';
import { connect } from 'react-redux';
import { saveToken, saveNavigation } from '../../redux/ActionCreators';

class AuthLoadingScreen extends Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

  _bootstrapAsync = async () => {
    // await AsyncStorage.clear();
    //Lưu cái navigation
    this.props.saveNavigation(this.props.navigation);

    //kiểm tra lần trc có đăng nhập hay chưa?
    const userToken = await AsyncStorage.getItem('@Mytoken');
    if (userToken) this.props.saveToken(userToken);
    this.props.navigation.navigate(userToken ? 'App' : 'Auth');
  };

  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
function mapStateToProps(state) {
  return {
    url: state.url,
    token: state.token,
    route_navigation: state.route_navigation
  }
}
export default connect(mapStateToProps, {saveToken: saveToken, saveNavigation: saveNavigation})(AuthLoadingScreen)