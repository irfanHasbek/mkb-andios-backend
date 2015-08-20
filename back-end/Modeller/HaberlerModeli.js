var mongoose = require('mongoose');

Schema = mongoose.Schema;

var Haberler = new Schema({
    kullaniciKodu : {
        type    : String,
        required : true
    },

    kategori : {
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

module.exports =  mongoose.model('haberlerModeli', Haberler);
