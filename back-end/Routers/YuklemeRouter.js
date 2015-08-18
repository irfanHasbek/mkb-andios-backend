var express = require('express');
var multer = require('multer');
var crypto = require('crypto');
var config = require('../../config/development');

function Yukleme(){
    var router = express.Router();
    //pdf yukleme
    router.post('/dosyayukle', multer({
        dest: './front-end/public/yuklemeler/',
        changeDest: function(dest, req, res) {
            var newDestination = dest + req.session.kullanici._id + "/dosyalar";
            /*var stat = null;
            try {
                stat = fs.statSync(newDestination);
            } catch (err) {
                fs.mkdirSync(newDestination);
            }
            if (stat && !stat.isDirectory()) {
                throw new Error('Directory cannot be created because an inode of a different type exists at "' + dest + '"');
            }*/
            return newDestination
        },
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
            console.log("Yukleme esnasinda hata olustu ! : " + error);
        }
    }),function(req, res){
        //req.protocol
        res.send({state : true, dosyaListesi : req['files'], host : config.host});
    });

    //coklu resim yukleme
    router.post('/medyayukle', multer({
        dest: './front-end/public/yuklemeler/',
        changeDest: function(dest, req, res) {
            var newDestination = dest + req.session.kullanici._id + "/medyalar";
            console.log(newDestination);
            /*var stat = null;
            try {
                stat = fs.statSync(newDestination);
            } catch (err) {
                fs.mkdirSync(newDestination);
            }
            if (stat && !stat.isDirectory()) {
                throw new Error('Directory cannot be created because an inode of a different type exists at "' + dest + '"');
            }*/
            return newDestination
        },
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
            console.log("Yukleme esnasinda hata olustu ! : " + error);
        }
    }),function(req, res){
        //req.protocol
        res.send({state : true, medyaListesi : req['files'], host : config.host});
    });

    return router;
}
module.exports = Yukleme;
