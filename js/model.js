import {
  AJAX,
  capitalize,
  getKeyByValue,
  countryList,
  months,
  numberDigit2,
  // currentZone,
} from './helper.js';

// Get DOM elements to store data to request time
// const btn = document.querySelector(".form__btn");
// const formBox = document.querySelector(".form-box");
const formCountry = document.querySelector('.form-box__country');
const formCity = document.querySelector('.form-box__city');
const formContinent = document.querySelector('.form-box__continent');

export const state = {
  clocks: { local: {}, global: {}, added: {} },
  coords: [{ latitude: '', longitude: '' }],
};

const createAddedClocksObject = async function (data) {
  const response = data;

  const timeDateData = await AJAX(
    `http://api.timezonedb.com/v2.1/get-time-zone?key=${apiKey}&format=json&by=zone&zone=${
      currentZone(response).zoneName
    }`
  );

  const dateRes = timeDateData.formatted.split(' ')[0].split('-');
  const timeRes = timeDateData.formatted.split(' ')[0].split(':');

  return {
    time: {
      hour: numberDigit2(timeRes[0]),
      minute: numberDigit2(timeRes[1]),
      second: numberDigit2(timeRes[2]),
    },
    zone:
      currentZone(response).gmtOffset % 3600 === 0
        ? currentZone(response).gmtOffset / 3600
        : Math.floor(currentZone(response).gmtOffset / 3600) +
          0.6 * ((currentZone(response).gmtOffset % 3600) / 3600),
    country: capitalize(formCountry.value), //*
    code: countryList[capitalize(formCountry.value)], //*
    city: capitalize(formCity.value), //*
    continent: capitalize(formContinent.value), //*
    date: {
      month: months[+dateRes[1]],
      day: +dateRes[2],
    },
  };
};

const createClocksObject = function (data, added = false) {
  // Storing API data in variable
  const response = data;

  // let addedResponse;
  // if (added) {
  //   addedResponse = await AJAX(
  //     `http://api.timezonedb.com/v2.1/get-time-zone?key=${apiKey}&format=json&by=zone&zone=${
  //       currentZone(response).zoneName
  //     }`
  //   );
  // }

  // Helper variables for better readability
  const dateRes = response.formatted.split(' ')[0].split('-');
  // const dateRes = added
  //   ? addedResponse.formatted.split(' ')[0].split('-')
  //   : response.formatted.split(' ')[0].split('-');
  const timeRes = response.formatted.split(' ')[1].split(':');
  // const timeRes = added
  //   ? addedResponse.formatted.split(' ')[0].split(':')
  //   : response.formatted.split(' ')[1].split(':');

  return {
    time: {
      hour: numberDigit2(timeRes[0]),
      minute: numberDigit2(timeRes[1]),
      second: numberDigit2(timeRes[2]),
    },
    zone:
      response.gmtOffset % 3600 === 0
        ? response.gmtOffset / 3600
        : Math.floor(response.gmtOffset / 3600) +
          0.6 * ((response.gmtOffset % 3600) / 3600),
    country: response.countryName,
    code: countryList[response.countryName],
    city: response.zoneName.split('/')[1],
    continent: response.zoneName.split('/')[0],
    date: {
      month: months[+dateRes[1]],
      day: +dateRes[2],
    },
  };
};

export const loadLocation = async function () {
  try {
    // Checking if the user's browser supports Geolocation API
    if (!navigator.geolocation)
      throw new Error('Geolocation is not supported by your browser!');

    // Getting and setting coordinates of current location
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
export const getLocalClock = async function (
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

export const getAddedClock = async function (apiKey) {
  try {
    // If one of the input fields is empty
    if (!formCountry || !formCity || !formContinent)
      return new Error('Please fill in all of the fields!');

    // Handle error if given country is invalid
    if (
      Object.entries(countryList).every(
        e => formCountry.value.toLowerCase() !== e[0].toLowerCase()
      )
    )
      return new Error(
        `Invalid Country '${formCountry.value}' given, please enter a valid Country`
      );

    // API request for checking if given Continent/Capital is matching with given Country
    // BUG if a country has more time zones it only gives back the first it gets

    const countryCode = capitalize(countryList[capitalize(formCountry.value)]);
    const countryCodeTEST = countryList['United States'];
    console.log(countryCodeTEST);
    const { zones: data } = await AJAX(
      `http://api.timezonedb.com/v2.1/list-time-zone?key=${apiKey}&format=json&country=${countryCode}`
    );

    state.clocks.added = createAddedClocksObject(data);

    // TEST
    console.log(state.clocks.added);
  } catch (err) {
    throw err;
  }
};
