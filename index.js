var express = require('express')
var bodyParser = require('body-parser')
var md5 = require('md5');
var app = express()

app.set('port', (process.env.PORT || 5000))
app.use(express.static(__dirname + '/public'))

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

// create application/json parser 
var jsonParser = bodyParser.json()
var cool = require('cool-ascii-faces')

//postgres
var pg = require('pg');

app.listen(app.get('port'), function() {
  console.log("XWS2 app is running at localhost:" + app.get('port'))
})

function isEmpty(obj) {
    for(var prop in obj) {
        if(obj.hasOwnProperty(prop))
            return false;
    }

    return true;
}

//see README.md for endpoint behavior.
app.post('/api/v1/id', jsonParser, function (req, res) {
	if (!req.body || req.body.length == 0 || isEmpty(req.body)) return res.status(400).send( { code: 1, error : "json not found" } )

	var pilotNames = ""
	var list = req.body

	for (var i = 0, len = list.pilots.length; i < len; i++) {
      pilotNames = pilotNames + list.pilots[i].name + ',';
    }

    var md5 = md5(pilotNames)

    //check to see if its already in the database

	res.send( { 'id': md5(pilotNames) } )
})

//see README.md for endpoint behavior
app.get('/api/v1/:listId', function (req, res) {
	console.log(req.params["listId"])
	if (!req.query.listId) return res.sendStatus(400)
	res.send({ 'id': req.query.listId } )
})

app.get('/', function(request, response) {
    response.send(cool())
})

app.get('/view', function (request, response) {
    pg.connect(process.env.DATABASE_URL, function(err, client, done) {
        client.query('SELECT * FROM ulid ', function(err, result) {
            done();
            if (err)
            { console.error(err); response.send("Error " + err); }
            else
            { response.render('pages/xws', {results: result.rows} ); }
        });
    });
});


