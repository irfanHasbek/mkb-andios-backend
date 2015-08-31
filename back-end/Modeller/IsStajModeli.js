var mongoose = require('mongoose');

Schema = mongoose.Schema;

var IsStaj = new Schema({
    kullaniciKodu : {
        type    : String,
        required : true
    },
    adSoyad : {
        type    : String
    },
    gsm : {
        type    : String
    },
    email : {
        type    : String
    },
    basvuruTipi : {
        type    : String
    },
    detay : {
        type    : String
    },
    linkedn : {
      type : String
    },
    xing : {
      type : String
    }
});

module.exports =  mongoose.model('isStajModeli', IsStaj);
