import React,{ Component } from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import Weather from './Weather';

const API_KEY=""

export default class App extends Component {
  state = {
    isLoaded:false,
    error:null,
    temperature:null,
    name:null,
    desc:null,
    icons:null,
    sunrisetime:null,
    sunsettime:null
  };
  componentDidMount(){
    navigator.geolocation.getCurrentPosition(position => {
      this._getWeather(position.coords.latitude,position.coords.longitude)
    },
    error => {
      this.setState({
        error:error
      })
    })
  }
  _getWeather=(lat, lon) => {
    fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${API_KEY}`)
    .then(response => response.json())
    .then(json => {
      console.log(json)
      this.setState({
        temperature:json.main.temp,
        name:json.weather[0].main,
        desc:json.weather[0].description,
        sunrisetime:json.sys.sunrise,
        sunsettime:json.sys.sunset,
        isLoaded:true
      })
    })
  }
  render() {
    const { isLoaded, error, temperature, name, desc, sunrisetime, sunsettime } = this.state;
    return (
      <View style={styles.container}>
        <StatusBar hidden={ true } />
        {isLoaded ? ( 
          <Weather 
            weatherName={name}
            temp={Math.ceil(temperature - 273.15)}
            weatherDesc={desc}
            sunrisetime={sunrisetime}
            sunsettime={sunsettime}
          /> 
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