"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.accessLogStream = void 0;
const fs = require('fs');
const path = require('path');
exports.accessLogStream = fs.createWriteStream(path.join('access.log'), { flags: 'a' });
