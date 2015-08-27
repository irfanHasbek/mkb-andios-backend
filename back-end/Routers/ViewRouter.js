var express = require('express');
var kurumsalIzinler = require('../Modeller/KurumsalIzinlerModeli')
var Hakkimizda=require("../Modeller/HakkimizdaModeli");
var Urunler=require("../Modeller/UrunlerModeli");
var UrunKategori=require("../Modeller/UrunKategoriModeli");
var Bayiler=require("../Modeller/BayilerModeli");
var Iletisim=require("../Modeller/IletisimModeli");
var IletisimFormu=require("../Modeller/IletisimFormuModeli");
var HizmetlerKategorileri=require("../Modeller/HizmetlerKategorileriModeli");
var Hizmetler=require("../Modeller/HizmetlerModeli");
var Projeler=require("../Modeller/ProjelerModeli");
var Uretim=require("../Modeller/UretimModeli");
var IstekSikayet=require("../Modeller/IstekSikayetModeli");
var SikSorulanSorular=require("../Modeller/SikSorulanSorularModeli");
var BilgiBankasi=require("../Modeller/BilgiBankasiModeli");
var BilgiBankasiKategorileri=require("../Modeller/BilgiBankasiKategorileriModeli");
var FiyatListesi=require("../Modeller/FiyatListesiModeli");
var IkPolitikasi=require("../Modeller/IKPolitikasiModeli");
var IsStaj=require("../Modeller/IsStajModeli");
var Haberler=require("../Modeller/HaberlerModeli");
var HaberKategorileri=require("../Modeller/HaberKategorileriModeli");
var Etkinlikler=require("../Modeller/EtkinliklerModeli");
var Duyurular=require("../Modeller/DuyurularModeli");
var BelgeVeSertifikalar=require("../Modeller/BelgeVeSertifikalarModeli");
var KurumsalVideo=require("../Modeller/KurumsalVideoModeli");
var KurumsalFotoGaleri=require("../Modeller/KurumsalFotoGaleriModeli");
var VersiyonModeli=require("../Modeller/VersiyonModeli");

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

    router.get('/versiyonguncelle', function(req, res){
        req.session.guncelSayfa = '/sayfalar/versiyon';
        req.session.sayfaEtiketi = 'Versiyon';
        req.session.solMenuKategori = '';
        kurumsalIzinler.findOne({}, function(kurumsalIzinlerHata, kurumsalIzinler){
          if (kurumsalIzinlerHata || !kurumsalIzinler) {
            console.log("Kurumsal Izinler Yuklenirken Hata Olustu !");
            res.send({kod : 404, mesaj : "Kurumsal Izinler Yuklenirken Hata Olustu !"})
            return
          }
          VersiyonModeli.findOne({kullaniciKodu : req.session.kullanici.kullaniciKodu}, function (versiyonHata, versiyon) {
            if (versiyonHata) {
              console.log("Versiyon Yuklenirken Hata Olustu !");
              res.send({kod : 404, mesaj : "Versiyon Yuklenirken Hata Olustu !"})
              return
            }
            res.render('versiyon', {layout : false, session : req.session, kurumsalIzinler : kurumsalIzinler, versiyon : versiyon});
          })
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
          Hakkimizda.findOne({kullaniciKodu : req.session.kullanici.kullaniciKodu},function(hakkimizdaHatasi,hakkimizda){
             if(hakkimizdaHatasi || !hakkimizda){
                console.log("hakkımızda sayfası Hata Olustu !");
                res.send({kod : 404, mesaj : "hakkımızda Yuklenirken Hata Olustu !"})
                return
             }
            res.render('Hakkimizda', {layout : false, session : req.session, kurumsalIzinler : kurumsalIzinler,hakkimizda: hakkimizda});
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
          BelgeVeSertifikalar.find({kullaniciKodu : req.session.kullanici.kullaniciKodu},function(errBelgeVS,resBelgeVS){
             if(errBelgeVS || !resBelgeVS){
                console.log("belge ve sertifikalar listelenemedi!");
                res.send({kod : 404, mesaj : "belge ve sertifikalar listelenemedi !"})
                return
             }
             KurumsalVideo.find({kullaniciKodu : req.session.kullanici.kullaniciKodu},function(errkurumsalVideo,resKurumsalVideo){
                 if(errkurumsalVideo || !resKurumsalVideo){
                     console.log("kurumsal videolar listelenemedi!");
                     res.send({kod : 404, mesaj : "kurumsal videolar listelenemedi !"})
                     return
                 }
                 KurumsalFotoGaleri.find({kullaniciKodu : req.session.kullanici.kullaniciKodu},function(errFotoGaleri,resFotoGaleri){
                     if(errFotoGaleri || !resFotoGaleri){
                         console.log("kurumsal fotograflar listelenemedi!");
                         res.send({kod : 404, mesaj : "kurumsal fotograflar listelenemedi !"})
                         return
                     }
              res.render('icerik', {layout : false, session : req.session, kurumsalIzinler : kurumsalIzinler,belgeVeSertifikalar:resBelgeVS,kurumsalVideo:resKurumsalVideo,kurumsalFotoGaleri:resFotoGaleri});
             })
           })
         })
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
          HizmetlerKategorileri.find({kullaniciKodu:req.session.kullanici.kullaniciKodu},function(errHKategorileri,resHKategorileri){
            if(errHKategorileri || !resHKategorileri){
                console.log("hizmet kategorileri listenemedi");
                res.send({kod : 404, mesaj : " hizmet kategorileri listenemedi !"})
                return
            }
            Hizmetler.find({kullaniciKodu:req.session.kullanici.kullaniciKodu},function(errHizmetler,resHizmetler){
            if(errHKategorileri || !resHKategorileri){
                console.log("hizmetler listenemedi");
                res.send({kod : 404, mesaj : " hizmetler listenemedi !"})
                return
            }
            res.render('hizmetler', {layout : false, session : req.session, kurumsalIzinler : kurumsalIzinler, hizmetKategorileri:resHKategorileri,hizmetler:resHizmetler});
           });
          });
        });
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
          Projeler.find({kullaniciKodu:req.session.kullanici.kullaniciKodu},function(errProjeler,resProjeler){
            if(errProjeler || !resProjeler){
                console.log("projeler listenemedi");
                res.send({kod : 404, mesaj : "projeler listenemedi !"})
                return
            }
          res.render('projeler', {layout : false, session : req.session, kurumsalIzinler : kurumsalIzinler,projeler:resProjeler});
          });
        });
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
        Uretim.find({kullaniciKodu:req.session.kullanici.kullaniciKodu},function(errUretim,resUretim){
            if(errUretim || !resUretim){
                console.log("uretimler listenemedi");
                res.send({kod : 404, mesaj : "uretimler listenemedi !"})
                return
            }
          res.render('uretim', {layout : false, session : req.session, kurumsalIzinler : kurumsalIzinler,uretim:resUretim});
          });
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
          IstekSikayet.find({kullaniciKodu:req.session.kullanici.kullaniciKodu},function(errIstekSikayet,resIstekSikayet){
            if(errIstekSikayet || !resIstekSikayet){
                console.log("istek ve sikayetler listenemedi");
                res.send({kod : 404, mesaj : "istek ve sikayetler listenemedi !"})
                return
            }
            SikSorulanSorular.find({kullaniciKodu:req.session.kullanici.kullaniciKodu},function(errSikSorulan,resSiksorulan){
              if(errSikSorulan || !resSiksorulan){
                console.log("sık sorulan sorular listenemedi");
                res.send({kod : 404, mesaj : "sık sorulan sorular listenemedi !"})
                return
              }
              BilgiBankasi.find({kullaniciKodu:req.session.kullanici.kullaniciKodu},function(errBilgiBankasi,resBilgiBankasi){
                if(errBilgiBankasi || !resBilgiBankasi){
                    console.log("bilgi bankası listenemedi");
                    res.send({kod : 404, mesaj : "bilgi bankası listenemedi !"})
                    return
                }
                BilgiBankasiKategorileri.find({kullaniciKodu:req.session.kullanici.kullaniciKodu},function(errBilgiBankasiKat,resBilgiBankasiKat){
                if(errBilgiBankasiKat || !resBilgiBankasiKat){
                    console.log("bilgi bankası listenemedi");
                    res.send({kod : 404, mesaj : "bilgi bankası listenemedi !"})
                    return
                }
          res.render('musteri_hizmetleri', {layout : false, session : req.session, kurumsalIzinler : kurumsalIzinler,istekSikayet:resIstekSikayet,sikSorulanSorular:resSiksorulan,bilgiBankasi:resBilgiBankasi,bilgiBankasiKategorileri:resBilgiBankasiKat});
                });
              });
            });
          });
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
          FiyatListesi.find({kullaniciKodu:req.session.kullanici.kullaniciKodu},function(errFiyatListesi,resFiyatListesi){
            if(errFiyatListesi || !resFiyatListesi){
                console.log("fiyatlar listenemedi");
                res.send({kod : 404, mesaj : "fiyatlar listenemedi !"})
                return
            }
           res.render('fiyat_listesi', {layout : false, session : req.session, kurumsalIzinler : kurumsalIzinler,fiyatListesi:resFiyatListesi});
          });
        });
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
          Haberler.find({kullaniciKodu:req.session.kullanici.kullaniciKodu},function(errHaberler,resHaberler){
            if(errHaberler || !resHaberler){
                console.log("haberler listenemedi");
                res.send({kod : 404, mesaj : "haberler listenemedi !"})
                return
            }
            HaberKategorileri.find({kullaniciKodu:req.session.kullanici.kullaniciKodu},function(errHaberKategorileri,resHaberKategorileri){
                if(errHaberKategorileri || !resHaberKategorileri){
                    console.log("haber kategorileri listenemedi");
                    res.send({kod : 404, mesaj : "haber kategorileri listenemedi !"})
                    return
              }
            res.render('haberler', {layout : false, session : req.session, kurumsalIzinler : kurumsalIzinler,haberler:resHaberler,haberKategorileri:resHaberKategorileri});
            });
          });
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
          Etkinlikler.find({kullaniciKodu:req.session.kullanici.kullaniciKodu},function(errEtkinlikler,resEtkinlikler){
            if(errEtkinlikler || !resEtkinlikler){
                console.log("etkinlikler listenemedi");
                res.send({kod : 404, mesaj : "etkinlikler listenemedi !"})
                return
            }
          res.render('etkinlikler', {layout : false, session : req.session, kurumsalIzinler : kurumsalIzinler,etkinlikler:resEtkinlikler});
         });
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
          Duyurular.find({kullaniciKodu:req.session.kullanici.kullaniciKodu},function(errDuyurular,resDuyurular){
            if(errDuyurular || !resDuyurular){
                console.log("duyurular listenemedi");
                res.send({kod : 404, mesaj : "duyurular listenemedi !"})
                return
            }
          res.render('duyurular', {layout : false, session : req.session, kurumsalIzinler : kurumsalIzinler ,duyurular:resDuyurular});
         });
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
        Iletisim.findOne({kullaniciKodu:req.session.kullanici.kullaniciKodu},function(iletisimHatasi,iletisim){
            if(iletisimHatasi || !iletisim){
                console.log("iletisim bilgileri getirilemedi.");
                res.send({kod:404,mesaj:"iletisim bilgileri getirilemedi"});
                return;
            }
            IletisimFormu.find({kullaniciKodu:req.session.kullanici.kullaniciKodu},function(iletisimFormuHatasi,iletisimFormlari){
                if(iletisimFormuHatasi || !iletisimFormlari){
                    console.log("iletisim bilgileri getirilemedi.");
                    res.send({kod:404,mesaj:"iletisim bilgileri getirilemedi"});
                    return;
                 }

                res.render('iletisim', {layout : false, session : req.session, kurumsalIzinler : kurumsalIzinler,iletisim:iletisim,iletisimFormlari:iletisimFormlari});
            });
        });

        });
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
         IkPolitikasi.find({kullaniciKodu:req.session.kullanici.kullaniciKodu},function(errIkPolitikasi,resIkPolitikasi){
            if(errIkPolitikasi || !resIkPolitikasi){
                console.log("ik politikaları listenemedi");
                res.send({kod : 404, mesaj : "ik politikaları listenemedi !"})
                return
            }
            IsStaj.find({kullaniciKodu:req.session.kullanici.kullaniciKodu},function(errIsStaj,resIsStaj){
              if(errIsStaj || !resIsStaj){
                 console.log("is staj bilgileri listenemedi");
                 res.send({kod : 404, mesaj : "iş staj bilgileri listenemedi !"})
                 return
             }
          res.render('kariyer', {layout : false, session : req.session, kurumsalIzinler : kurumsalIzinler, ikPolitikasi:resIkPolitikasi,isStaj : resIsStaj});
           });
         });
        });
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
