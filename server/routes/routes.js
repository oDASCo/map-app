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
router.route('/update')
    .post(function(req, res) {
        const doc = {
            description: req.body.description,
            amount: req.body.amount,
            month: req.body.month,
            year: req.body.year
        };
        console.log(doc);
        Expense.update({_id: req.body._id}, doc, function(err, result) {
            if (err)
                res.send(err);
            res.send('Expense successfully updated!');
        });
    });
router.get('/delete', function(req, res){
    var id = req.query.id;
    Expense.find({_id: id}).remove().exec(function(err, expense) {
        if(err)
            res.send(err)
        res.send('Expense successfully deleted!');
    })
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