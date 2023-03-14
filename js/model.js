// import { async } from "regenerator-runtime";
// import "regenerator-runtime/runtime";

export const clock = {
  coords: [],
  time: {
    hour: 0,
    minute: 0,
  },
  zone: "",
  country: "",
  date: {
    month: "",
    day: 0,
  },
};

export const _getPosition = async function () {
  if (!navigator.geolocation) {
    console.log("Geolocation is not supported by your browser!");
    return;
  }

  navigator.geolocation.getCurrentPosition(
    this._loadData.bind(this),
    function () {
      alert("Could not get your location!");
    }
  );
};

export const _loadData = async function (data) {
  // prettier-ignore
  const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];

  const { latitude } = data.coords;
  const { longitude } = data.coords;

  const date = new Date();

  //////////////////////////

  clock.coords = [latitude, longitude];

  // if (
  //   clock.time.hour !== date.getHours() ||
  //   clock.time.minute !== date.getMinutes()
  // ) {

  clock.time = {
    hour: date.getHours(),
    minute: date.getMinutes(),
  };
  // }

  // exports -60 so take 2nd number out if it is 0
  clock.zone = date.getTimezoneOffset();

  // clock.country = ipGeolocationAPI

  clock.date = {
    month: months[date.getMonth()],
    day: date.toString().split(" ")[2],
  };

  console.log(clock);
};

///////////////
// API
export const _API = function (apiKey) {
  fetch(`https://extreme-ip-lookup.com/json/?key=${apiKey}`)
    .then((res) => res.json())
    .then((response) => {
      clock.country = response.country;
      console.log("Country: ", response.country, "\n", "City: ", response.city);
    })
    .catch((data, status) => {
      console.log("Request failed");
    });

  console.log(clock);
};

///////////////
// IP Geolocation API

// import IPGeolocationAPI from "/node_modules/ip-geolocation-api-javascript-sdk/IPGeolocationAPI.js";

// export const _API = function (apiKey) {
//   // Basic setup based of API Documentation

//   var TimezoneParams = require("ip-geolocation-api-javascript-sdk/TimezoneParams.js");

//   // const IPGeolocationAPI = require("ip-geolocation-api-javascript-sdk");
//   // const ipgeolocationApi = new IPGeolocationAPI(apiKey, false);

//   // Function to handle response from API
//   function _handleResponse(json) {
//     console.log(json);
//   }

//   var GeolocationParams = require("ip-geolocation-api-javascript-sdk/GeolocationParams.js");
//   ipgeolocationApi.getGeolocation(_handleResponse);

//   // Finish
//   ipgeolocationApi.getGeolocation(_handleResponse, geolocationParams);
// };
