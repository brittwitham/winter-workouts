# Winter Workouts 🏃

A simple app developed in response to being an Aussie in a near-arctic climate. 🥶

> Recommends running gear based on weather conditions at user's location, and sent by a daily text including greeting, recommendation, and a happy quote.

Gear is determined based on temperature, wind, rain, and cloud cover. The user first has to create a "wardrobe" of their running gear that includes a name for each item, which category it belongs to, and whether it's needed for wind, sun, rain, or a given temperature range.

The app then compiles the best outfit based on these factors, then reassembles it by category (tops, pants, accessories) and sends a jovial text with the required items and an inspirational quote.

The idea is that if you manage to put on these items in your pre-coffee haze then step out into -20 and snow to do exercise, you probably won't die in the process. 🤞

## Installation & Usage

A frontend is currently being built for the app to make it more easily usable, but those interested in trying it can clone the repo and replace the content of the "wardrobe.js" file with their own gear. Make sure there are no gaps in temperature ranges and that at least a couple items are added for wind/rain/sun. You'll also need a Twilio account, after which you can export all the necessary values to a .env file.

To run, navigate to the `src` folder and run:
```
node index.js
```

## To-dos

- Build user interface (in progress)
- Add more greetings & quotes
- Testing
- Error handling

## Contributors

[Brittany Witham](https://github.com/brittwitham)
