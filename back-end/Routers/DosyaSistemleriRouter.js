var express = require('express');
var fs = require('fs')

function DosyaSistemleriRouter(){
    var router = express.Router();
    router.post('/sil', function(req, res){
      var path = req.body.path.replace("http://localhost:3333/","./front-end/public/")
      fs.unlink(path, function (err) {
        if (err) {res.send({state : true, mesaj : "Dosya basariyla silindi !"});return};
        res.send({state : true, mesaj : "Dosya basariyla silindi !"})
      });
    });


    return router;
}
module.exports = DosyaSistemleriRouter;
