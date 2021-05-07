var express = require('express');
var port = process.env.PORT || 5000;
var app = express();
var bodyParser = require('body-parser');
var router = require('./routes');
var cors = require('cors');

//body parsing middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//new router
app.use('/api', router);

const corsOptions = {
    origin: '*'
}

app.use(cors(corsOptions));

//console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));

//default response for any other request
app.use(function(req,res) {
    res.status(404);
})
