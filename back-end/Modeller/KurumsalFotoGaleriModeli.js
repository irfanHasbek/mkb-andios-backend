var mongoose = require('mongoose');

Schema = mongoose.Schema;

var KurumsalFotoGaleri = new Schema({
    kullaniciKodu : {
        type    : String,
        required : true
    },
    galeriAdi : {
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

module.exports =  mongoose.model('KurumsalFotoGaleriModeli', KurumsalFotoGaleri);
