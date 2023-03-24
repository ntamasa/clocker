import { TIMEOUT_SEC } from "./config.js";

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
          method: "POST",
          headers: {
            "Content-Type": "application/json",
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
export const capitalize = (s) =>
  s
    .toLowerCase()
    .split(" ")
    .map((e) => e[0].toUpperCase() + e.slice(1))
    .join(" ");

// Function to get a key of an object by its value
export const getKeyByValue = (obj, val) =>
  Object.keys(obj).find((key) => obj[key] === val);
