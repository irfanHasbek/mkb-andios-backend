var mongoose = require('mongoose');

Schema = mongoose.Schema;

var Urun = new Schema({
    kullaniciKodu : {
        type    : String,
        required : true
    },

    anaKategori : {
        type    : String
    },

    altKategori : {
        type     : String
    },

    ustResim : {
        type    : String,
        default : "/images/ust_resim.png"
    },

    aciklama : {
        type    : String
    },

    galeri : [
      resimLinki : {
        type    : String
      }
    ]
});

module.exports =  mongoose.model('urunModeli', Urun);
