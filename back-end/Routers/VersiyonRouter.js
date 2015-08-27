var express = require('express');
var VersionModeli = require('../Modeller/VersiyonModeli');

function Versiyon(model){
    var router = express.Router();
    router.post('/kontrolet', function(req, res) {
        var kullaniciKodu = req.body.kullaniciKodu;
        var mobilVersiyon = req.body.versiyon;
        console.log("kullaniciKodu : " + kullaniciKodu);
        console.log("mobilVersiyon : " + mobilVersiyon);
        VersionModeli.findOne({kullaniciKodu : kullaniciKodu}, function(dbHatasi, listelenen) {
            console.log("Kullanici Versiyon : " + listelenen);
            if(dbHatasi) {
                res.send({state : false, data : dbHatasi});
                return;
            }
            else{
                if (listelenen) {
                  if (listelenen.mobilVersiyon != mobilVersiyon) {
                    res.send({state : true, data : { bilgi : listelenen, guncellemeVar : true}});
                    return;
                  }
                  res.send({state : true, data : { bilgi : listelenen, guncellemeVar : false}});
                }else {
                  res.send({state : false, data : { bilgi : "Kullanici bulunamadi !", guncellemeVar : false}});
                }

            }
        });
    });

    return router;
}
module.exports = Versiyon;
