var mongoose=require("mongoose");

Schema =mongoose.Schema;

var Hakkimizda=new Schema({
    kullaniciKodu : {
        type : String
    },
    vizyon : {
        type : String,
        default : ""
    },
    misyon : {
        type : String,
        default : ""
    },
    kalitePolitikasi : {
        type : String,
        default : ""
    }
});

module.exports=mongoose.model("hakkimizda",Hakkimizda);