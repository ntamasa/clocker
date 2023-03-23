import { AJAX } from "./helper.js";

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
    city: "",
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
      clocks.local.zone = response.gmtOffset / 3600;
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
  clocks.global.zone = response.gmtOffset / 3600;
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

// prettier-ignore
const countryList = {
Afghanistan: 'AF',
'Aland Islands': 'AX',
Albania: 'AL',
Algeria: 'DZ',
'American Samoa': 'AS',
Andorra: 'AD',
Angola: 'AO',
Anguilla: 'AI',
Antarctica: 'AQ',
'Antigua And Barbuda': 'AG',
Argentina: 'AR',
Armenia: 'AM',
Aruba: 'AW',
Australia: 'AU',
Austria: 'AT',
Azerbaijan: 'AZ',
Bahamas: 'BS',
Bahrain: 'BH',
Bangladesh: 'BD',
Barbados: 'BB',
Belarus: 'BY',
Belgium: 'BE',
Belize: 'BZ',
Benin: 'BJ',
Bermuda: 'BM',
Bhutan: 'BT',
Bolivia: 'BO',
'Bosnia And Herzegovina': 'BA',
Botswana: 'BW',
'Bouvet Island': 'BV',
Brazil: 'BR',
'British Indian Ocean Territory': 'IO',
'Brunei Darussalam': 'BN',
Bulgaria: 'BG',
'Burkina Faso': 'BF',
Burundi: 'BI',
Cambodia: 'KH',
Cameroon: 'CM',
Canada: 'CA',
'Cape Verde': 'CV',
'Cayman Islands': 'KY',
'Central African Republic': 'CF',
Chad: 'TD',
Chile: 'CL',
China: 'CN',
'Christmas Island': 'CX',
'Cocos (Keeling) Islands': 'CC',
Colombia: 'CO',
Comoros: 'KM',
Congo: 'CG',
'Congo, Democratic Republic': 'CD',
'Cook Islands': 'CK',
'Costa Rica': 'CR',
"Cote D'Ivoire": 'CI',
Croatia: 'HR',
Cuba: 'CU',
Cyprus: 'CY',
'Czech Republic': 'CZ',
Denmark: 'DK',
Djibouti: 'DJ',
Dominica: 'DM',
'Dominican Republic': 'DO',
Ecuador: 'EC',
Egypt: 'EG',
'El Salvador': 'SV',
'Equatorial Guinea': 'GQ',
Eritrea: 'ER',
Estonia: 'EE',
Ethiopia: 'ET',
'Falkland Islands (Malvinas)': 'FK',
'Faroe Islands': 'FO',
Fiji: 'FJ',
Finland: 'FI',
France: 'FR',
'French Guiana': 'GF',
'French Polynesia': 'PF',
'French Southern Territories': 'TF',
Gabon: 'GA',
Gambia: 'GM',
Georgia: 'GE',
Germany: 'DE',
Ghana: 'GH',
Gibraltar: 'GI',
Greece: 'GR',
Greenland: 'GL',
Grenada: 'GD',
Guadeloupe: 'GP',
Guam: 'GU',
Guatemala: 'GT',
Guernsey: 'GG',
Guinea: 'GN',
'Guinea-Bissau': 'GW',
Guyana: 'GY',
Haiti: 'HT',
'Heard Island & Mcdonald Islands': 'HM',
'Holy See (Vatican City State)': 'VA',
Honduras: 'HN',
'Hong Kong': 'HK',
Hungary: 'HU',
Iceland: 'IS',
India: 'IN',
Indonesia: 'ID',
'Iran, Islamic Republic Of': 'IR',
Iraq: 'IQ',
Ireland: 'IE',
'Isle Of Man': 'IM',
Israel: 'IL',
Italy: 'IT',
Jamaica: 'JM',
Japan: 'JP',
Jersey: 'JE',
Jordan: 'JO',
Kazakhstan: 'KZ',
Kenya: 'KE',
Kiribati: 'KI',
Korea: 'KR',
Kuwait: 'KW',
Kyrgyzstan: 'KG',
"Lao People's Democratic Republic": 'LA',
Latvia: 'LV',
Lebanon: 'LB',
Lesotho: 'LS',
Liberia: 'LR',
'Libyan Arab Jamahiriya': 'LY',
Liechtenstein: 'LI',
Lithuania: 'LT',
Luxembourg: 'LU',
Macao: 'MO',
Macedonia: 'MK',
Madagascar: 'MG',
Malawi: 'MW',
Malaysia: 'MY',
Maldives: 'MV',
Mali: 'ML',
Malta: 'MT',
'Marshall Islands': 'MH',
Martinique: 'MQ',
Mauritania: 'MR',
Mauritius: 'MU',
Mayotte: 'YT',
Mexico: 'MX',
'Micronesia, Federated States Of': 'FM',
Moldova: 'MD',
Monaco: 'MC',
Mongolia: 'MN',
Montenegro: 'ME',
Montserrat: 'MS',
Morocco: 'MA',
Mozambique: 'MZ',
Myanmar: 'MM',
Namibia: 'NA',
Nauru: 'NR',
Nepal: 'NP',
Netherlands: 'NL',
'Netherlands Antilles': 'AN',
'New Caledonia': 'NC',
'New Zealand': 'NZ',
Nicaragua: 'NI',
Niger: 'NE',
Nigeria: 'NG',
Niue: 'NU',
'Norfolk Island': 'NF',
'Northern Mariana Islands': 'MP',
Norway: 'NO',
Oman: 'OM',
Pakistan: 'PK',
Palau: 'PW',
'Palestinian Territory, Occupied': 'PS',
Panama: 'PA',
'Papua New Guinea': 'PG',
Paraguay: 'PY',
Peru: 'PE',
Philippines: 'PH',
Pitcairn: 'PN',
Poland: 'PL',
Portugal: 'PT',
'Puerto Rico': 'PR',
Qatar: 'QA',
Reunion: 'RE',
Romania: 'RO',
'Russian Federation': 'RU',
Rwanda: 'RW',
'Saint Barthelemy': 'BL',
'Saint Helena': 'SH',
'Saint Kitts And Nevis': 'KN',
'Saint Lucia': 'LC',
'Saint Martin': 'MF',
'Saint Pierre And Miquelon': 'PM',
'Saint Vincent And Grenadines': 'VC',
Samoa: 'WS',
'San Marino': 'SM',
'Sao Tome And Principe': 'ST',
'Saudi Arabia': 'SA',
Senegal: 'SN',
Serbia: 'RS',
Seychelles: 'SC',
'Sierra Leone': 'SL',
Singapore: 'SG',
Slovakia: 'SK',
Slovenia: 'SI',
'Solomon Islands': 'SB',
Somalia: 'SO',
'South Africa': 'ZA',
'South Georgia And Sandwich Isl.': 'GS',
Spain: 'ES',
'Sri Lanka': 'LK',
Sudan: 'SD',
Suriname: 'SR',
'Svalbard And Jan Mayen': 'SJ',
Swaziland: 'SZ',
Sweden: 'SE',
Switzerland: 'CH',
'Syrian Arab Republic': 'SY',
Taiwan: 'TW',
Tajikistan: 'TJ',
Tanzania: 'TZ',
Thailand: 'TH',
'Timor-Leste': 'TL',
Togo: 'TG',
Tokelau: 'TK',
Tonga: 'TO',
'Trinidad And Tobago': 'TT',
Tunisia: 'TN',
Turkey: 'TR',
Turkmenistan: 'TM',
'Turks And Caicos Islands': 'TC',
Tuvalu: 'TV',
Uganda: 'UG',
Ukraine: 'UA',
'United Arab Emirates': 'AE',
'United Kingdom': 'GB',
'United States': 'US',
'United States Outlying Islands': 'UM',
Uruguay: 'UY',
Uzbekistan: 'UZ',
Vanuatu: 'VU',
Venezuela: 'VE',
'Viet Nam': 'VN',
'Virgin Islands, British': 'VG',
'Virgin Islands, U.S.': 'VI',
'Wallis And Futuna': 'WF',
'Western Sahara': 'EH',
Yemen: 'YE',
Zambia: 'ZM',
Zimbabwe: 'ZW',
'North Macedonia': 'MK',
Češka: 'CZ'
}

export const _getAddedClock = async function (apiKey) {
  const zone = document.querySelector(".curved-text__middle--zone");
  const country = document.querySelector(".curved-text__middle--country");
  const time = document.querySelector(".curved-text__middle--time");
  const month = document.querySelector(".curved-text__middle--month");
  const day = document.querySelector(".curved-text__middle--day");

  const formBox = document.querySelector(".form-box");

  const btn = document.querySelector(".form__btn");
  const btnIcon = document.querySelector(".form__icon");

  const formBackground = document.querySelector(".form__background");
  const formHeading = document.querySelector(".form-box__heading");
  const formContent = document.querySelector(".form-box__content");
  const formMap = document.querySelector(".form-box__map");
  const footer = document.querySelector(".footer");

  const markupPlus = `
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="form__icon--add"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            `;

  const markupTick = `
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="form__icon--close"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M4.5 12.75l6 6 9-13.5"
              />
            </svg>
            `;

  const btnActive = function () {
    formBackground.style.transform = "scale(80)";
    formHeading.style.transform = "translateY(0)";
    formContent.style.transform = "translateX(0)";
    formMap.style.width = "70rem";
    formMap.style.border = "1px solid $color-primary-dark-1";
    footer.style.transform = "translateX(0)";
  };

  const btnInactive = function () {
    formBackground.style.transform = "scale(1)";
    formHeading.style.transform = "translateY(-200rem)";
    formContent.style.transform = "translateX(-200rem)";
    formMap.style.width = "0";
    formMap.style.border = "none";
    footer.style.transform = "translateX(-200rem)";
  };

  btn.addEventListener("click", () => {
    btnIcon.textContent = "";
    btnIcon.classList.toggle("add");
    btnIcon.innerHTML = btnIcon.classList.contains("add")
      ? markupTick
      : markupPlus;
    formBox.classList.toggle("hidden");
    formBox.classList.contains("hidden") ? btnInactive() : btnActive();

    // console.log(formCity);
  });

  function ass() {
    const formCountry = document.querySelector(".form-box__country").value;
    const formCity = document.querySelector(".form-box__city").value;
    const formContinent = document.querySelector(".form-box__continent").value;

    alert(formCity, formCountry, formContinent);
  }

  addEventListener("keydown", (e) => {
    if (e.shiftKey) console.log(formCity, formCountry, formContinent);
  });

  // formCity = "";
  // formCountry = "";

  // formCountry = countryList.formCountry;

  // const res = await AJAX(
  //   `http://api.timezonedb.com/v2.1/list-time-zone?key=${apiKey}&format=json&zone=${}&fields=zoneName,gmtOffset`
  // );

  // const response = await AJAX(
  //   `http://api.timezonedb.com/v2.1/get-time-zone?key=${apiKey}&format=json&by=zone&zone=Europe/London`
  // );

  // clocks.added.time = ;
  // clocks.added.zone = ;
  // clocks.added.country = ;
  // clocks.added.city = formCity;
  // clocks.added.date = ;

  const asd = await (
    await fetch("http://worldtimeapi.org/api/timezone/Europe/Budapest")
  ).json();
  console.log(asd);
};
