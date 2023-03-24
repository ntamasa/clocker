import { AJAX, capitalize, getKeyByValue, countryList } from "./helper.js";

// Object to store every clock's data
export const clocks = {
  // Local clock's data
  local: {
    coords: {},
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
  },

  // Global clock's data
  global: {
    coords: {},
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
  },

  // Added clock's data
  added: {
    coords: {},
    time: {
      hour: 0,
      minute: 0,
    },
    zone: "",
    country: "",
    code: "",
    city: "",
    continent: "",
    date: {
      month: "",
      day: 0,
    },
  },
};

// Array for month names
// prettier-ignore
const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];

// Function for getting Local Time data
export const _getLocalClock = async function (apiKey) {
  // Checking if the user's browser supports Geolocation API
  if (!navigator.geolocation) {
    console.log("Geolocation is not supported by your browser!");
    return;
  }

  navigator.geolocation.getCurrentPosition(
    async function (data) {
      // Getting coordinates of current location
      const { latitude } = data.coords;
      const { longitude } = data.coords;

      // Setting coords for local clock
      clocks.local.coords = { lat: latitude, lng: longitude };

      // API request for to get every other data for local clock
      const response = await AJAX(
        `http://api.timezonedb.com/v2.1/get-time-zone?key=${apiKey}&format=json&by=position&lat=${clocks.local.coords.lat}&lng=${clocks.local.coords.lng}`
      );

      // Helper variables for better readability
      const dateRes = response.formatted.split(" ")[0].split("-");
      const timeRes = response.formatted.split(" ")[1].split(":");

      // Setting clock object's property values
      clocks.local.time = {
        hour: +timeRes[0],
        minute: +timeRes[1],
        second: +timeRes[2],
      };
      clocks.local.zone =
        response.gmtOffset % 3600 === 0 //false
          ? response.gmtOffset / 3600 // nem fut le
          : Math.floor(response.gmtOffset / 3600) + // 8
            0.6 * ((response.gmtOffset % 3600) / 3600); // 60 * 0.75
      clocks.local.country = response.countryName;

      clocks.local.date = {
        month: months[+dateRes[1]],
        day: +dateRes[2],
      };

      // TEST
      console.log(clocks.local);
    },
    // Error branch
    function () {
      alert("Could not get your location!");
    }
  );
};

////////////////////////////////////////////////
////////////////////////////////////////////////
////////////////////////////////////////////////
////////////////////////////////////////////////
////////////////////////////////////////////////
////////////////////////////////////////////////

// Function for getting World Time data
export const _getWorldClock = async function (apiKey) {
  // API request for to get every data for global clock
  const response = await AJAX(
    `http://api.timezonedb.com/v2.1/get-time-zone?key=${apiKey}&format=json&by=zone&zone=Europe/London`
  );

  // Helper variables for better readability
  const dateRes = response.formatted.split(" ")[0].split("-");
  const timeRes = response.formatted.split(" ")[1].split(":");

  // Setting clock object's property values
  clocks.global.time = {
    hour: +timeRes[0],
    minute: +timeRes[1],
    second: +timeRes[2],
  };
  clocks.global.zone =
    response.gmtOffset % 3600 === 0 //false
      ? response.gmtOffset / 3600 // nem fut le
      : Math.floor(response.gmtOffset / 3600) + // 8
        0.6 * ((response.gmtOffset % 3600) / 3600); // 60 * 0.75

  // Outputs London (As if it is WORLD time, sites often refer to London)
  clocks.global.country = response.zoneName.split("/")[1];
  clocks.global.date = {
    month: months[+dateRes[1]],
    day: +dateRes[2],
  };

  // TEST
  console.log(clocks.global);
};

////////////////////////////////////////////////
////////////////////////////////////////////////
////////////////////////////////////////////////
////////////////////////////////////////////////
////////////////////////////////////////////////
////////////////////////////////////////////////

export const _getAddedClock = async function (apiKey) {
  const btn = document.querySelector(".form__btn");
  const formBox = document.querySelector(".form-box");
  const formCountry = document.querySelector(".form-box__country");
  const formCity = document.querySelector(".form-box__city");
  const formContinent = document.querySelector(".form-box__continent");

  const response = await AJAX(
    "http://worldtimeapi.org/api/timezone/Australia/Eucla"
  );
  console.log(response);

  // Array for checking that the given country is located in the given continent
  const regions = await AJAX("http://worldtimeapi.org/api/timezone"); // Continent/Capital

  btn.addEventListener("click", () => {
    // Code that only runs if form is visible
    if (formBox.classList.contains("hidden")) {
      // Setting zone property a value
      const zoneArr = response.utc_offset.split(":");
      clocks.added.zone =
        +zoneArr[1] === 0 ? +zoneArr[0] : +zoneArr[0] + +zoneArr[1] / 100;

      // Setting city property a value
      if (
        regions.some(
          (e) =>
            formCity.value.toLowerCase() ===
            (e.split("/")[1] + "").toLowerCase()
        )
      )
        clocks.added.city = formCity.value;

      // Setting country property a value
      if (
        Object.entries(countryList).some(
          (e) => formCountry.value.toLowerCase() === e[0].toLowerCase()
        )
      )
        clocks.added.country = formCountry.value;

      // Setting continent property a value
      if (
        regions.some(
          (e) =>
            formContinent.value.toLowerCase() ===
            (e.split("/")[0] + "").toLowerCase()
        )
      )
        clocks.added.continent = formContinent.value;

      // Setting country property a value
      countryList[getKeyByValue(countryList, capitalize(formCountry.value))];

      // Setting code property a value
      clocks.added.code = countryList[capitalize(clocks.added.country)];

      // TEST
      console.log(clocks.added);
    }
  });

  ////////////////////////
  ////////////////////////
  ////////////////////////
  ////////////////////////
  ////////////////////////

  // const res = await AJAX(
  //   `http://api.timezonedb.com/v2.1/list-time-zone?key=${apiKey}&format=json&country=${countryCode}`
  // );

  // const response = await AJAX(
  //   `http://api.timezonedb.com/v2.1/get-time-zone?key=${apiKey}&format=json&by=zone&zone=Europe/London`
  // );

  // clocks.added.time = ;
  // clocks.added.date = ;
};
