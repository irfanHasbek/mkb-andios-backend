var mongoose = require('mongoose');
var express = require('express');
var session = require('express-session');
var config = require('./config/development');
var ejs = require('ejs');
var bodyParser = require('body-parser');
var CRUDRouter = require('./back-end/Routers/Router');

function createCrudRouter(app, modelPath, url){
    var Model = require(modelPath);
    var Router = CRUDRouter(Model);
    app.use(url, Router);
}
function assignRouter(app, routerPath, url){
    var router = require(routerPath);
    app.use(url, router());
}


mongoose.connect(config.dbpath, function(err){
    if(err) {
        console.log("mongo connection failed")
        return
    }
    var app = express();
    //session
    app.use(session({secret: 'mkbandios', resave: true, saveUninitialized: true}));

    // use ejs-locals for all ejs templates:
    app.engine('ejs', ejs.renderFile);

    // so you can render('index')
    app.set('views',__dirname + '/front-end/public/pages');
    app.set('view engine', 'ejs');

    // now we can use files(images, css, js) under public folder in rendered
    // files
    app.use(express.static(__dirname + '/front-end/public'));

    // parse application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({ extended: false }));

    // parse application/json
    app.use(bodyParser.json());

    app.all('/*', function(req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Content-Type,X-Requested-With');
        next();
    });

    function sessionKontrol(req){
      //console.log("URL : " + req.originalUrl);
      var izinliUrlListesi = config.izinliUrlListesi;
      if (!req.session.giris) {
        for (var i = 0; i < izinliUrlListesi.length; i++) {
          if (izinliUrlListesi[i] == req.originalUrl) {
            //console.log("session : true");
            return true;
          }
        }
        //console.log("session : false");
        return false;
      }else {
        //console.log("session : true");
        return true;
      }
    }

    app.get("/", function(req, res){
      res.redirect("/sayfalar/giris");
    });

    app.use(function(req, res, next){
      if (sessionKontrol(req)) {//sessionKontrol(req)
        next();
      }else {
        res.render('giris', {layout : false, session : req.session});
      }
    });

    //Versiyon router
    assignRouter(app, './back-end/Routers/VersiyonRouter', '/versiyon');

    //Hesap router
    assignRouter(app, './back-end/Routers/HesapRouter', '/hesap');

    //View Router
    assignRouter(app, './back-end/Routers/ViewRouter', '/sayfalar');

    //Yukleme router
    assignRouter(app, './back-end/Routers/YuklemeRouter', '/yukle');

    //DosyaSistemleri router
    assignRouter(app, './back-end/Routers/DosyaSistemleriRouter', '/dosya');

    //Versiyon crud operasyon
    createCrudRouter(app, './back-end/Modeller/VersiyonModeli', '/versiyon');

    //Kullanici crud operasyon
    createCrudRouter(app, './back-end/Modeller/KullaniciModeli', '/kullanici');

    //hakkımızda
    createCrudRouter(app, './back-end/Modeller/HakkimizdaModeli', '/hakkimizda');

    //Kurumsal Izin operasyon
    createCrudRouter(app, './back-end/Modeller/KurumsalIzinlerModeli', '/kurumsalizinler');

    //Urunler operasyon
    createCrudRouter(app, './back-end/Modeller/UrunlerModeli', '/urunler');

    //Urun Kategorileri operasyon
    createCrudRouter(app, './back-end/Modeller/UrunKategoriModeli', '/urunkategorileri');

    //bayiler operasyon
    createCrudRouter(app, './back-end/Modeller/BayilerModeli', '/bayiler');

    if (!module.parent) {
        app.listen(config.port);
        console.log('Andios-backend is started on port : ' +config.port);
    }
});
