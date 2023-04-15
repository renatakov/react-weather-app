import React from "react";
import axios from "axios";
import s from "./Weather.module.css";

class Weather extends React.Component {
    state = {}
    inputCityRef = React.createRef();
    
    componentDidMount() {
        let city = "Kiev";
        if(localStorage.getItem("city")){
            city = localStorage.getItem("city");
        }
        axios.get(`http://api.weatherapi.com/v1/current.json?key=f57ded1f279f4aeaa14102446232101&q=${city}&aqi=no`)
        .then(res => {
            console.log(res.data);
            this.setState({
                temperature: res.data.current.temp_c,
                city: res.data.location.name,
                country: res.data.location.country,
                feelslike_c: res.data.current.feelslike_c,
                conditionText: res.data.current.condition.text,
            })
        })
        this.inputCityRef.current.addEventListener("input", () => {
            localStorage.setItem("city", this.inputCityRef.current.value);

        });
    }
    componentDidUpdate() {
        console.log("update")
    }
    // componentWillUnmount() {

    // }
    newWeather = () => {
        if(this.inputCityRef.current.value === ""){
            alert("Please Write a City");
        } else{
            axios.get(`http://api.weatherapi.com/v1/current.json?key=f57ded1f279f4aeaa14102446232101&q=${this.inputCityRef.current.value}&aqi=no`)
            .then(res => {
                console.log(res.data);
                this.setState({
                    temperature: res.data.current.temp_c,
                    city: res.data.location.name,
                    country: res.data.location.country,
                    feelslike_c: res.data.current.feelslike_c,
                    conditionText: res.data.current.condition.text,
                    icon: res.data.current.condition.icon,
                })
                this.inputCityRef.current.value = "";
            })
        }
    }
    render(){
        return(
                <>
            <main className={s.weatherMain}>
            <h1>WeatherApp</h1>
                <h2>{this.state.city}, {this.state.country}</h2>
                <h3>Temperature: {this.state.temperature}°C</h3>
                <h3>Feels Like: {this.state.feelslike_c}°C</h3>
                <div className={s.condition}>
                    <p>{this.state.conditionText}</p>
                    <img src={this.state.icon} alt=""/>
                </div>
            </main>
            <div className={s.newWeather}>

                <input ref={this.inputCityRef} type="text" placeholder="Write Your City"/>
                <button onClick={this.newWeather}>Submit</button>
            </div>
            </>
        )
    }
}
export default Weather;