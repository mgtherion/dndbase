const express = require('express');
const http = require('http');
const path = require('path');

const app = express();

app.use(express.static(__dirname + '/dist'));