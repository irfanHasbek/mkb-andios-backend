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
    dosya : {
        type    : String,
        default : ""
    }
});

module.exports =  mongoose.model('fiyatListesiModeli', FiyatListesi);
