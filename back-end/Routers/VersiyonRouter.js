var express = require('express');
var VersionModeli = require('../Modeller/VersiyonModeli');
var KullaniciModeli = require('../Modeller/KullaniciModeli')

function Versiyon(model){
    var router = express.Router();
    router.post('/kontrolet', function(req, res) {
        var kullaniciKodu = req.body.kullaniciKodu;
        var mobilVersiyon = req.body.versiyon;
        //console.log("kullaniciKodu : " + kullaniciKodu);
        //console.log("mobilVersiyon : " + mobilVersiyon);
        VersionModeli.findOne({kullaniciKodu : kullaniciKodu}, function(dbHatasi, listelenen) {
            console.log("Kullanici Versiyon : " + listelenen);
            if(dbHatasi) {
                res.send({state : false, data : dbHatasi});
                return;
            }
            if (listelenen) {
              KullaniciModeli.findOne({kullaniciKodu : kullaniciKodu}, function (kullaniciHata, kullanici) {
                if (kullaniciHata) {
                  res.send({state : false, data : dbHatasi});
                  return;
                }
                if (kullanici) {
                  if (listelenen.mobilVersiyon != mobilVersiyon) {
                    res.send({state : true, data : { bilgi : listelenen, kullanici : kullanici, guncellemeVar : true}});
                    return;
                  }
                  res.send({state : true, data : { bilgi : listelenen, kullanici : kullanici, guncellemeVar : false}});
                }
              })
            }else {
              res.send({state : false, data : { bilgi : "Kullanici bulunamadi !", guncellemeVar : false}});
            }
        });
    });

    router.get('/versiyonguncelle', function(req, res) {
      var kullaniciKodu = req.session.kullanici.kullaniciKodu
        VersionModeli.findOne({kullaniciKodu : kullaniciKodu}, function(dbHatasi, listelenen) {
            console.log("Kullanici Versiyon : " + listelenen);
            if(dbHatasi) {
                res.send({state : false, data : dbHatasi});
                return;
            }
            else{
                if (listelenen) {
                  listelenen.mobilVersiyon = parseFloat(listelenen.mobilVersiyon) + 1;
                  listelenen.save(function (versiyonHata, etkilenenSatir) {
                    if (versiyonHata) {
                      res.send({state : false, data : dbHatasi});
                      return;
                    }
                    res.send({state : true, data : { bilgi : listelenen}});
                  })
                }else {
                  res.send({state : false, data : { bilgi : "Versiyon hatasi !"}});
                }

            }
        });
    });

    return router;
}
module.exports = Versiyon;
