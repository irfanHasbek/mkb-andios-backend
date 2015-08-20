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
    cv : {
        type    : String,
        default : "/images/ust_resim.png"
    }
});

module.exports =  mongoose.model('isStajModeli', IsStaj);
