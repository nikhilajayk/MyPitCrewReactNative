'use strict';
import styles from './styles/searchResultsStyles';
import React, { Component } from 'react'
import {
  StyleSheet,
  Image,
  View,
  TouchableHighlight,
  FlatList,
  Text,
  Linking,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import _ from "lodash"
import {contains, getProducts} from "./api/products"
import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

class ListItem extends React.PureComponent {
    _onPress = () => {
      this.props.onPressItem(this.props.index);
    }
  
    render() {
      const item = this.props.item;
      console.log("rendering ...")
      const name = item.name;
      return (
        <TouchableHighlight
          onPress={this._onPress}
          underlayColor='#dddddd'>
          <View>
            <View style={styles.rowContainer}>
            <Image source={require('./resources/logo.png')} style={styles.thumb}/>
              <View style={styles.textContainer}>
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.category}
                  numberOfLines={2}>{item.category}</Text>
              </View>
            </View>
            <View style={styles.separator}/>
          </View>
        </TouchableHighlight>
      );
    }
  }

  export default class SearchResults extends Component {
    static navigationOptions = {
      title: 'Products',
    };

    constructor(props){
        super(props);
        console.log("in constructor");
        this.state={
            loading:false,
            data:[],
            error:null,
            query:"",
            fullData:[],
        }
    }
    componentDidMount(){
        console.log("componentDidMount");
        this.makeRemoteRequest();
    }   

    makeRemoteRequest=()=>{
        console.log("makeRemoteRequest");
         this.setState({loading:true});
         getProducts()
         .then(products=>{this.setState({
            loading:false,
            data: products,
            fullData: products
        })
     })
     .catch(error => {
         console.log("makeRemoteRequest:Error making remote request .. "+error)
         this.setState({error,loading:false});
     });
     };

  
    _keyExtractor = (item, index) => index.toString();
  
    _renderItem = ({item, index}) => (
        <ListItem
          item={item}
          index={index}
          onPressItem={this._onPressItem}
        />
      );
      
      _onPressItem = (index) => {
        try{
        Linking.openURL(this.state.data[index].hyperlink);
        }
        catch(err){
            console.log("Error(_onPressItem):"+err)
        }
      };
  
    render() {
        const spinner = this.state.loading?
        <ActivityIndicator size='large'/> : null;
      return (
          <View>
        <View style={styles.flowRight}>
        <TextInput
            underlineColorAndroid={'transparent'}
            style={styles.searchInput}
            onChange={this._onSearchTextChanged}
            placeholder='Type your product name/category here'/>           
        </View>
        <FlatList         
          data={this.state.data}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
        />
        {spinner}
        </View>
      );
    }

    _onSearchTextChanged = (event) => {
        console.log('_onSearchTextChanged');
        const text = event.nativeEvent.text;  
        const formatQuery = text.toLowerCase();
        const filterData = _.filter(this.state.fullData,product=>{
            return contains(product,formatQuery)});
        this.setState({data:filterData})
       };
  }