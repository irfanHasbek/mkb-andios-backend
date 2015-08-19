var express = require('express');
var fs = require('fs')

function DosyaSistemleriRouter(){
    var router = express.Router();
    router.post('/sil', function(req, res){
      var path = req.body.path.replace("http://localhost:3333/","./front-end/public/")
      fs.unlink(path, function (err) {
        if (err) {res.send({state : false, mesaj : "Dosya silinirken hata olustu !"});return};
        res.send({state : true, mesaj : "Dosya basariyla silindi !"})
      });
    });

    router.post('/coklusil', function(req, res){
      for (var i = 0; i < req.body.pathListesi.length; i++) {
        var path = req.body.pathListesi[i].replace("http://localhost:3333/","./front-end/public/")
        console.log(path);
        fs.unlink(path, function (err) {
          if (err) {res.send({state : false, mesaj : "Dosya silinirken hata olustu !"});return};
          console.log("Dosya basariyla silindi !");
        });
      }
      res.send({state : true, mesaj : "Dosyalar basariyla silindi !"})
    });


    return router;
}
module.exports = DosyaSistemleriRouter;
