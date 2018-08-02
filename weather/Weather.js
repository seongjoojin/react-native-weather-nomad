import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import PropTypes from 'prop-types';

const weatherCases = {
    Rain: {
        colors:["#00C6FB","#005BEA"],
        title:"Raining",
        icons:'weather-pouring'
    },
    Clear: {
        colors:["#FEF253","#FF7300"],
        title:"Sunny",
        icons:'weather-sunny'
    },
    Thunderstorm: {
        colors:["#00ECBC","#007ADF"],
        title:"Thunderstorm in the house",
        icons:'weather-lightning'
    },
    Clouds: {
        colors:["#D7D2CC","#304352"],
        title:"Clouds",
        icons:'weather-cloudy'
    },
    Snow: {
        colors:["#7DE2FC","#B9B6E5"],
        title:"Snow",
        icons:'weather-snowy'
    },
    Drizzle: {
        colors:["#89F7FE","#66A6FF"],
        title:"Drizzle",
        icons:'weather-rainy'
    },
    Atmosphere: {
        colors:["#403B4A","#E7E9BB"],
        title:"Fog",
        icons:'weather-fog'
    }
}

export default class Weather extends Component {
    state = {
        weatherIcons:null,
        weatherColors:[],
        weatherTitle:null,
        WeatherSubtitle:null
    }
    componentWillMount(){
        let timeStateArray = 
        this.props.weatherIcons.indexOf("n") ? 
        [
            "weather-night",
            ["#3498DB","#2C3E50"],
            "Night",
            "Good Night 😴"
        ] : [
            (weatherCases[this.props.weatherName].icons).toString(),
            (weatherCases[this.props.weatherName].colors),
            (weatherCases[this.props.weatherName].title).toString(),
            (this.props.weatherDesc).toString()
        ]
        console.log(timeStateArray[1])
        this.setState({
            weatherIcons:timeStateArray[0],
            weatherColors:timeStateArray[1],
            weatherTitle:timeStateArray[2],
            WeatherSubtitle:timeStateArray[3]
        })
    }
    render(){
        let { weatherIcons, weatherColors, weatherTitle, WeatherSubtitle } = this.state
        console.log(weatherColors)
        return(
            <LinearGradient 
                colors={weatherColors}
                style={styles.container} 
            >
                <View style={styles.upper}>
                    <MaterialCommunityIcons 
                        color="white"
                        size={144}
                        name={weatherIcons}
                    />
                    <Text style={styles.temp}>
                        {this.props.temp}℃
                    </Text>
                </View>
                <View style={styles.lower}>
                    <Text style={styles.title}>
                        {weatherTitle}
                    </Text>
                    <Text style={styles.subtitle}>
                        {WeatherSubtitle}
                    </Text>
                </View>
            </LinearGradient>
        )
    }
}

Weather.propTypes = {
    temp:PropTypes.number.isRequired,
    weatherName:PropTypes.string.isRequired,
    weatherDesc:PropTypes.string.isRequired,
    weatherIcons:PropTypes.string.isRequired
}

const styles = StyleSheet.create({
    container: {
        flex:1
    },
    upper: {
        flex: 1,
        alignItems:'center',
        justifyContent:'center'
    },
    temp: {
        fontSize:48,
        color:'white',
        marginTop:10
    },
    lower: {
        flex:1,
        alignItems:'flex-start',
        justifyContent:'flex-end',
        paddingLeft:25
    },
    title: {
        fontSize:38,
        color:'white',
        paddingBottom:10,
        fontWeight:'300'
    },
    subtitle: {
        fontSize:24,
        color:'white',
        paddingBottom:24
    }
})