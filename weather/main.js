import './style.css'

let lat;
let lon;
let key='17099f8cba3d29d42df295b18064691b';
let currentTemp=document.getElementById('currentTemp');
let currentLoc=document.getElementById('loc')
let currentWind=document.getElementById('wind');
let currentHumid=document.getElementById('humid');
let currentDate=document.getElementById('date');
let currentWeather=document.getElementById('weather');
let wthrIcon=document.getElementById('wthrIcon');
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(getLocation);
} else {
  x.innerHTML = "Geolocation is not supported by this browser.";
}
function getLocation(position){
  console.log(position);
  lat=position.coords.latitude;
  lon=position.coords.longitude;
  let urls=[`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&units=metric`];
  console.log(lat+".."+lon);
  let requests = urls.map(url=>{
  return fetch(url)
  .then(function(response) {
    // throw "uh oh!";  - test a failure
    return response.json();
  })  
});
Promise.all(requests)
.then((results) => {
  console.log(results[0]);
  setTemp(results[0].main);
  setPlace(results[0].name,results[0].sys,results[0].coord);
  setWeather(results[0].weather[0],results[0].wind)
}).catch(function(err) {
  console.log(err);
})
}
function setTemp(temp){
  currentTemp.innerHTML=(temp.temp)+"°C";
  currentHumid.innerHTML=temp.humidity+" gm3";
}
function setPlace(nme,sys,coord){
  currentLoc.innerText=nme+", "+sys.country;
  currentDate.innerHTML=Date.now();
}
function setWeather(weather,wind){
  currentWind.innerHTML=wind.speed+" Kmph";
  currentWeather.innerHTML=weather.main+'('+weather.description+')';
  wthrIcon.setAttribute('src',`https://openweathermap.org/img/wn/${weather.icon}@4x.png`)
}
document.getElementById('locInput').onsearch = ()=>{let searchKey=document.getElementById('locInput').value;
fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${searchKey}&limit=1&appid=${key}`).then(res=>{return res.json()}).then(data=>{console.log(data[0]);
let geoPosition={'coords':{'latitude':data[0].lat,'longitude':data[0].lon}}
getLocation(geoPosition)})};


