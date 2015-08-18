var express = require('express');
var multer = require('multer');
var crypto = require('crypto');
var config = require('../../config/development');

function Yukleme(){
    var router = express.Router();
    //pdf yukleme
    router.post('/dosyayukle', multer({
        dest: './front-end/public/yuklemeler/dosyalar',
        rename: function (fieldname, filename) {
            var hash = crypto.createHash('sha1');
            hash.setEncoding('hex');
            hash.write(filename);
            hash.end();
            return hash.read();
        },
        onFileUploadComplete: function (file) {
            //console.log(file.fieldname + ' uploaded to  ' + file.path);
        },
        onError: function(error, next) {
            console.log("Error occurred while uploading the file!!");
        }
    }),function(req, res){
        //req.protocol
        res.send({state : true, dosyaAdi : req['files'], host : config.host});
    });

    //coklu resim yukleme
    router.post('/resimyukle', multer({
        dest: './front-end/public/yuklemeler/medyalar',
        rename: function (fieldname, filename) {
            var hash = crypto.createHash('sha1');
            hash.setEncoding('hex');
            hash.write(filename);
            hash.end();
            return hash.read();
        },
        onFileUploadComplete: function (file) {
            //console.log(file.fieldname + ' uploaded to  ' + file.path);
        },
        onError: function(error, next) {
            console.log("Error occurred while uploading the file!!");
        }
    }),function(req, res){
        //req.protocol
        res.send({state : true, fotografListesi : req['files'], host : config.host});
    });

    return router;
}
module.exports = Yukleme;
