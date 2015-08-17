var express = require('express');
var KullaniciModeli = require('../Modeller/KullaniciModeli');
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

    return router;
}
module.exports = HesapRouter;
