var express = require('express');
var db = require('./database');
var router = express.Router();

// router.get('/', (req, res, next) => {
//     res.json({'message': 'ok'})
// })

//get list of all flowers
router.get('/flowers', (req, res, next) => {
    var sql = 'select * from flowers'
    var params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({'error': err.message})
            return;
        }
        // res.json({
        //     'message': 'success',
        //     'data': rows
        // })
        res.send(rows);
    })
})

//get a single flower by its comname
router.get('/flowers/:comname', (req, res, next) => {
    var sql = 'select * from sightings where name = ? order by sighted desc limit 10'
    var params = [req.params.comname]
    console.log(params);
    db.all(sql, params, (err, rows) => {
        if(err) {
            res.status(400).json({'error': err.message});
            return;
        }
        // res.json({
        //     'message': 'success',
        //     'data': row
        // })
        res.send(rows);
    })
})

//update a flower
router.patch('/flowers/:comname', (req, res, next) => {
    var data = {
        genus: req.body.genus,
        species: req.body.species,
        comname: req.body.comname
    }
    db.run(
        `UPDATE flowers 
        SET genus = COALESCE(?,genus),
            species = COALESCE(?,species),
            comname = COALESCE(?,comname)
        WHERE comname = ?`,
        [data.genus, data.species, data.comname, req.params.comname],
        function(err, result) {
            if(err) {
                res.status(400).json({'error': res.message})
                return;
            }
            // res.json({
            //     message: 'success',
            //     data: data,
            //     changes: this.changes
            // })
        }
    )
    db.run(
        `UPDATE sightings
        SET name = ?
        WHERE name = ?`,
        [data.comname, req.params.comname], 
        function(err, result) {
            if(err) {
                res.status(400).json({'error': res.message})
                return;
            }
            res.json({
                message: 'success',
                data: data,
                changes: this.changes
            })
        }
    )
})

//add a new sighting
router.post('/newsighting', (req, res, next) => {
    var errors = []
    if(!req.body.name) {
        errors.push('No name specified');
    }
    if(!req.body.person) {
        errors.push('No person specified');
    }
    if(!req.body.location) {
        errors.push('No location specified');
    }
    if(!req.body.sighted) {
        errors.push('No date sighted specified');
    }
    if(errors.length) {
        res.status(400).json({'error': errors.join(',')});
        return;
    }
    var data = {
        name: req.body.name,
        person: req.body.person,
        location: req.body.location,
        sighted: req.body.sighted
    }
    var sql = 'INSERT INTO SIGHTINGS (NAME, PERSON, LOCATION, SIGHTED) VALUES(?, ?, ?, ?);'
    var params = [data.name,data.person,data.location,data.sighted]
    db.run(sql, params, function(err, result) {
        if (err) {
            res.status(400).send({'error': err.message})
            return;
        }
        // res.json({
        //     'message': 'success',
        //     'data': data            
        // })
        res.send(result)
    })
    var sql2 = 'INSERT INTO FLOWERS (GENUS, SPECIES, COMNAME) VALUES (NULL, NULL, ?);'
    var params2 = [data.name]
    db.run(sql2, params2, function(err, result) {
        if(err) {
            res.status(400).json({'error': err.message})
            return
        }
        res.send(result)
    })
})

module.exports = router;