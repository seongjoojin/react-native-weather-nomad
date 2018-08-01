import React,{ Component } from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import Weather from './Weather';

export default class App extends Component {
  state = {
    isLoaded:false,
    error:null
  };
  componentDidMount(){
    navigator.geolocation.getCurrentPosition(position => {
      this.setState({
        isLoaded:true
      })
    },
    error => {
      this.setState({
        error:error
      })
    })
  }
  render() {
    const { isLoaded, error } = this.state;
    return (
      <View style={styles.container}>
        <StatusBar hidden={ true } />
        {isLoaded ? ( 
          <Weather /> 
          ) : ( 
          <View style={styles.loading}>
            <Text style={styles.loadingText}>Getting the weather</Text>
            {error ? <Text style={styles.errorrext}>{error}</Text> : null}
          </View> 
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  errorrext: {
    color:'red',
    paddingLeft:25,
    paddingBottom:40
  },
  loading: {
    flex:1,
    backgroundColor:'#fdf6aa',
    justifyContent:'flex-end'
  },
  loadingText: {
    fontSize:38,
    marginBottom:24,
    paddingLeft:25

  }
});