var express = require('express');
require('iced-coffee-script/register');
LineReaderSync = require("line-reader-sync")

var SehirModeli = require('../Modeller/SehirModeli')
function Ayar(model){
    var router = express.Router();
    router.get('/sehirleriyukle', function(req, res) {
      lrs = new LineReaderSync("IL_ILCE_LISTESI.csv");
      /*
          city:String,
          towns:[{townName : String}]
      */
      var CityArray = [];
      while(true){
          var line = lrs.readline();
          if(line === null){
              break;
          }
          var temp = line.split(';');
          var cityName = temp[0].trim(), stateName = temp[1].trim();
          if(CityArray.length <= 0 || CityArray[CityArray.length - 1].city != cityName){
              CityArray.push({city : cityName, towns : [{ townName : stateName }]});
          }else if(CityArray[CityArray.length - 1].city == cityName){
              CityArray[CityArray.length - 1].towns.push({ townName : stateName });
          }

      }

      for(var i = 0; i < CityArray.length; i++){
          var yeniSehir=new SehirModeli(CityArray[i]);
          console.log(JSON.stringify(yeniSehir));
          yeniSehir.save(function(hataSehir, sonuc){
              if(hataSehir){
                  console.error(sonuc);
                  return;
              }
          });
      }
      res.send({state : true, data : "Tum sehirler eklendi !"})

    });

    return router;
}
module.exports = Ayar;
