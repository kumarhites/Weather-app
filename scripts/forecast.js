class Forecast{
    constructor(){
        this.key = "uiGfIvA1sXQTwRj8lgGMJPZx1vnBGZPG";
        this.weatherURI = "https://dataservice.accuweather.com/currentconditions/v1/";
        this.cityURI = "https://dataservice.accuweather.com/locations/v1/cities/search";
    }
    
    async updateCity(city){
        const cityDetails = await this.getCity(city);
        const weather = await this.getWeather(cityDetails.Key);
        //?object short hand notation can be used when the objectName and propertyName is same
        return {cityDetails, weather}; 
    }
    async getCity(city){
        const query = `?apikey=${this.key}&q=${city}`; 
        const response = await fetch(this.cityURI + query);
        const data = await response.json();
        return data[0];
    }
    async getWeather(id){
        const query = `${id}?apikey=${this.key}`;
        const response = await fetch(this.weatherURI + query);
        const data = await response.json();
        return data[0];
    }
}