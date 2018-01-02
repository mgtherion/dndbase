const express = require('express');
const app = express();

app.use(express.static(__dirname + '/dist'));

app.listen(8800); //process.env.PORT || 8800