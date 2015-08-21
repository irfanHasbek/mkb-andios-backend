var mongoose = require('mongoose');

Schema = mongoose.Schema;

var KurumsalVideo = new Schema({
    kullaniciKodu : {
        type    : String,
        required : true
    },

    videoAdi : {
        type    : String
    },
    videoLinki : {
        type    : String
    }
});

module.exports =  mongoose.model('KurumsalVideoModeli', KurumsalVideo);
