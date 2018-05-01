import { SwitchNavigator } from 'react-navigation';
import AuthLoadingScreen from './AuthLoadingScreen';
import singleStack from './SingleStack';
import DrawerStack from './DrawerStack';

export default SwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: DrawerStack,
    Auth: singleStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
);
// export default SwitchNavigator;