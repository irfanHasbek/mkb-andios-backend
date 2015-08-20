var mongoose = require('mongoose');

Schema = mongoose.Schema;

var Uretim = new Schema({
    kullaniciKodu : {
        type    : String,
        required : true
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

module.exports =  mongoose.model('uretimModeli', Uretim);
