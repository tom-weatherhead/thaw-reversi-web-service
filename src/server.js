#!/usr/bin/env node

// thaw-reversi-web-service/src/server.js

// For information about "npm link" and the "bin" section of the package.json file, see:
// http://blog.npmjs.org/post/118810260230/building-a-simple-command-line-tool-with-npm

'use strict';

const config = require('../config/config');			// I.e. ./config.json

const serverListenPort = config.serverListenPort || 3000;

const expressMixin = require('express-mixin');

expressMixin.createAndUseRouter('/reversi', require('..'));

expressMixin.startServer(serverListenPort, 'Express.js Reversi Web service');

// End of File.
