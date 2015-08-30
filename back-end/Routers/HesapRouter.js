var express = require('express');
var fs = require('fs')
var KullaniciModeli = require('../Modeller/KullaniciModeli')
var VersionModeli = require('../Modeller/VersiyonModeli')
var KurumsalIzinler = require('../Modeller/KurumsalIzinlerModeli')
var HakkimizdaModeli = require('../Modeller/HakkimizdaModeli')
var IletisimModeli = require('../Modeller/IletisimModeli')

function HesapRouter(){
    var router = express.Router();
    router.post('/giris', function(req, res){
        var kullaniciBilgileri = req.body;
        KullaniciModeli.findOne({kullaniciKodu : kullaniciBilgileri.kullaniciKodu, sifre : kullaniciBilgileri.sifre}, function(kullaniciHata, kullanici){
          if (kullanici) {
            req.session.kullanici = kullanici;
            req.session.giris = true;
            req.session.mesaj = "Giris Basarili !";

            res.redirect('/sayfalar/anasayfa');
          }else {
            req.session.kullanici = null;
            req.session.giris = false;
            req.session.mesaj = "Giris Basarisiz ! Lütfen bilgilerinizi kontrol edin. !";

            res.redirect('/sayfalar/giris');
          }
        });
    });

    router.get('/cikis', function(req, res){
      req.session.kullanici = null;
      req.session.giris = false;
      req.session.mesaj = "";
      res.redirect('/sayfalar/giris');
    });

    router.post('/kaydol', function(req, res){
        var kullaniciBilgileri = req.body;
        var yeniKullanici = new KullaniciModeli(kullaniciBilgileri);
        yeniKullanici.save(function(kullaniciHata, kullanici){
          //console.log(kullanici);
          if (kullanici) {
            var yeniVersiyon = new VersionModeli({mobilVersiyon : "0", kullaniciKodu : kullanici.kullaniciKodu});
            yeniVersiyon.save(function (versiyonHata, versiyon) {
              if (versiyonHata) {
                hataVer(req, res)
              }
              if (versiyon) {
                var yeniKurumsalIzin = new KurumsalIzinler({kullaniciKodu : kullanici.kullaniciKodu})
                yeniKurumsalIzin.save(function (izinHata, izinler) {
                  if (izinHata) {
                    hataVer(req, res)
                  }
                  var _hakkimizda = new HakkimizdaModeli({kullaniciKodu : kullanici.kullaniciKodu, vizyon : "", misyon : "", kalitePolitikasi : ""})
                  _hakkimizda.save( function (hataHakkimizda, hakkimizda) {
                    if (hataHakkimizda) {
                      hataVer(req, res)
                    }
                    var _iletisim = new IletisimModeli({kullaniciKodu : kullanici.kullaniciKodu, adres :"", tel1 : "", tel2 : "", tel3 : "", latitude : "", longtitude : ""})
                    _iletisim.save( function (hataIletisim, iletisim) {
                      if (hataIletisim) {
                        hataVer(req, res)
                      }
                      req.session.kullanici = kullanici;
                      req.session.giris = true;
                      req.session.mesaj = "Giris Basarili !";
                      var dir = './front-end/public/yuklemeler/' + kullanici._id;
                      if (!fs.existsSync(dir)){
                          fs.mkdirSync(dir);
                          var dirDosya = './front-end/public/yuklemeler/' + kullanici._id + "/dosyalar";
                          var dirMedya = './front-end/public/yuklemeler/' + kullanici._id + "/medyalar";
                          var dirCertificate = './front-end/public/yuklemeler/' + kullanici._id + "/sertifikalar";
                          if (!fs.existsSync(dirDosya) && !fs.existsSync(dirMedya)) {
                            fs.mkdirSync(dirDosya);
                            fs.mkdirSync(dirMedya);
                            fs.mkdirSync(dirCertificate);
                          }
                          res.redirect('/sayfalar/anasayfa');
                      }else {
                        hataVer(req, res)
                      }
                    })
                  })
                })
              }else {
                hataVer(req, res)
              }
            })

          }else {
            hataVer(req, res, kullaniciHata)
          }
        });
    });

    return router;
}

function hataVer (req, res, hata) {
  req.session.kullanici = null;
  req.session.giris = false;
  req.session.mesaj = "Giris Basarisiz ! Lütfen servis saglayicinizla iletisime gecin !";
  console.log("Hata : " + hata);
  res.redirect('/sayfalar/giris');
}
module.exports = HesapRouter;
