const express = require('express');
const router = express.Router();
const Places = require('../../models/Places');
const PlacesService = require('../PlacesService');
const service = new PlacesService();

router.get('/', function(req, res){
    res.render('index')
});

router.get('/city', function(req, res) {
    service.getMarkers()
        .then( result => res.send(result));
});

router.route('/insert')
    .post(function(req, res) {
        let places = new Places();
        places.id = req.body.id;
        places.name = req.body.name;
        places.lat = req.body.lat;
        places.lng = req.body.lng;
        places.save(function(err) {
            if (err)
                res.send(err);
            res.send('Place successfully added!');
        });
    });

router.post('/delete', function(req, res){
    let id = req.body.id;
    Places.find({id: id}).deleteOne().then((err, data) => res.send(data));
});


router.get('/getAll',function(req, res) {
        Places.find(function(err, places) {
            if (err)
                res.send(err);
            res.json(places);
        });
    }
);


module.exports = router;