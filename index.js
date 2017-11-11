var express = require('express')
var bodyParser = require('body-parser')
var app = express()

app.use(bodyParser.json())

var router = express.Router();
var db = require("./queries")
router.get('/api/v1/id/:id', db.getAList)
router.post('/api/v1/xws', db.createList)
router.get('/lists', db.getAllLists)
app.use(router)

app.set('port', (process.env.PORT || 5000))
app.use(express.static(__dirname + '/public'))

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

app.listen(app.get('port'), function() {
    console.log("XWS2 app is running at localhost:" + app.get('port'))
})

// create application/json parser 
var cool = require('cool-ascii-faces')

app.get('/', function(request, response) {
    response.send(cool())
})



