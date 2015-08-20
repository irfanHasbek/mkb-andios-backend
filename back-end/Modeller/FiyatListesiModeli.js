var mongoose = require('mongoose');

Schema = mongoose.Schema;

var FiyatListesi = new Schema({
    kullaniciKodu : {
        type    : String,
        required : true
    },

    icerikListeAdi : {
        type    : String
    },
    ustResim : {
        type    : String,
        default : "/images/ust_resim.png"
    }
});

module.exports =  mongoose.model('fiyatListesiModeli', FiyatListesi);
