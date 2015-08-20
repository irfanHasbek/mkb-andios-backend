var mongoose=require("mongoose");

Schema =mongoose.Schema;

var iletisimFormu=new Schema({
        kullaniciKodu:{type:String},
        adSoyad:{type:String},
        gsm:{type:String},
        email:{type:String},
        konu:{type:String},
        detay:{type:String}
});

module.exports=mongoose.model("iletisimFormuModeli",iletisimFormu);