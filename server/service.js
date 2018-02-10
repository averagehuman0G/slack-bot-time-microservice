'use strict';
require('dotenv').config();
const express = require('express');
const request = require('superagent');
const moment = require('moment');
const service = express();

service.get('/service/:location', (req, res, next) => {
  request(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${req.params.location}&key=${
      process.env.GEOCODING_API_KEY
    }`,
    function(err, response) {
      if (err) {
        console.log(err);
        return res.sendStatus(500);
      }
      const location = response.body.results[0].geometry.location;
      const timestamp = +moment().format('X');
      console.log(timestamp);
      request(
        `https://maps.googleapis.com/maps/api/timezone/json?location=${location.lat},${
          location.lng
        }&timestamp=${timestamp}&key=${process.env.TIMEZONE_API_TOKEN}`,
        function(err, response) {
          if (err) {
            console.log(err);
            return res.sendStatus(500);
          }
          const result = response.body;
          console.log(result);
          const theTime = moment
            .unix(timestamp + result.dstOffset + result.rawOffset)
            .utc()
            .format('hh:mm:ss a');
          console.log(theTime);
          res.json({ result: theTime });
        },
      );
    },
  );
});

module.exports = service;
