'use strict';

require('dotenv').config({ path: '../../.env' });
const request = require('superagent');
const service = require('../server/service');
const http = require('http');

const server = http.createServer(service);

server.listen();
server.on('listening', () => {
  console.log(
    `The server is listening on port ${server.address().port} on ${service.get(
      'env',
    )} mode`,
  );
  const announce = () => {
    request.put(
      `http://localhost:3000/service/time/${server.address().port}`,
      (err, res) => {
        if (err) {
          console.log(err);
          console.log('There was an error connecting to the main application');
        } else {
          console.log(res.body);
        }
      },
    );
  };

  announce();
  setInterval(announce, 15 * 1000);
});
