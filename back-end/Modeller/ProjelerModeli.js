var mongoose = require('mongoose');

Schema = mongoose.Schema;

var Projeler = new Schema({
    kullaniciKodu : {
        type    : String,
        required : true
    },

    projeDurumu : {
        type    : String
    },
    ustResim : {
        type    : String,
        default : "/images/ust_resim.png"
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

module.exports =  mongoose.model('projelerModeli', Projeler);
