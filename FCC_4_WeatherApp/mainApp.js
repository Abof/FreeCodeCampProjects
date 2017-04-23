/* 
 * MAIN FUNCTIONS ===========================================================================
 */
/* Main app flow triggered when DOM is ready */
$(document).ready(function() {
  getUserPositionByIp() // Promise
    .then(getWeatherInfoByUserPostion) // Promise
    .then(propagateWeatherInfo)
    .then(enableTempSwitches)
    .catch(log); // TODO ERROR HANDLING BY SETTING SOME CRAZY STUFF ;)
});

/* Async function to get user position by IP from 'ipinfo.io' */
function getUserPositionByIp() {
  return new Promise(function(resolve, reject) {
    $.getJSON("https://cors-anywhere.herokuapp.com/https://ipinfo.io/json", function(ipPosInfo) {
      // Split comma separated string into array of rounded numbers
      var coordsArray = ipPosInfo.loc.split(',').map(roundMe);
      // Create return 'position' object
      var position = {
        latitude: coordsArray[0],
        longitude: coordsArray[1]
      };
      resolve(position);
    });
  });
};

/* Async function by get weather info by user position; using 'api.openweathermap.org' */
// 51.0167,15.5167
function getWeatherInfoByUserPostion(position) {
  return new Promise(function(resolve, reject) {
    if (Boolean(position.latitude) && Boolean(position.longitude)) {
      var openWeatherApiUrl = 'http://api.openweathermap.org/data/2.5/weather?lat=' + position.latitude + '&lon=' + position.longitude + '&appid=ac5822f14d3af71f59d8fc3a092566d7';
      $.getJSON(openWeatherApiUrl, function(json) {
      // $.getJSON(openWeatherApiUrl, function(json) {
        resolve(json);
      });
    }else{
      reject("Get weather failed to proceed due to lack of position object values!");
    }
  });
};

/* Function to propagate weather into to page */
function propagateWeatherInfo(weatherInfo){
   // BRIEFING
   var briefing = "briefing no. " + weatherInfo.sys.country.toUpperCase() + "/" + weatherInfo.name.toUpperCase() + "/" + weatherInfo.coord.lat + "/N/" + weatherInfo.coord.lon + "/E";
  $("#coords").html(briefing);
   // WEATHER VERBAL DESCRIPTIONs
    var weatherDesc = "(" + weatherInfo.weather.map(function(w) {
        return w.description;
    }).join(', ') + ")";
    $("#weather-desc").html(weatherDesc);
    // WIND + HUMIDITY
    $("#wind").html(weatherInfo.wind.speed + " m/s");
    $("#humidity").html(weatherInfo.main.humidity + " %");
    // TEMPERATURES (TODO : MAKE SEPARATE FUNCTION FOR CALCULATION)
    tempInKelvins = weatherInfo.main.temp;
    tempInCelcious = tempInKelvins - 273.15;
    tempInFarenheits = tempInKelvins * (9 / 5) - 459.67;
    $("#temp").html(Math.round(tempInCelcious));
    
   // WEATHER ICON
    var clazz = determineWeatherIconsCssClass(weatherInfo.weather[0].icon);
    $('#weather-icon i.wi').removeClass().addClass('wi ' + clazz);
}

/* 
 * MISC FUNCTIONS ===========================================================================
 */
function roundMe(val){
    return Math.round(val * 100) / 100;
};

function log(msg){
  console.log(msg);
}

/* GLOBAL VARs FOR CALCULATED TEMPERATURES */
var tempInKelvins = 'N/A';
var tempInCelcious = 'N/A';
var tempInFarenheits = 'N/A';

function enableTempSwitches(){
    /* CELSIUS DEGREES SWITCH ACTION */
  $('#celsius-switch').click(function() {
    var cSwitch = $("#celsius-switch");
    if (!cSwitch.hasClass("enabled")) {
      $('#temp').html(Math.round(tempInCelcious));
      cSwitch.toggleClass("enabled");
      $('#farenheit-switch').toggleClass("enabled");
    }
  });

  /* FARENHEIT DEGREES SWITCH ACTION */
  $('#farenheit-switch').click(function() {
    var fSwitch = $("#farenheit-switch");
    if (!fSwitch.hasClass("enabled")) {
      $('#temp').html(Math.round(tempInFarenheits));
      fSwitch.toggleClass("enabled");
      $('#celsius-switch').toggleClass("enabled");
    }
  });
}

$.ajaxSetup({
  cache: false
});

// Function that translate weather icon name from openweather to CSS class of erikflowers-weather-icons 
function determineWeatherIconsCssClass(openWeatherIconCode) {
  switch (openWeatherIconCode) {
    case '01d':
      return 'wi-day-sunny';
    case '01n':
      return 'wi-night-clear';
    case '02d':
      return 'wi-day-cloudy';
    case '02n':
      return 'wi-night-alt-cloudy';
    case '03d':
    case '03n':
      return 'wi-cloud';
    case '04d':
    case '04n':
      return 'wi-cloudy';
    case '09d':
    case '09n':
      return 'wi-rain';
    case '10d':
      return 'wi-day-rain';
    case '10n':
      return 'wi-night-rain';
    case '11d':
    case '11n':
      return 'wi-thunderstorm';
    case '13d':
      return 'wi-day-snow';
    case '13n':
      return 'wi-night-alt-snow';
    case '50d':
    case '50n':
      return 'wi-fog';
    default:
      return 'wi-meteor'; // simply for fun :)
  }
}
