const constructMessage = require("./message.js");
const fetch = require("node-fetch");
const cron = require("node-cron");
require("dotenv").config({ path: `${__dirname}/../.env` });

// Weather API setup
const api_key = process.env.API_KEY;
const location = "montreal";
const api_url = `http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${api_key}&units=metric`;
// console.log();

// Twilio setup
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);

// // Cronjob setup for testing (uncomment & switch cronExp for cronNow to send in 1 min to test)
// const date = new Date();
// const hours = date.getHours();
// const minutes = date.getMinutes() + 1;
// const cronNow = `${minutes} ${hours} * * *`;
// console.log(cronNow);

const cronExp = "30 6 * * 1-5";

function buildMessage() {
  return fetch(api_url)
    .then((res) => res.json())
    .then((weather) => constructMessage(weather));
}
async function sendText() {
  const message = await buildMessage();
  console.log(message);
  client.messages
    .create({
      body: message,
      from: process.env.TWILIO_PHONE,
      to: process.env.MY_PHONE,
    })
    .then((message) => console.log(message.sid));
}

cron.schedule(cronExp, () => {
  sendText();
});
