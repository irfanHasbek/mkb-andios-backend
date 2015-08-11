var express = require('express');
var VersionModeli = require('../Modeller/VersiyonModeli');

function CRUD(model){
    var router = express.Router();
    router.post('/listele', function(req, res) {
        var kullaniciKodu = req.body.kullaniciKodu;
        model.find({kullaniciKodu : kullaniciKodu}, function(dbHatasi, listelenen) {
            if(dbHatasi) {
                res.send({state : false, data : dbHatasi});
                return;
            }
            else{
                res.send({state : true, data : listelenen});
            }
        });
    });

    router.post('/ara', function(req, res) {
        var aramaKriteri = req.body;
        model.find(aramaKriteri, function(dbHatasi, listelenen) {
            if(dbHatasi) {
                res.send({state : false, data : dbHatasi});
                return;
            }
            else{
                res.send({state : true, data : listelenen});
            }
        });
    });

    router.post('/ekle', function(req, res){
        var modelObject = new model(req.body);
        modelObject.save(function(dbHatasi, eklenen) {
            if(dbHatasi) {
                res.send({state : false, data : dbHatasi});
                return;
            }
            else {
                res.send({state : true, data : eklenen});
            }
        });
    });
    //coklu resim iceren objeler
    router.post('/cokluekle', function(req, res){
        var temp = req.body;
        temp.veriListesi = JSON.parse(req.body.veriListesi);
        var modelObject = new model(temp);
        //console.log(JSON.stringify(modelObject));
        modelObject.save(function(dbHatasi, eklenen) {
            if(dbHatasi) {
                res.send({state : false, data : dbHatasi});
                return;
            }
            else {
                res.send({state : true, data : eklenen});
            }
        });
    });

    router.get('/hepsinisil', function(req, res) {
        model.remove({}, function(dbHatasi) {
            if(dbHatasi) {
                res.send({state : false, data : dbHatasi});
                return;
            }
            else {
                res.send({state : true, data : "Tumu silindi."});
            }
        });
    });

    router.post('/sil', function(req, res) {
        //console.log(JSON.stringify(req.body));
        model.remove(req.body, function(dbHatasi) {
            if(dbHatasi) {
                res.send({state : false, data : dbHatasi});
                return;
            }
            else {
                res.send({state : true, data : "Veri silindi."});
            }
        });
    });

    router.post('/getir', function(req, res) {
        //console.log(JSON.stringify(req.body));
        model.findOne(req.body, function(dbHatasi, getirilen) {
            if(dbHatasi) {
                res.send({state : false, data : dbHatasi});
                return;
            }
            else {
                res.send({state : true, data : getirilen});
            }
        });
    });

    router.post('/guncelle', function(req, res) {
        //console.log(JSON.stringify(req.body));
        model.update({_id : req.body._id}, req.body, function(dbHatasi, etkilenenSatir) {
            if(dbHatasi) {
                res.send({state : false, data : dbHatasi});
                return;
            }
            else {
                res.send({state : true, data : etkilenenSatir});
            }
        });
    });
    /*
        CityModel.update({_id: city._id},{$pushAll : newTown},function(err, town){
    */
    router.post('/arrayekle', function(req, res) {
        //console.log(JSON.stringify(req.body.arrayItem));
        model.update({_id : req.body._id}, {$pushAll : JSON.parse(req.body.arrayItem)}, function(dbHatasi, etkilenenSatir) {
            if(dbHatasi) {
                res.send({state : false, data : dbHatasi});
                return;
            }
            else {
                res.send({state : true, data : etkilenenSatir});
            }
        });
    });

    /*
        //{$pull :{ towns : {townName : resp.townName}}
    */
    router.post('/arraysil', function(req, res) {
        //console.log(JSON.stringify(req.body.arrayItem));
        model.update({_id : req.body._id}, {$pull : req.body.arrayItem}, function(dbHatasi, etkilenenSatir) {
            if(dbHatasi) {
                res.send({state : false, data : dbHatasi});
                return;
            }
            else {
                res.send({state : true, data : etkilenenSatir});
            }
        });
    });

    return router;
}
module.exports = CRUD;
