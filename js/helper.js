import { TIMEOUT_SEC } from './config.js';

const formCountry = document.querySelector('.form-box__country');
const formCity = document.querySelector('.form-box__city');
const formContinent = document.querySelector('.form-box__continent');

// Function for timeout error
const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second(s)`));
    }, s * 1000);
  });
};

// Function to GET or POST APIs
export const AJAX = async function (url, uploadData = undefined) {
  try {
    const fetchPro = uploadData
      ? fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(uploadData),
        })
      : fetch(url);

    const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    return data;
  } catch (err) {
    throw err;
  }
};

// Function to capitalize a word's or a sentances words' first letter(s)
export const capitalize = s =>
  s &&
  s
    .toLowerCase()
    .split(' ')
    .map(e => e[0].toUpperCase() + e.toLowerCase().slice(1))
    .join(' ');

// Function to get a key of an object by its value
export const getKeyByValue = (obj, val) =>
  Object.keys(obj).find(key => obj[key] === val); // returns object key that given OBJECT's value is equal to given VALUE

// Function to format numbers always 2 digit
export const numberDigit2 = num =>
  num.toLocaleString('en-US', {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });

// Function to check if argument is nodelist or not RETURNS: true/false
export const isNodeList = function (nodes) {
  const stringRepr = Object.prototype.toString.call(nodes);

  return (
    typeof nodes === 'object' &&
    /^\[object (HTMLCollection|NodeList|Object)\]$/.test(stringRepr) &&
    typeof nodes.length === 'number' &&
    (nodes.length === 0 ||
      (typeof nodes[0] === 'object' && nodes[0].nodeType > 0))
  );
};

// Function to get searched zone object if a country has more than 1
export const currentZone = function (
  dataArr,
  continent = formContinent.value,
  city = document.querySelector('.form-box__city').value,
  country = formCountry.value
) {
  // Variable to store object that passes later conditions
  let current;

  dataArr.forEach(object => {
    if (
      (country || city || continent) && // If one of the input field is empty
      object.zoneName
        .toLowerCase()
        .replace('_', ' ')
        .includes(city.toLowerCase()) && // If given city is not located in the given continent
      object.countryName.toLowerCase() === country.toLowerCase() && // If given zone is not locaed in given country
      object.zoneName.toLowerCase().includes(continent.toLowerCase()) // If given country is not located in given continent
    ) {
      current = object;
    }
  });
  return current
    ? current
    : console.error('Invalid data given! Please try again'); // If current is falsey --> error, if truthy returns current object
};
// Function to get zone
export const getZone = data =>
  data.gmtOffset % 3600 === 0 // if its a round number
    ? // if TRUE
      data.gmtOffset / 3600
    : // if FALSE
      Math.floor(data.gmtOffset / 3600) + // returns the hour part (need Math.floor to round from decimals)
      0.6 * ((data.gmtOffset % 3600) / 3600); // from devidance leftover calculate minutes (100% = 60)

// Function that runs the argument the function was called with every second
export const runEverySec = f => {
  setInterval(() => {
    f();
  }, 1000);
};

// Array for month names
// prettier-ignore
export const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];

// Object for countries and its 2 digit country codes
export const countryList = {
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
  'South Korea': 'KR',
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
  Češka: 'CZ',
};
