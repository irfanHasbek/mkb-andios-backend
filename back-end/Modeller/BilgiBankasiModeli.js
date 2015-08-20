var mongoose = require('mongoose');

Schema = mongoose.Schema;

var BilgiBankasi = new Schema({
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
    videoLinki : {
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

module.exports =  mongoose.model('BilgiBankasiModeli', BilgiBankasi);
