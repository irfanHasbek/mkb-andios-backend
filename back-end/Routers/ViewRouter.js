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
