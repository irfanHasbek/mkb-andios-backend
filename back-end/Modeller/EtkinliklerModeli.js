var mongoose = require('mongoose');

Schema = mongoose.Schema;

var Etkinlikler = new Schema({
    kullaniciKodu : {
        type    : String,
        required : true
    },
    ustResim : {
        type    : String,
        default : "/images/ust_resim.png"
    },
    tarih : {
        type    : String
    },
    aciklama : {
        type    : String
    },

    galeri : [
      {
        resimLinki : {
          type    : String
        }
      }
    ]
});

module.exports =  mongoose.model('EtkinliklerModeli', Etkinlikler);
