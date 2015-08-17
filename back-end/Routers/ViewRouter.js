var express = require('express');

function ViewRouter(){
    var router = express.Router();
    router.get('/anasayfa', function(req, res){
        req.session.guncelSayfa = '/sayfalar/anasayfa';
        req.session.sayfaEtiketi = 'Anasayfa';
        req.session.solMenuKategori = '';
        res.render('anasayfa', {layout : false, session : req.session});
    });

    router.get('/hakkimizda', function(req, res){
        req.session.guncelSayfa = '/sayfalar/hakkimizda';
        req.session.sayfaEtiketi = 'Kurumsal';
        req.session.solMenuKategori = 'Hakkimizda';
        res.render('hakkimizda', {layout : false, session : req.session});
    });
    router.get('/icerik', function(req, res){
        req.session.guncelSayfa = '/sayfalar/icerik';
        req.session.sayfaEtiketi = 'Kurumsal';
        req.session.solMenuKategori = 'İcerik';
        res.render('icerik', {layout : false, session : req.session});
    });
    
    router.get('/urunler', function(req, res){
        req.session.guncelSayfa = '/sayfalar/urunler';
        req.session.sayfaEtiketi = 'Urunler';
        req.session.solMenuKategori = '';
        res.render('urunler', {layout : false, session : req.session});
    });
    router.get('/hizmetler', function(req, res){
        req.session.guncelSayfa = '/sayfalar/hizmetler';
        req.session.sayfaEtiketi = 'Hizmetler';
        req.session.solMenuKategori = '';
        res.render('hizmetler', {layout : false, session : req.session});
    });
    router.get('/projeler', function(req, res){
        req.session.guncelSayfa = '/sayfalar/projeler';
        req.session.sayfaEtiketi = 'Projeler';
        req.session.solMenuKategori = '';
        res.render('projeler', {layout : false, session : req.session});
    });
    router.get('/uretim', function(req, res){
        req.session.guncelSayfa = '/sayfalar/uretim';
        req.session.sayfaEtiketi = 'Uretim';
        req.session.solMenuKategori = '';
        res.render('uretim', {layout : false, session : req.session});
    });
    router.get('/musteri_hizmetleri', function(req, res){
        req.session.guncelSayfa = '/sayfalar/musteri_hizmetleri';
        req.session.sayfaEtiketi = 'Müsteri_Hizmetleri';
        req.session.solMenuKategori = '';
        res.render('musteri_hizmetleri', {layout : false, session : req.session});
    });
    router.get('/satis_noktalari', function(req, res){
        req.session.guncelSayfa = '/sayfalar/satis_noktalari';
        req.session.sayfaEtiketi = 'Satis_Noktalari';
        req.session.solMenuKategori = '';
        res.render('satis_noktalari', {layout : false, session : req.session});
    });
    router.get('/fiyat_listesi', function(req, res){
        req.session.guncelSayfa = '/sayfalar/fiyat_listesi';
        req.session.sayfaEtiketi = 'Fiyat_Listesi';
        req.session.solMenuKategori = '';
        res.render('fiyat_listesi', {layout : false, session : req.session});
    });
    router.get('/haberler', function(req, res){
        req.session.guncelSayfa = '/sayfalar/haberler';
        req.session.sayfaEtiketi = 'Haberler';
        req.session.solMenuKategori = '';
        res.render('haberler', {layout : false, session : req.session});
    });
    router.get('/etkinlikler', function(req, res){
        req.session.guncelSayfa = '/sayfalar/etkinlikler';
        req.session.sayfaEtiketi = 'Etkinlikler';
        req.session.solMenuKategori = '';
        res.render('etkinlikler', {layout : false, session : req.session});
    });
    router.get('/duyurular', function(req, res){
        req.session.guncelSayfa = '/sayfalar/duyurular';
        req.session.sayfaEtiketi = 'Duyurular';
        req.session.solMenuKategori = '';
        res.render('duyurular', {layout : false, session : req.session});
    });
    router.get('/iletisim', function(req, res){
        req.session.guncelSayfa = '/sayfalar/iletisim';
        req.session.sayfaEtiketi = 'Iletisim';
        req.session.solMenuKategori = '';
        res.render('iletisim', {layout : false, session : req.session});
    });
    router.get('/kariyer', function(req, res){
        req.session.guncelSayfa = '/sayfalar/kariyer';
        req.session.sayfaEtiketi = 'Kariyer';
        req.session.solMenuKategori = '';
        res.render('kariyer', {layout : false, session : req.session});
    });
    router.get('/ayarlar', function(req, res){
        req.session.guncelSayfa = '/sayfalar/ayarlar';
        req.session.sayfaEtiketi = 'Ayarlar';
        req.session.solMenuKategori = '';
        res.render('ayarlar', {layout : false, session : req.session});
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
