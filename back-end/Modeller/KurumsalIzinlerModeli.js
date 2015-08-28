var mongoose = require('mongoose');

Schema = mongoose.Schema;

var SayfalarKurumsalUygulama = new Schema({
    kullaniciKodu : String,
    kurumsal : {
        hakkimizda : {
          vizyon : {
            type    : Boolean,
            default   : true
          },
          misyon : {
            type    : Boolean,
            default   : true
          },
          kalitePolitikasi : {
            type    : Boolean,
            default   : true
          }
        },
        icerik : {
          belgeVeSertifikalar : {
            type    : Boolean,
            default   : true
          },
          kurumsalVideo : {
            type    : Boolean,
            default   : true
          },
          kurumsalFotoGaleri : {
            type    : Boolean,
            default   : true
          }
        }
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
      oneriIstekSikayet : {
        type    : Boolean,
        default   : true
      },
      sikSorulanSorular : {
        type    : Boolean,
        default   : true
      },
      bilgiBankasi : {
        type    : Boolean,
        default   : true
      }
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
        ikPolitikasi : {
          type    : Boolean,
          default   : true
        },
        isVeStaj :{
          type    : Boolean,
          default   : true
        }
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
      adresVeTelefonlar : {
        type    : Boolean,
        default   : true
      },
      kroki : {
        type    : Boolean,
        default   : true
      },
      iletisimFormu : {
        type    : Boolean,
        default   : true
      }
    }
});

module.exports =  mongoose.model('kurumsalSayfaModeli', SayfalarKurumsalUygulama);
