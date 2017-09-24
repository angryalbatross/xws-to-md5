var express = require('express')
var bodyParser = require('body-parser')
var md5 = require('md5');
var app = express()

app.set('port', (process.env.PORT || 5000))
app.use(express.static(__dirname + '/public'))

// create application/json parser 
var jsonParser = bodyParser.json()

app.listen(app.get('port'), function() {
  console.log("XWS2 app is running at localhost:" + app.get('port'))
})

// POST / gets urlencoded bodies 
app.post('/', jsonParser, function (req, res) {
	if (!req.body) return res.sendStatus(400)

	var pilotNames = ""
	var list = req.body

	for (var i = 0, len = list.pilots.length; i < len; i++) {
      pilotNames = pilotNames + list.pilots[i].name + ',';
    }

	res.send('Found Pilots = ' + pilotNames + ' Hashed = ' + md5(pilotNames))

})

