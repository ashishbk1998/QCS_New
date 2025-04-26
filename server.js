var express = require('express');
var path = require('path');
const app = express();
const PORT = 5001;

// set up EJS as the templating engine

// app.use("view engine", "ejs")

app.use(express.static(path.join(__dirname,"public")));

//start listening on port 3000

app.get('/', function (req, res) {
    res.sendfile('public/index.html');
});


app.listen(5001, () => {
    console.log(`Example app listening on port `)
})