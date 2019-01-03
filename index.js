require('@babel/register')
const env = require('./server/env')
require(env.default.server)