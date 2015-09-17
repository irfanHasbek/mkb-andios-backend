var mongoose =require("mongoose");

var SehirSchema=new mongoose.Schema({
    city:String,
    towns:[{townName : String}]
});
module.exports = mongoose.model("sehirler",SehirSchema);
