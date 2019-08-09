'use strict';
import {
  createStackNavigator,
} from 'react-navigation';
import Home from './Home';
import SearchResults from './SearchResults';

const App = createStackNavigator({
  Home: { screen: Home },
  Results: { screen: SearchResults },
});
export default App;

