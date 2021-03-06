const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('video.time');
const icon = document.querySelector('.icon img');
const formInput = document.querySelector('.formInput');
const forecast = new Forecast();

cityForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // get the city value
    const city = cityForm.city.value.trim();
    cityForm.reset();
    // get the data and update the ui 
    forecast.updateCity(city)
        .then(data => updateUI(data))
        .catch(err => console.log(err));


    //! adding city to local storage
    localStorage.setItem('city', city);
});

const updateUI = (data) => {

    // destructure properties
    const {cityDetails, weather} = data;

    // update the details template
    details.innerHTML = `
        <h5 class="mt-3 mx-3 text-center">${cityDetails.EnglishName}</h5>
        <div class="mb-3 mx-3 text-center">${weather.WeatherText}</div>
        <div class="display-3 m-3 text-center pb-2">
            <span>${weather.Temperature.Metric.Value}</span>
            <span>&deg;C</span>
        </div>
    `;
    const no = Math.floor(Math.random()*2) + 1;
    // update day and night and time icons and images
    let timeSrc = null;
    if(weather.IsDayTime){
        timeSrc = `./img/dayTime${no}.mp4`;
        document.body.classList.remove("bg-dark");
        card.style.backgroundColor = "#fff";
        formInput.classList.remove("bg-dark");
        formInput.classList.remove("text-light");
    }
    else{
        timeSrc = `./img/nightTime${no}.mp4`;
        
        card.style.backgroundColor = '#181818';
        document.body.classList.add("bg-dark");
        formInput.classList.add("bg-dark");
        formInput.classList.add("text-light");
    }
    time.setAttribute('src', timeSrc);

    // remove d-none class if present
    if(card.classList.contains("d-none")){
        card.classList.remove("d-none");
    }

    const iconSrc = `./icons/${weather.WeatherIcon}.svg`;
    icon.setAttribute('src', iconSrc);
};


//! check if there is data in local storage

if(localStorage.getItem('city')){
    forecast.updateCity(localStorage.getItem('city'))
        .then(data => updateUI(data))
        .catch(err => console.log(err));
}
