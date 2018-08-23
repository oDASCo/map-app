var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var Expense = require('../../models/Expense');
var Places = require('../../models/Places');
router.get('/', function(req, res){
    res.render('index')
});
router.route('/insert')
    .post(function(req,res) {
        var places = new Places();
        places.place_id = req.body.id;
        places.place_name = req.body.name;
        places.lat = req.body.lat;
        places.lng = req.body.lng;
        places.save(function(err) {
            if (err)
                res.send(err);
            res.send('Place successfully added!');
        });
    })

// router.get('/delete', function(req, res){
//     var id = req.body.id;
//     Places.find({id: id}).remove().exec(function(err, place) {
//         if(err)
//             res.send(err)
//         res.send('Place successfully deleted!');
//     })
// });


router.get('/getAll',function(req, res) {
        Places.find(function(err, places) {
            if (err)
                res.send(err);
            res.json(places);
        });
    }
);


module.exports = router;