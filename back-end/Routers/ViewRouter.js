var express = require('express');
var kurumsalIzinler = require('../Modeller/KurumsalIzinlerModeli')
var Hakkimizda=require("../Modeller/HakkimizdaModeli");
var Urunler=require("../Modeller/UrunlerModeli");
var UrunKategori=require("../Modeller/UrunKategoriModeli");
var Bayiler=require("../Modeller/BayilerModeli");

function ViewRouter(){
    var router = express.Router();
    router.get('/anasayfa', function(req, res){
        req.session.guncelSayfa = '/sayfalar/anasayfa';
        req.session.sayfaEtiketi = 'Anasayfa';
        req.session.solMenuKategori = '';
        kurumsalIzinler.findOne({}, function(kurumsalIzinlerHata, kurumsalIzinler){
          if (kurumsalIzinlerHata || !kurumsalIzinler) {
            console.log("Kurumsal Izinler Yuklenirken Hata Olustu !");
            res.send({kod : 404, mesaj : "Kurumsal Izinler Yuklenirken Hata Olustu !"})
            return
          }
          res.render('anasayfa', {layout : false, session : req.session, kurumsalIzinler : kurumsalIzinler});
        })
    });

    router.get('/hakkimizda', function(req, res){
        req.session.guncelSayfa = '/sayfalar/hakkimizda';
        req.session.sayfaEtiketi = 'Kurumsal';
        req.session.solMenuKategori = 'Hakkimizda';
        kurumsalIzinler.findOne({}, function(kurumsalIzinlerHata, kurumsalIzinler){
          if (kurumsalIzinlerHata || !kurumsalIzinler) {
            console.log("Kurumsal Izinler Yuklenirken Hata Olustu !");
            res.send({kod : 404, mesaj : "Kurumsal Izinler Yuklenirken Hata Olustu !"})
            return
          }
          Hakkimizda.find({kullaniciKodu : req.session.kullanici.kullaniciKodu},function(hakkimizdaHatasi,hakkimizda){
             if(hakkimizdaHatasi || !hakkimizda){
                console.log("hakkımızda sayfası Hata Olustu !");
                res.send({kod : 404, mesaj : "hakkımızda Yuklenirken Hata Olustu !"})
                return
             }
              console.log(hakkimizda)
            res.render('hakkimizda', {layout : false, session : req.session, kurumsalIzinler : kurumsalIzinler,hakkimizda: hakkimizda});
          });
        });
    });
    router.get('/icerik', function(req, res){
        req.session.guncelSayfa = '/sayfalar/icerik';
        req.session.sayfaEtiketi = 'Kurumsal';
        req.session.solMenuKategori = 'İcerik';
        kurumsalIzinler.findOne({}, function(kurumsalIzinlerHata, kurumsalIzinler){
          if (kurumsalIzinlerHata || !kurumsalIzinler) {
            console.log("Kurumsal Izinler Yuklenirken Hata Olustu !");
            res.send({kod : 404, mesaj : "Kurumsal Izinler Yuklenirken Hata Olustu !"})
            return
          }
          res.render('icerik', {layout : false, session : req.session, kurumsalIzinler : kurumsalIzinler});
        })
    });

    router.get('/urunler', function(req, res){
        req.session.guncelSayfa = '/sayfalar/urunler';
        req.session.sayfaEtiketi = 'Urunler';
        req.session.solMenuKategori = '';
        kurumsalIzinler.findOne({}, function(kurumsalIzinlerHata, kurumsalIzinler){
          if (kurumsalIzinlerHata || !kurumsalIzinler) {
            console.log("Kurumsal Izinler Yuklenirken Hata Olustu !");
            res.send({kod : 404, mesaj : "Kurumsal Izinler Yuklenirken Hata Olustu !"})
            return
          }
          UrunKategori.find({kullaniciKodu : req.session.kullanici.kullaniciKodu},"", {sort : { _id : 1 }}, function(urunKategoriHata, urunKategorileri){
            if(urunKategoriHata || !urunKategorileri){
              console.log("Urun Kategorileri Yuklenirken Hata Olustu !")
              res.send({kod : 404, mesaj : "Urun Kategorileri Yuklenirken Hata Olustu !"})
              return
            }
            Urunler.find({kullaniciKodu : req.session.kullanici.kullaniciKodu}, function(hataUrun, urunler){
              if(hataUrun || !urunler){
                console.log("Urunler Yuklenirken Hata Olustu !")
                res.send({kod : 404, mesaj : "Urunler Yuklenirken Hata Olustu !"})
                return
              }
              res.render('urunler', {layout : false, session : req.session, kurumsalIzinler : kurumsalIzinler, urunKategorileri : urunKategorileri, urunler : urunler});
            })
          })
        })
    });
    router.get('/hizmetler', function(req, res){
        req.session.guncelSayfa = '/sayfalar/hizmetler';
        req.session.sayfaEtiketi = 'Hizmetler';
        req.session.solMenuKategori = '';
        kurumsalIzinler.findOne({}, function(kurumsalIzinlerHata, kurumsalIzinler){
          if (kurumsalIzinlerHata || !kurumsalIzinler) {
            console.log("Kurumsal Izinler Yuklenirken Hata Olustu !");
            res.send({kod : 404, mesaj : "Kurumsal Izinler Yuklenirken Hata Olustu !"})
            return
          }
          res.render('hizmetler', {layout : false, session : req.session, kurumsalIzinler : kurumsalIzinler});
        })
    });
    router.get('/projeler', function(req, res){
        req.session.guncelSayfa = '/sayfalar/projeler';
        req.session.sayfaEtiketi = 'Projeler';
        req.session.solMenuKategori = '';
        kurumsalIzinler.findOne({}, function(kurumsalIzinlerHata, kurumsalIzinler){
          if (kurumsalIzinlerHata || !kurumsalIzinler) {
            console.log("Kurumsal Izinler Yuklenirken Hata Olustu !");
            res.send({kod : 404, mesaj : "Kurumsal Izinler Yuklenirken Hata Olustu !"})
            return
          }
          res.render('projeler', {layout : false, session : req.session, kurumsalIzinler : kurumsalIzinler});
        })
    });
    router.get('/uretim', function(req, res){
        req.session.guncelSayfa = '/sayfalar/uretim';
        req.session.sayfaEtiketi = 'Uretim';
        req.session.solMenuKategori = '';
        kurumsalIzinler.findOne({}, function(kurumsalIzinlerHata, kurumsalIzinler){
          if (kurumsalIzinlerHata || !kurumsalIzinler) {
            console.log("Kurumsal Izinler Yuklenirken Hata Olustu !");
            res.send({kod : 404, mesaj : "Kurumsal Izinler Yuklenirken Hata Olustu !"})
            return
          }
          res.render('uretim', {layout : false, session : req.session, kurumsalIzinler : kurumsalIzinler});
        })
    });
    router.get('/musteri_hizmetleri', function(req, res){
        req.session.guncelSayfa = '/sayfalar/musteri_hizmetleri';
        req.session.sayfaEtiketi = 'Müsteri_Hizmetleri';
        req.session.solMenuKategori = '';
        kurumsalIzinler.findOne({}, function(kurumsalIzinlerHata, kurumsalIzinler){
          if (kurumsalIzinlerHata || !kurumsalIzinler) {
            console.log("Kurumsal Izinler Yuklenirken Hata Olustu !");
            res.send({kod : 404, mesaj : "Kurumsal Izinler Yuklenirken Hata Olustu !"})
            return
          }
          res.render('musteri_hizmetleri', {layout : false, session : req.session, kurumsalIzinler : kurumsalIzinler});
        })
    });
    router.get('/satis_noktalari', function(req, res){
        req.session.guncelSayfa = '/sayfalar/satis_noktalari';
        req.session.sayfaEtiketi = 'Satis_Noktalari';
        req.session.solMenuKategori = '';
        kurumsalIzinler.findOne({}, function(kurumsalIzinlerHata, kurumsalIzinler){
          if (kurumsalIzinlerHata || !kurumsalIzinler) {
            console.log("Kurumsal Izinler Yuklenirken Hata Olustu !");
            res.send({kod : 404, mesaj : "Kurumsal Izinler Yuklenirken Hata Olustu !"})
            return
          }
            Bayiler.find({kullaniciKodu : req.session.kullanici.kullaniciKodu},function(bayiHatasi,bayiler){
                if(bayiHatasi || !bayiler){
                    console.log("bayileri yüklenirken hata oluştu.");
                    res.send({kod:404,mesaj:"bayiler yüklenirken hata oluştu."});
                    return;
                }
              res.render('satis_noktalari', {layout : false, session : req.session, kurumsalIzinler : kurumsalIzinler, bayiler:bayiler});
            });
        });
    });
    router.get('/fiyat_listesi', function(req, res){
        req.session.guncelSayfa = '/sayfalar/fiyat_listesi';
        req.session.sayfaEtiketi = 'Fiyat_Listesi';
        req.session.solMenuKategori = '';
        kurumsalIzinler.findOne({}, function(kurumsalIzinlerHata, kurumsalIzinler){
          if (kurumsalIzinlerHata || !kurumsalIzinler) {
            console.log("Kurumsal Izinler Yuklenirken Hata Olustu !");
            res.send({kod : 404, mesaj : "Kurumsal Izinler Yuklenirken Hata Olustu !"})
            return
          }
          res.render('fiyat_listesi', {layout : false, session : req.session, kurumsalIzinler : kurumsalIzinler});
        })
    });
    router.get('/haberler', function(req, res){
        req.session.guncelSayfa = '/sayfalar/haberler';
        req.session.sayfaEtiketi = 'Haberler';
        req.session.solMenuKategori = '';
        kurumsalIzinler.findOne({}, function(kurumsalIzinlerHata, kurumsalIzinler){
          if (kurumsalIzinlerHata || !kurumsalIzinler) {
            console.log("Kurumsal Izinler Yuklenirken Hata Olustu !");
            res.send({kod : 404, mesaj : "Kurumsal Izinler Yuklenirken Hata Olustu !"})
            return
          }
          res.render('haberler', {layout : false, session : req.session, kurumsalIzinler : kurumsalIzinler});
        })
    });
    router.get('/etkinlikler', function(req, res){
        req.session.guncelSayfa = '/sayfalar/etkinlikler';
        req.session.sayfaEtiketi = 'Etkinlikler';
        req.session.solMenuKategori = '';
        kurumsalIzinler.findOne({}, function(kurumsalIzinlerHata, kurumsalIzinler){
          if (kurumsalIzinlerHata || !kurumsalIzinler) {
            console.log("Kurumsal Izinler Yuklenirken Hata Olustu !");
            res.send({kod : 404, mesaj : "Kurumsal Izinler Yuklenirken Hata Olustu !"})
            return
          }
          res.render('etkinlikler', {layout : false, session : req.session, kurumsalIzinler : kurumsalIzinler});
        })
    });
    router.get('/duyurular', function(req, res){
        req.session.guncelSayfa = '/sayfalar/duyurular';
        req.session.sayfaEtiketi = 'Duyurular';
        req.session.solMenuKategori = '';
        kurumsalIzinler.findOne({}, function(kurumsalIzinlerHata, kurumsalIzinler){
          if (kurumsalIzinlerHata || !kurumsalIzinler) {
            console.log("Kurumsal Izinler Yuklenirken Hata Olustu !");
            res.send({kod : 404, mesaj : "Kurumsal Izinler Yuklenirken Hata Olustu !"})
            return
          }
          res.render('duyurular', {layout : false, session : req.session, kurumsalIzinler : kurumsalIzinler});
        })
    });
    router.get('/iletisim', function(req, res){
        req.session.guncelSayfa = '/sayfalar/iletisim';
        req.session.sayfaEtiketi = 'Iletisim';
        req.session.solMenuKategori = '';
        kurumsalIzinler.findOne({}, function(kurumsalIzinlerHata, kurumsalIzinler){
          if (kurumsalIzinlerHata || !kurumsalIzinler) {
            console.log("Kurumsal Izinler Yuklenirken Hata Olustu !");
            res.send({kod : 404, mesaj : "Kurumsal Izinler Yuklenirken Hata Olustu !"})
            return
          }
          res.render('iletisim', {layout : false, session : req.session, kurumsalIzinler : kurumsalIzinler});
        })
    });
    router.get('/kariyer', function(req, res){
        req.session.guncelSayfa = '/sayfalar/kariyer';
        req.session.sayfaEtiketi = 'Kariyer';
        req.session.solMenuKategori = '';
        kurumsalIzinler.findOne({}, function(kurumsalIzinlerHata, kurumsalIzinler){
          if (kurumsalIzinlerHata || !kurumsalIzinler) {
            console.log("Kurumsal Izinler Yuklenirken Hata Olustu !");
            res.send({kod : 404, mesaj : "Kurumsal Izinler Yuklenirken Hata Olustu !"})
            return
          }
          res.render('kariyer', {layout : false, session : req.session, kurumsalIzinler : kurumsalIzinler});
        })
    });
    router.get('/ayarlar', function(req, res){
        req.session.guncelSayfa = '/sayfalar/ayarlar';
        req.session.sayfaEtiketi = 'Ayarlar';
        req.session.solMenuKategori = '';
        kurumsalIzinler.findOne({}, function(kurumsalIzinlerHata, kurumsalIzinler){
          if (kurumsalIzinlerHata || !kurumsalIzinler) {
            console.log("Kurumsal Izinler Yuklenirken Hata Olustu !");
            res.send({kod : 404, mesaj : "Kurumsal Izinler Yuklenirken Hata Olustu !"})
            return
          }
          res.render('ayarlar', {layout : false, session : req.session, kurumsalIzinler : kurumsalIzinler});
        })
    });
    router.get('/giris', function(req, res){
        req.session.guncelSayfa = '/giris';
        res.render('giris', {layout : false, session : req.session});
    });

    router.get('/kaydol', function(req, res){
        req.session.guncelSayfa = '/kaydol';
        res.render('kaydol', {layout : false, session : req.session});
    });
    return router;
}
module.exports = ViewRouter;
