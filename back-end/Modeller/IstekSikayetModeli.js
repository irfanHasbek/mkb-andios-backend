var mongoose = require('mongoose');

Schema = mongoose.Schema;

var IstekSikayet = new Schema({
    kullaniciKodu : {
        type    : String,
        required : true
    },

    formTipi : {
        type    : String
    },

    konu : {
        type     : String
    },
    detay : {
        type    : String
    },
    adSoyad : {
        type    : String
    },
    gsm : {
        type    : String
    },
    email : {
        type    : String
    }
    
});

module.exports =  mongoose.model('istekSikayetModeli', IstekSikayet);
