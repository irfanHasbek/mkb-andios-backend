function wsPost(url, data, cb) {
    $.ajax({
        dataType: 'json',
        headers: {
            "Content-Type" :"application/json"
        },
        type:'POST',
        data: JSON.stringify(data),
        url: url,
        success: function(data)
        {
            cb(null, data);
        },
        error: function(data)
        {
            cb(data, null);
        }
    });
}

function wsGet(url, cb) {
    $.ajax({
        dataType: 'json',
        headers: {
            Accept :"application/json"
        },
        type:'GET',
        url: url,
        success: function(data)
        {
            cb(null, data);
        },
        error: function(data)
        {
            cb(data, null);
        }
    });
}

function reset () {
    $("#toggleCSS").attr("href", "/css/alertify.default.css");
    alertify.set({
        labels : {
            ok     : "Onayla",
            cancel : "İptal Et"
        },
        delay : 5000,
        buttonReverse : false,
        buttonFocus   : "ok"
    });
}

function giveMessage(message,type)
{
    if(type == "standart")
    {
        reset();
        alertify.log(message);
    }
    if(type == "success")
    {
        reset();
        alertify.success(message);
    }
    if(type == "error")
    {
        reset();
        alertify.error(message);
    }
}
var myLocation;
function showPosition(position)
{
    if(myLocation){
        myLocation.setMap(null);
    }
    var lat = position.coords.latitude;
    var lang = position.coords.longitude;

    var latLng = new google.maps.LatLng(lat, lang);
    map.setZoom(17);
    map.panTo(latLng);
    myLocation = new google.maps.Marker({
        position : latLng,
        map : map,
        icon : "/my_location_2.GIF",
        draggable : true
    });
    ///my_location.PNG"
    $('#latitude').attr('placeholder', lat);
    $('#longitude').attr('placeholder', lang);

    $('#liLoading').attr('style','display:none;');
}

function reset () {
    $("#toggleCSS").attr("href", "/css/alertify.default.css");
    alertify.set({
        labels : {
            ok     : "Onayla",
            cancel : "İptal Et"
        },
        delay : 5000,
        buttonReverse : false,
        buttonFocus   : "ok"
    });
}
function removeFromTable(tableClass,url,callback){

    $("."+tableClass).on("click",".sil",function(){
        var id=$(this).closest("td").attr("id");
        var tr=$("."+tableClass).find("tbody").find("tr[id="+id+"]");
        alertify.confirm("Silmek istediğinizden emin misiniz?",
            function(){
                wsPost(url,{_id:id},function(err,data){
                    if(err){
                        console.error(err);
                        return;
                    }
                    alertify.success('Başarı ile silindi.');
                    tr.remove();
                    orderTable("."+tableClass);
                    callback(id);
                });
                },
            function() {
               alertify.error('İşlem iptal edildi.');
        });
    });
}
function updateFromTable(tableClass, url, data, callback){
    $("."+tableClass).on("click",".cancel",function(){
        var id=$(this).closest("td").attr("id");
        var tr=$("."+tableClass).find("tbody").find("tr[id="+id+"]");
        alertify.confirm("Iptal etmek istediğinizden emin misiniz?",
            function(){
                wsPost(url,{ offerId : id, status : data },function(err,data){
                    if(err){
                        console.error(err);
                        return;
                    }
                    alertify.success('Başarı ile guncellendi.');
                    tr.remove();
                    orderTable("."+tableClass);
                    callback(id);
                });
                },
            function() {
               alertify.error('İşlem iptal edildi.');
        });
    });
}
function orderTable(table){
   var trs=$(table+" tbody tr");
    $.each(trs,function(index,item){
       $(table+" tbody tr").eq(index).find("td").eq(0).html((index+1)+".");
    });
}
function regexMultiKriterOlustur(string) {
    string = string.trim();
    var words = string.split(" ");

    var searchString = "";
    for(var i=0; i<words.length; i++) {
        var word = words[i].trim();

        if(i + 1 == words.length)
            searchString += word;
        else
            searchString += word + " ";
    }

    return {
        $regex : searchString,
        $options : 'i'
    };
}
//divId içini silmek istediğiniz div'in id'sidir
function clearInputs(divId){
    $("#"+divId+" input[type='text']").val("");
    $("#"+divId+" input[type='password']").val("");
    $("#"+divId+" input[type='number']").val("");
    $("#"+divId+" input[type='email']").val("");
    $("#"+divId+" input[type='url']").val("");
    $("#"+divId+" input[type='checkbox']").prop('checked', false);
}
function restoreSelects(divId){
    $("#"+divId+" select").find('option:contains("Seçiniz")').attr('selected', true);
}
function clearSelects(divId){
    $("#"+divId+" select").empty();
}
function clearTextareas(divId){
   $("#"+divId+" textarea[type='text']").text("");
   $("#"+divId+" textarea[type='text']").val("");
}
function clearTable(tableId){
    $("#"+tableId+" tbody").empty();
}

function getTodayDate(){
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();

    if(dd<10) {
        dd='0'+dd
    }

    if(mm<10) {
        mm='0'+mm
    }

    today = yyyy+'-'+mm+'-'+dd;
    return today;
}

function isNumber(o) {
  return ! isNaN (o-0) && o !== null && o !== "" && o !== false;
}

function resimLinkOlustur(link, sunucu){
  var ustResimUrl = link.replace("front-end/public/",sunucu)
  return ustResimUrl
}

function ustResimEkle(obj , sonuc){
        if(!sonuc.state) {
          alertify.error("Resim yuklenirken hata olustu !")
          return
        }
        var ustResimUrl = resimLinkOlustur(sonuc.medyaListesi.medyaListesi.path, sonuc.host)
        if (ustResimUrl) {
          $("#imgUstResim").attr("src", ustResimUrl);
          obj.ustResim = ustResimUrl;
          alertify.success("Resim basariyla yuklendi !");
          $("#inpUstResim").val("");
          $(".ustResim").val("");
        }else {
          alertify.error("Resim yuklenirken hata olustu !")
          return
        }

}


function ustResimSil(){
    $(".ustResimSil").on("click", function(){
      var resimLinki = $("#imgUstResim").attr("src")

      if (resimLinki && resimLinki != "/images/default.png") {
        wsPost("/dosya/sil", { path : resimLinki}, function(hata, sonuc){
          if (hata || !sonuc.state) {
            alertify.error("Dosya silinirken hata olustu !")
            return
          }
          alertify.success("Dosya basariyla silindi !")
          var resimLinki = $("#imgUstResim").attr("src", "/images/default.png")
        })
      }else {
        alertify.warning("Resim yuklemeden silme islemi gerceklestiremezsiniz !")
      }
    })
}
function resimSil(obj){
    $(".resimSil").on("click", function(){
      var sira = $(this).attr("id").replace("sil","")
      var resimLinki = $("#resim" + sira).attr("src")
      console.log(resimLinki);
      obj.galeri.splice(sira,1);
      console.log(obj.galeri);
      if (resimLinki && resimLinki != "/images/default.png") {
        wsPost("/dosya/sil", { path : resimLinki}, function(hata, sonuc){
          if (hata || !sonuc.state) {
            alertify.error("Dosya silinirken hata olustu !")
            return
          }
            
          alertify.success("Dosya basariyla silindi !")
          var resimLinki = $("#resim" + sira).attr("src", "/images/default.png")
        })
      }else {
        alertify.warning("Resim yuklemeden silme islemi gerceklestiremezsiniz !")
      }
    })

}

function galeriyeEkle(obj,sonuc){
   if(!sonuc.state) {
      alertify.error("Resim yuklenirken hata olustu !")
      return
    }
    var galeri = sonuc.medyaListesi.medyaListesi
    console.log(sonuc.medyaListesi.medyaListesi);
    if (galeri.length > 0) {
      for (var i = 0; i < galeri.length; i++) {
        if (obj.galeri.length < 5) {
          obj.galeri.push({ resimLinki : resimLinkOlustur(galeri[i].path, sonuc.host)})
        }else {
          alertify.success("Max resim sayisina ulasildi !")
          return
        }
        for(var j=0;j<4;j++){
           if($("#resim" + j).attr("src")=="/images/default.png"){
              $("#resim" + j).attr("src", resimLinkOlustur(galeri[i].path, sonuc.host))
              break;
            }
         }
      }
    }else {
      obj.galeri.push({ resimLinki : resimLinkOlustur(galeri.path, sonuc.host)})
      if($("#resim0").attr("src")=="/images/default.png"){
         $("#resim0").attr("src", resimLinkOlustur(galeri.path, sonuc.host))
      }else if($("#resim1").attr("src")=="/images/default.png"){
        $("#resim1").attr("src", resimLinkOlustur(galeri.path, sonuc.host))
      }else if($("#resim2").attr("src")=="/images/default.png"){
        $("#resim2").attr("src", resimLinkOlustur(galeri.path, sonuc.host))
      }else{
        $("#resim3").attr("src", resimLinkOlustur(galeri.path, sonuc.host))
      }
      
    }
    $("#inpMedya").val("")
    $(".resim").val("")
    alertify.success("Resimler basariyla yuklendi !")

}
function tumFormDatalariniSil(){
  var medyaPathListesi = [];
  for (var i = 0; i < 4; i++) {
    var resimLinki = $("#resim" + i).attr("src")
    if (resimLinki != "/images/default.png") {
      medyaPathListesi.push(resimLinki);
    }
  }
  if ($("#imgUstResim").attr("src") != "/images/default.png") {
    medyaPathListesi.push($("#imgUstResim").attr("src"))
  }
  if (medyaPathListesi.length > 0) {
    console.log(medyaPathListesi);
    wsPost("/dosya/coklusil", {pathListesi : medyaPathListesi}, function(hata, sonuc){
      if(hata || !sonuc.state){
        console.error("Form temizlenirken hata olustu !")
        return
      }
      console.log("Form Basariyla Temizlendi !");
    })
  }
}