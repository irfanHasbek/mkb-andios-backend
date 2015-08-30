var mongoose = require('mongoose');

Schema = mongoose.Schema;

var Kullanici = new Schema({
    kullaniciKodu : {
        type    : String,
        required : true,
        unique   : true
    },

    sifre : {
        type    : String,
        required : true
    },

    email : {
        type     : String,
        required : true,
        unique   : true
    },

    profilResmi : {
        type    : String,
        default : "/images/default_profile_picture.png"
    },

    sifreDegistirmeSuresi : {
        type    : String,
        default : "15"
    },

    grupKodu : {
        type    : String,
        default : "Grup 1"
    },

    telefonNumarasi : {
        type    : String,
        default : "+90 *** *** ** **"
    },

    aktif : {
        type    : Boolean,
        default : true
    },

    son_giris : {
        type    : Date,
        default : Date.now
    },

    bildirimUrl : {
      type : String,
      default : "#"
    },

    facebookHesap : {
      kullaniciAdi : {
        type : String,
        default : "#"
      },
      sifre : {
        type : String,
        default : "*"
      },
      girisKodu : {
        type : String,
        default : "*"
      }
    },

    twitterHesap : {
      kullaniciAdi : {
        type : String,
        default : "#"
      },
      sifre : {
        type : String,
        default : "*"
      }
    },

    instagramHesap : {
      kullaniciAdi : {
        type : String,
        default : "#"
      },
      sifre : {
        type : String,
        default : "*"
      }
    }
});

module.exports =  mongoose.model('kullaniciModeli', Kullanici);
