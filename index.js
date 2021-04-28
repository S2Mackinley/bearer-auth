'use strict';



//START THE DB SERVER
require('dotenv').config();
const mongoose = require('mongoose');
const options = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
};
mongoose.connect(process.env.MONGODB_URI, options);

// START THE WEB SERVER
require('./src/server.js').start(process.env.PORT);