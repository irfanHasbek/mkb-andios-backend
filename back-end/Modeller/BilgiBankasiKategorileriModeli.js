var mongoose = require('mongoose');

Schema = mongoose.Schema;

var BilgiBankasiKategorileri = new Schema({
    kullaniciKodu : {
        type    : String,
        required : true
    },
    kategori : {
      type : String,
      unique : true
    }
});

module.exports =  mongoose.model('bilgiBankasiKategorileriModeli', BilgiBankasiKategorileri);
