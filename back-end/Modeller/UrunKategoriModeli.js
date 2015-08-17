var mongoose = require('mongoose');

Schema = mongoose.Schema;

var UrunKategorileri = new Schema({
    kullaniciKodu : {
        type    : String,
        required : true
    },
    anaKategori : {
      type : String,
    },
    altKategori : [
      {
        kategoriAdi : {
          type    : String
        }
      }
    ]
});

module.exports =  mongoose.model('urunKategoriModeli', UrunKategorileri);
