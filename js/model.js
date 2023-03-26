import {
  AJAX,
  capitalize,
  getKeyByValue,
  countryList,
  months,
} from "./helper.js";

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

// Function for getting Local Time data
export const _getLocalClock = async function (apiKey) {
  // Checking if the user's browser supports Geolocation API
  if (!navigator.geolocation) {
    throw new Error("Geolocation is not supported by your browser!");
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
    response.gmtOffset % 3600 === 0
      ? response.gmtOffset / 3600
      : Math.floor(response.gmtOffset / 3600) +
        0.6 * ((response.gmtOffset % 3600) / 3600);

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
  try {
    // Get DOM elements to store data to request time
    const btn = document.querySelector(".form__btn");
    const formBox = document.querySelector(".form-box");
    const formCountry = document.querySelector(".form-box__country");
    const formCity = document.querySelector(".form-box__city");
    const formContinent = document.querySelector(".form-box__continent");

    // Array for checking that the given country is located in the given continent
    const regions = await AJAX("http://worldtimeapi.org/api/timezone"); // Continent/Capital
    // const capitals = regions.map((e) =>
    //   e.split("/").length > 2 ? e.split("/")[2] : e.split("/")[1]
    // );

    btn.addEventListener("click", async () => {
      // Code after only runs if form is visible (Guard Clause)
      if (formBox.classList.contains("hidden")) return;

      // Handle error if given city isn't located in the given continent
      if (
        regions.every(
          (e) =>
            `${formContinent.value.toLowerCase()}/${formCity.value.toLowerCase()}` !==
            e.toLowerCase()
        )
      )
        throw new Error(
          `Given '${capitalize(
            formCity.value
          )}' city is not located in '${capitalize(formContinent.value)}'`
        );

      // Setting city, continent property a value
      clocks.added.city = formCity.value.toLowerCase();
      clocks.added.continent = formContinent.value.toLowerCase();

      // Handle error if given country is invalid
      if (
        Object.entries(countryList).every(
          (e) => formCountry.value.toLowerCase() !== e[0].toLowerCase()
        )
      )
        throw new Error(
          `Invalid Country '${formCountry.value}' given, please enter a valid Country`
        );

      // Setting country property a value
      clocks.added.country = formCountry.value.toLowerCase();

      // Setting code property a value
      clocks.added.code = countryList[capitalize(clocks.added.country)];

      // Function to get time data and store it in clocks.added object
      const getTime = async function (apiKey, countryCode) {
        if (!countryCode) throw new Error("Invalid Country given");

        // API request for checking if given Continent/Capital is matching with given Country
        // BUG if a country has more time zones it only gives back the first it gets
        const {
          zones: [res],
        } = await AJAX(
          `http://api.timezonedb.com/v2.1/list-time-zone?key=${apiKey}&format=json&country=${countryCode}`
        );

        // Handle error if given country isn't located in the given location (continent/capital)
        if (
          res.zoneName.toLowerCase() !==
          `${clocks.added.continent}/${clocks.added.city}`
        )
          throw new Error(
            `Invalid Country '${capitalize(
              clocks.added.country
            )}' paired with location '${capitalize(
              clocks.added.continent
            )}/${capitalize(clocks.added.city)}'`
          );

        // API request for getting time data via zone (continent/capital)
        const response = await AJAX(
          `http://api.timezonedb.com/v2.1/get-time-zone?key=${apiKey}&format=json&by=zone&zone=${res.zoneName}`
        );

        // Set property values of time object
        const timeArr = response.formatted.split(" ")[1].split(":");

        clocks.added.time.hour = timeArr[0];
        clocks.added.time.minute = timeArr[1];
        clocks.added.time.second = timeArr[2];

        // Set property values of date object
        clocks.added.date.month =
          months[+response.formatted.split(" ")[0].split("-")[1] - 1];

        clocks.added.date.day = response.formatted.split(" ")[0].split("-")[2];

        // Setting zone property a value
        clocks.added.zone =
          response.gmtOffset % 3600 === 0
            ? response.gmtOffset / 3600
            : Math.floor(response.gmtOffset / 3600) +
              0.6 * ((response.gmtOffset % 3600) / 3600);
      };
      await getTime(apiKey, clocks.added.code);

      // TEST
      console.log(clocks.added);
    });
  } catch (err) {
    throw err;
  }
};
