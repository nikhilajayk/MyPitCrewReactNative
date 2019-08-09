'use strict';

import React, { Component } from 'react';
import {
  Text,
  View,
  Button,
  ActivityIndicator,
  Image,
  ImageBackground,  
  Linking,
} from 'react-native';
import getCatalogue from "./api/productCatalogue"
import { YellowBox } from 'react-native';
import styles from './styles/homeStyles';
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

export default class Home extends Component {
    static navigationOptions = ({navigation}) => { return { headerTitle: <Text style={{color: 'white', fontSize: 18}}></Text>, headerTransparent: true, headerStyle: { borderBottomWidth: 0, } } }

  constructor(props) {
    super(props);   
    this.state = {
      isLoading: false,
    };
  }

  _onSearchPressed = () => {
    this.props.navigation.navigate('Results');
  };

  _onDownloadPressed = () => {
    this.setState({ isLoading: true });
    const link = getCatalogue()
     .then((downloadLink) => {this.setState({ isLoading: false}); // turn off spinner
     Linking.openURL(downloadLink);})
     .catch((err)=>{console.log('Unable to download the product catalogue!'+err);
     })
  };


  render() {
    const spinner = this.state.isLoading ?
    <ActivityIndicator size='large'/> : null;
    return (
      <ImageBackground  source={require('./resources/home.jpeg')} style={styles.container}> 
      <Image source={require('./resources/logo.png')} style={styles.frontPageLogo}/>
     <View style ={styles.OuterView}>
     
        <Text style={styles.description}>
          Welcome to MyPitCrew Automotive
        </Text>

         <Button style={styles.flowRight}
            onPress={this._onSearchPressed}
            color='#48BBEC'
            title='View All Products'
        />
         <Button style={styles.flowRight}
            onPress={this._onDownloadPressed}
            color='#48BBEC'
            title='Download Catalogue'
        />
</View>
{spinner}
<Text style={styles.description}>{this.state.message}</Text>
      </ImageBackground>
    );
  }
  
}


