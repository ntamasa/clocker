import {
  AJAX,
  capitalize,
  getKeyByValue,
  countryList,
  months,
  numberDigit2,
  currentZone,
  getZone,
} from './helper.js';

// Get DOM elements to store data to request time
// const btn = document.querySelector(".form__btn");
// const formBox = document.querySelector(".form-box");
const formCountry = document.querySelector('.form-box__country');
const formCity = document.querySelector('.form-box__city');
const formContinent = document.querySelector('.form-box__continent');

// Main object
export const state = {
  clocks: {
    local: {},
    global: {},
    added: {},
  },
  coords: {}, // latitude : x, longitude: y
};

// Function to generate clocks objects
const createClocksObject = function (data) {
  // Storing API data in variable
  const response = data;

  // Helper variables for better readability
  const dateRes = response.formatted.split(' ')[0].split('-');
  const timeRes = response.formatted.split(' ')[1].split(':');

  return {
    time: {
      hour: numberDigit2(timeRes[0]), // returns 2 digit number
      minute: numberDigit2(timeRes[1]),
      second: numberDigit2(timeRes[2]),
    },
    zone: getZone(response),
    country: response.countryName,
    code: countryList[response.countryName],
    city: response.zoneName.split('/')[1],
    continent: response.zoneName.split('/')[0],
    date: {
      month: months[+dateRes[1] - 1],
      day: +dateRes[2],
    },
  };
};

// Function to generate added clocks object (different from othen clock objects)
const createAddedClocksObject = async function (data, apiKey) {
  try {
    // Storing API data in variable
    const response = data;

    // On wrong data given (guard clause)
    if (typeof currentZone(response) !== 'object') return {};

    // API call to get date, time information
    const timeDateData = await AJAX(
      `http://api.timezonedb.com/v2.1/get-time-zone?key=${apiKey}&format=json&by=zone&zone=${
        currentZone(response).zoneName
      }`
    );

    // Helper variables for better readability
    const dateRes = timeDateData.formatted.split(' ')[0].split('-');
    const timeRes = timeDateData.formatted.split(' ')[1].split(':');

    return {
      time: {
        hour: numberDigit2(timeRes[0]), // returns 2 digit number
        minute: numberDigit2(timeRes[1]),
        second: numberDigit2(timeRes[2]),
      },
      zone: getZone(currentZone(response)),
      country: capitalize(formCountry.value),
      code: countryList[capitalize(formCountry.value)],
      city: capitalize(formCity.value),
      continent: capitalize(formContinent.value),
      date: {
        month: months[+dateRes[1] - 1],
        day: +dateRes[2],
      },
    };
  } catch (err) {
    throw err;
  }
};

export const loadLocation = async function () {
  try {
    // Checking if the user's browser supports Geolocation API
    if (!navigator.geolocation)
      throw new Error('Geolocation is not supported by your browser!');

    // Getting and setting coordinates of current location (need promise to use await so the code waits for the data to arrive)
    const pos = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });

    state.coords.latitude = pos.coords.latitude;
    state.coords.longitude = pos.coords.longitude;
  } catch (err) {
    throw err;
  }
};

// Function for getting Local Time data
export const loadLocalClock = async function (
  apiKey,
  lat = state.coords.latitude,
  lng = state.coords.longitude
) {
  try {
    // API request for to get every other data for local clock
    const data = await AJAX(
      `http://api.timezonedb.com/v2.1/get-time-zone?key=${apiKey}&format=json&by=position&lat=${lat}&lng=${lng}`
    );

    // Fill up 'local' object
    state.clocks.local = createClocksObject(data);

    // TEST
    console.log(state.clocks.local);
  } catch (err) {
    throw err;
  }
};

////////////////////////////////////////////////
////////////////////////////////////////////////
////////////////////////////////////////////////
////////////////////////////////////////////////
////////////////////////////////////////////////
////////////////////////////////////////////////

export const loadGlobalTime = async function (apiKey) {
  try {
    // API request for to get every data for global clock
    const data = await AJAX(
      `http://api.timezonedb.com/v2.1/get-time-zone?key=${apiKey}&format=json&by=zone&zone=Europe/London`
    );

    // Fill up 'global' object
    state.clocks.global = createClocksObject(data);

    // TEST
    console.log(state.clocks.global);
  } catch (err) {
    throw err;
  }
};

// ////////////////////////////////////////////////
// ////////////////////////////////////////////////
// ////////////////////////////////////////////////
// ////////////////////////////////////////////////
// ////////////////////////////////////////////////
// ////////////////////////////////////////////////

export const loadAddedClock = async function (apiKey) {
  try {
    // If one of the input field is empty (guard clause)
    if (!formCountry.value || !formCity.value || !formContinent.value)
      return console.error('Please fill in all of the fields!');

    // Handle error if given country is invalid (guard clause)
    if (
      !Object.entries(countryList).some(
        el => formCountry.value.toLowerCase() === el[0].toLowerCase() // even if input country name is equal to current element[0] --> country name returns true else false
      )
    )
      return console.error(
        `Invalid Country '${formCountry.value}' given, please enter a valid Country`
      );

    // Getting 2 digit country code (US) from country (United States)
    const countryCode = countryList[capitalize(formCountry.value)];

    // API request to get country data to compair with given city, continent (later check if given country, continent, city is matching)
    const { zones: data } = await AJAX(
      `http://api.timezonedb.com/v2.1/list-time-zone?key=${apiKey}&format=json&country=${countryCode}`
    );

    // Fill up 'added' object
    state.clocks.added = await createAddedClocksObject(data, apiKey);

    // TEST
    console.log(state.clocks.added);
  } catch (err) {
    throw err;
  }
};
