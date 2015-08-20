var mongoose = require('mongoose');

Schema = mongoose.Schema;

var SikSorulanSorular = new Schema({
    kullaniciKodu : {
        type    : String,
        required : true
    },

    soru : {
        type    : String
    },

    cevap : {
        type     : String
    }
});

module.exports =  mongoose.model('sikSorulanSorularModeli', SikSorulanSorular);
