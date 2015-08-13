var express = require('express');
var VersionModeli = require('../Modeller/VersiyonModeli');

function CRUD(model){
    var router = express.Router();
    router.post('/kontrolet', function(req, res) {
        var kullaniciKodu = req.body.kullaniciKodu;
        var mobilVersiyon = req.body.versiyon;
        VersionModeli.findOne({kullaniciKodu : kullaniciKodu}, function(dbHatasi, listelenen) {
            if(dbHatasi) {
                res.send({state : false, data : dbHatasi});
                return;
            }
            else{
                if (listelenen) {
                  if (listelenen.mobilVersiyon != mobilVersiyon) {
                    res.send({state : true, data : { bilgi : listelenen, versiyon : false}});
                    return;
                  }
                  res.send({state : true, data : { bilgi : listelenen, versiyon : true}});
                }

            }
        });
    });

    return router;
}
module.exports = CRUD;
