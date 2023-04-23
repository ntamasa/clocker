import {
  AJAX,
  capitalize,
  getKeyByValue,
  countryList,
  months,
  numberDigit2,
  currentZone,
  getZone,
  runEverySec,
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

  return {
    // Empty strings because they are loaded later in loadTime, but still has to create here
    time: {
      hour: '',
      minute: '',
      second: '',
    },
    zone: getZone(response),
    country: response.countryName,
    code: countryList[response.countryName],
    city: response.zoneName.split('/')[1],
    continent: response.zoneName.split('/')[0],
    date: {
      // Empty strings because they are loaded later in loadTime, but still has to create here
      month: '',
      day: '',
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

    return {
      // Empty strings because they are loaded later in loadTime, but still has to create here
      time: {
        hour: '',
        minute: '',
        second: '',
      },
      zone: getZone(currentZone(response)),
      country: capitalize(formCountry.value),
      code: countryList[capitalize(formCountry.value)],
      city: capitalize(formCity.value),
      continent: capitalize(formContinent.value),
      date: {
        // Empty strings because they are loaded later in loadTime, but still has to create here
        month: '',
        day: '',
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
export const loadTime = function (data) {
  const getTime = function () {
    const date = new Date(); // get local date
    const utcDate = new Date(date.getTime() + date.getTimezoneOffset() * 60000); // convert local date to utc date
    const zonedDate = new Date(
      utcDate.getTime() + data.zone * 60 * 60000 // convert utc date to a specific timezone date
    );

    // Fill up state object
    data.time.hour = zonedDate.getHours();
    data.time.minute = zonedDate.getMinutes();
    data.time.second = zonedDate.getSeconds();
  };

  const getDate = function () {
    const date = new Date(); // get local date
    const utcDate = new Date(date.getTime() + date.getTimezoneOffset() * 60000); // convert local date to utc date
    const zonedDate = new Date(
      utcDate.getTime() + data.zone * 60 * 60000 // convert utc date to a specific timezone date
    );

    // Fill up state object
    data.date.month = months[zonedDate.getMonth()];
    data.date.day = zonedDate.getDate();
  };

  // Need to call them first for an immediate time request
  getTime();
  getDate();

  // Calling the getTime and getDate functions in every second
  runEverySec(getTime);
  runEverySec(getDate);
};

export const saveZone = function (data) {
  // Guard clause (if wrong data given then returns)
  if (Object.keys(data).length === Object.keys({}).length) return;

  // Store data in localStorage
  localStorage.setItem(
    data.city,
    `${data.country},${data.city},${data.continent},UTC${
      data.zone >= 0
        ? `+${data.zone}` // If positive then UTC+VALUE, if negative then UTC-VALUE
        : data.zone
    }`
  );
};
