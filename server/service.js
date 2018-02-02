'use strict';

const express = require('express');
const request = require('superagent');
const service = express();

//AIzaSyC9JlltA_3UMVi2NNsdC9TzpWBMcnmRW0c
//https://maps.googleapis.com/maps/api/timezone/json?location=39.6034810,-119.6822510&timestamp=1331161200&key=YOUR_API_KEY


service.get('/service/:location', (req, res, next) => {
  request(`https://maps.googleapis.com/maps/api/geocode/json?address=${req.params.location}&key=${process.env.GEOCODING_API_KEY}`, function(err, response) {
    if(err) {
      console.log(err);
      return res.sendStatus(500);
    }

    res.json({results: response.body.results[0].geometry.location});
  });
});

module.exports = service;
