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

export const getPosition = async function () {
  if (navigator.geolocation)
    navigator.geolocation.getCurrentPosition(
      this.loadData.bind(this),
      function () {
        alert("Could not get your position");
      }
    );
};

export const loadData = async function (data) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const { latitude } = data.coords;
  const { longitude } = data.coords;

  console.log(clock);

  const now = new Date();
  console.log(now);

  //////////////////////////

  clock.coords = [latitude, longitude];

  clock.time = {
    hour: now.getHours(),
    minute: now.getMinutes(),
  };

  clock.zone = now.getTimezoneOffset();

  // clock.country = ipGeolocationAPI

  clock.date = {
    month: months[now.getMonth()],
    day: now.toString().split(" ")[2],
  };

  console.log(clock);
};
