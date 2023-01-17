
const fs = require('fs');
const path = require('path')

export const  accessLogStream = fs.createWriteStream(path.join( 'access.log'), { flags: 'a' })