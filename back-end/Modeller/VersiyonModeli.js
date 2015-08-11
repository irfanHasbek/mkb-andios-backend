var mongoose = require('mongoose');

var VersiyonModeli = new mongoose.Schema({
    mobilVersiyon : String,
    kullaniciKodu : String
});

module.exports = mongoose.model('versiyonTanimi', VersiyonModeli);
