var mongoose = require('mongoose');

Schema = mongoose.Schema;

var BelgeVeSertifikalar = new Schema({
    kullaniciKodu : {
        type    : String,
        required : true
    },

    belgeAdi : {
        type    : String
    },
    ustResim : {
        type    : String,
        default : "/images/ust_resim.png"
    }
});

module.exports =  mongoose.model('BelgeVeSertifikalarModeli', BelgeVeSertifikalar);
