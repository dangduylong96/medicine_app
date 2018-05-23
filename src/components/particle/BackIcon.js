import React, { Component } from 'react';
import {
    Dimensions,
    TouchableOpacity
} from 'react-native';
import { Icon } from 'react-native-elements';


var { height, width } = Dimensions.get('window');
import { connect } from 'react-redux';
class BackIcon extends Component{
    render(){
        return(
            <TouchableOpacity
                onPress={()=>this.props.route_navigation.navigate('App')}
            >
                <Icon 
                    type='MaterialIcons' 
                    name='arrow-back' 
                    color='white' 
                    containerStyle={{marginLeft: width/40}}
                />
            </TouchableOpacity>
        )
    }
}
function mapStateToProps(state) {
    return {
      route_navigation: state.route_navigation
    }
  }
export default connect(mapStateToProps)(BackIcon)