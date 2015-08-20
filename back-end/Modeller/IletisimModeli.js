var mongoose=require("mongoose");

Schema=mongoose.Schema;

var iletisimBilgileri=new Schema({
    kullaniciKodu:{type:String},
    adres:{type:String},
    tel1:{type:String},
    tel2:{type:String},
    tel3:{type:String},
    latitude:{type:String},
    longtitude:{type:String}
   
});
module.exports=mongoose.model("iletisimBilgileri",iletisimBilgileri);