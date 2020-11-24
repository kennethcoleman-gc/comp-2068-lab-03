// Start Express server and CORS

const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());

// Implement Body Parser
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// register the routes
const routes = require('./routes');
const router = routes(express.Router());
app.use(router);

// error handling
const { handle404s, errorHandler } = require('./errorHandling');
app.use(handle404s);
app.use(errorHandler);

app.listen(4000, () => console.log("Always hungry for bacon... on port 4000"));