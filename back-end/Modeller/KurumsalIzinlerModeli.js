var mongoose = require('mongoose');

Schema = mongoose.Schema;

var SayfalarKurumsalUygulama = new Schema({
    kullaniciKodu : String,
    kurumsal : {
      type : Boolean,
      default : true
    },

    urunler : {
      type    : Boolean,
      default   : true
    },

    hizmetler : {
        type     : Boolean,
        default   : true
    },

    projeler : {
      type    : Boolean,
      default   : true
    },

    uretim : {
      type    : Boolean,
      default   : true
    },

    musteriHizmetleri : {
      type : Boolean,
      default : true
    },

    satisNoktalari : {
      type    : Boolean,
      default   : true
    },

    fiyatListesi : {
      type    : Boolean,
      default   : true
    },

    kariyer : {
      type : Boolean,
      default : true
    },

    haberler : {
      type    : Boolean,
      default   : true
    },

    etkinlikler : {
      type    : Boolean,
      default   : true
    },

    duyurular : {
      type    : Boolean,
      default   : true
    },

    iletisim : {
      type : Boolean,
      default : true
    },

    pushbildirim : {
      type    : Boolean,
      default   : true
    },
});

module.exports =  mongoose.model('kurumsalSayfaModeli', SayfalarKurumsalUygulama);
