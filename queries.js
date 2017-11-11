var promise = require('bluebird');
var options = {
    // Initialization Options
    promiseLib: promise
};

var md5 = require('md5');
var pgp = require('pg-promise')(options);
var connectionString = process.env.DATABASE_URL;
var db = pgp(connectionString);

function isEmpty(obj) {
    for(var prop in obj) {
        if(obj.hasOwnProperty(prop))
            return false;
    }

    return true;
}

function getAllLists(req,res,next) {
    db.any('SELECT * from ulid').then(function(data){
        res.render('pages/xws', {results: data });
    })
}

function getAList(req,res,next) {
    var id = req.params.id;
    if (!id) {
        res.status(400).send({error: 'missing id', data: null})
    }
    db.any('SELECT xws from ulid where md5 = $1', id).then(function (data) {
        res.status(200)
            .json({status: 'success', data: data});
    }).catch(function (err) {
        return next(err)
    });
}

function createList(req, res, next) {
    if (!req.body || req.body.length == 0 || isEmpty(req.body))
        return res.status(400).send({
            code: 1,
            error: "json not found"
        })

    var pilotNames = ""
    var list = req.body

    for (var i = 0, len = list.pilots.length; i < len; i++) {
        pilotNames = pilotNames + list.pilots[i].name + ',';
    }

    var id = md5(pilotNames)
    //check to see if it exists already
    db.any("SELECT count(*) from ulid where md5=$1", id.toString()).then(function (data) {
        if (data.count == 0 ) { //its a new record, insert it
            db.none('insert into ulid(md5,xws) values($1, $2)',
                [id.toString(),req.body]).
            then(function() {
                res.status(200)
                    .json({
                        status: 'success',
                        id: id,
                        message: "inserted new list"
                    })
            }).catch(function(err) {
                return next(err)
            })
        }
        else { //already exists, return it
            res.status(200)
                .json({status: 'success', id: id, 'message': "returned existing id"});
        }
    });
}


module.exports = {
    getAList: getAList,
    createList: createList,
    getAllLists: getAllLists
};