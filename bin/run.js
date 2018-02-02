'use strict'

require('dotenv').config({path: '../../.env'});

const service = require('../server/service');
const http = require('http');

const server = http.createServer(service);

server.listen(3010);
server.on('listening', () => console.log(`The server is listening on port ${server.address().port} on ${service.get('env')} mode`))
