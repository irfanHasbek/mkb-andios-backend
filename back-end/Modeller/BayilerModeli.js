var mongoose =require("mongoose");

Schema=mongoose.Schema;

var bayiler=new Schema({
    kullaniciKodu:{
        type:String
    },
    bayiTuru:{
        type:String
    },
    ulkeAdi:{
        type:String
    },
    ilAdi:{
        type:String
    },
    ilceAdi:{
        type:String
    },
    ad:{
        type:String
    },
    adres:{
        type:String
    },
    tel:{
        type:String
    },
    fax:{
        type:String
    },
    web:{
        type:String
    },
    email:{
        type:String
    },
    aciklama:{
        type:String
    }
});

module.exports=mongoose.model("bayiler",bayiler);