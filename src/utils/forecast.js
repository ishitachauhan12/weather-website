const request = require("request");

const forecast = (address, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=65169f7ad1c3730acfd67efed3077278&query=" +
    address;

  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback("unable to connect", undefined);
    } else if (response.body.error) {
      callback("no such place found", undefined);
    } else {
      const { body } = response;
      callback(undefined, {
        weather: ` ${body.current.temperature} C`,
        location:
          body.location.name +
          " ," +
          body.location.region +
          " ," +
          body.location.country,
        description: body.current.weather_descriptions[0],
      });
    }
  });
};

module.exports = forecast;
