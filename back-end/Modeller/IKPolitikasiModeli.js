var mongoose = require('mongoose');

Schema = mongoose.Schema;

var IkPolitikasi = new Schema({
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
    }
});

module.exports =  mongoose.model('ikPolitikasiModeli', IkPolitikasi);
