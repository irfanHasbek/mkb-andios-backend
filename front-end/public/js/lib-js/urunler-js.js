$(document).ready(function(){
  var urun = urunOlustur()

  //Ana kategori dropdown doldurma
  $("#btnAnaKategoriEkle").on("click", function(){
    var anaKategori = $("#inpAnaKategori").val()
    var kullaniciKodu = $("#kullaniciKodu").val()
    if (anaKategori != "") {
      wsPost("/urunkategorileri/ekle", {kullaniciKodu : kullaniciKodu, anaKategori : anaKategori, altKategori : []}, function(hata, kategori){
        if(hata || !kategori || !kategori.state){
          console.log("Hata : " + hata);
          alertify.error("Hata Olustu !")
          return
        }
        var option = $("<option value='" + kategori.data.anaKategori + "' data='" + kategori.data._id + "'>" + kategori.data.anaKategori + "</option>");
        $("#anaKategoriListesi").append(option)
        alertify.success("Kategori basariyla eklendi !")
        $("#inpAnaKategori").val("")
      })
    }else {
      Materialize.toast('Lutfen kategori adi giriniz !', 4000)
    }
  })

  //Alt kategori dropdown doldurma
  $("#btnAltKategoriEkle").on("click", function(){
    var anaKategoriId = $("#anaKategoriListesi option:selected").attr("data");
    var altKategori = $("#inpAltKategori").val()
    var kullaniciKodu = $("#kullaniciKodu").val()
    if (anaKategoriId && altKategori) {
      wsPost("/urunkategorileri/arrayekle", {_id : anaKategoriId, arrayItem : { altKategori : [{ kategoriAdi : altKategori}]}}, function(hata, kategori){
        if(hata || !kategori || !kategori.state){
          console.log("Hata : " + hata);
          alertify.error("Hata Olustu !")
          return
        }
        wsPost("/urunkategorileri/ara", {kullaniciKodu : kullaniciKodu, _id : anaKategoriId}, function(hataAltKategori, altKategori){
          if(hataAltKategori || !altKategori || !altKategori.state){
            console.log("Hata : " + hataAltKategori);
            alertify.error("Hata Olustu !")
            return
          }
          selectBosalt("#altKategoriListesi")
          for (var i = 0; i < altKategori.data[0].altKategori.length; i++) {
            var kategoriAdi = altKategori.data[0].altKategori[i].kategoriAdi;
            var kategoriId = altKategori.data[0].altKategori[i]._id;
            var option = $("<option value='" + kategoriAdi + "' data='" + kategoriId + "'>" + kategoriAdi + "</option>");
            $("#altKategoriListesi").append(option)
          }
          alertify.success("Alt Kategoriler listelendi !")
          $("#inpAltKategori").val("")
        })
      })
    }else {
      alertify.error("Lutfen kategori secin veya alt kategori giriniz !")
    }
  })

  //Ana kategori dropdown degisince alt kategori dropdown doldurma
  $("#anaKategoriListesi").change(function(){
    selectBosalt("#altKategoriListesi")
    var kullaniciKodu = $("#kullaniciKodu").val()
    var anaKategoriId = $("#anaKategoriListesi option:selected").attr("data")
    if (anaKategoriId &&  anaKategoriId != "") {
      wsPost("/urunkategorileri/ara", { kullaniciKodu : kullaniciKodu, _id : anaKategoriId}, function(hata, kategori){
        if (hata || !kategori || !kategori.state) {
          console.log("Hata : " + hata);
          alertify.error("Hata Olustu !")
          return
        }
        for(var i = 0; i < kategori.data[0].altKategori.length; i ++){
          var option = $("<option value='" + kategori.data[0].altKategori[i].kategoriAdi + "' data='" + kategori.data[0].altKategori[i]._id + "'>" + kategori.data[0].altKategori[i].kategoriAdi + "</option>");
          $("#altKategoriListesi").append(option)
        }
        alertify.success("Kategoriler listelendi !")
      })
    }
  })

  //Ana kategori sil ve dropdown bosalt
  $("#btnAnaKategoriSil").on("click", function(e){
    var anaKategoriId = $("#anaKategoriListesi option:selected").attr("data")
    if (anaKategoriId == "" || !anaKategoriId) {
      e.preventDefault();
      alertify.error("Lutfen silmek istediginiz kategoriyi seciniz !")
      return
    }
    wsPost("/urunkategorileri/sil", {_id : anaKategoriId}, function(hata, sonuc){
      if (hata || !sonuc.state) {
        console.log("Hata : " + hata);
        alertify.error("Hata Olustu !")
        return
      }
      alertify.success("Kategori basariyla silindi")
      selectBosalt("#altKategoriListesi")
      $("#anaKategoriListesi option[data='" + anaKategoriId + "']").remove()
    })
  })

  //Alt kategori sil ve dropdown bosalt
  $("#btnAltKategoriSil").on("click", function(e){
    var anaKategoriId = $("#anaKategoriListesi option:selected").attr("data")
    var altKategoriId = $("#altKategoriListesi option:selected").attr("data")
    if (anaKategoriId == "" || !anaKategoriId || altKategoriId == "" || !altKategoriId) {
      e.preventDefault();
      alertify.error("Lutfen silmek istediginiz kategoriyi seciniz !")
      return
    }
    wsPost("/urunkategorileri/arraysil", {_id : anaKategoriId, arrayItem : { altKategori : { _id : altKategoriId } }}, function(hata, sonuc){
      if (hata || !sonuc.state) {
        console.log("Hata : " + hata);
        alertify.error("Hata Olustu !")
        return
      }
      alertify.success("Kategori basariyla silindi")
      $("#altKategoriListesi option[data='" + altKategoriId + "']").remove()
    })
  })

  $("#btnUstResimYukle").on("click", function(e){
    if (!$("#inpUstResim").val()) {
      e.preventDefault();
        $("#inpUstResim").val("");
      alertify.error("Lutfen yuklemek istediginiz resmi seciniz !")
      return
    }
  })

  $("#btnUrunResimYukle").on("click", function(e){
    if (!$("#inpMedya").val()) {
      e.preventDefault();
      alertify.error("Lutfen yuklemek istediginiz resmi seciniz !")
      return
    }
  })

  $("#btnUrunKaydet").on("click", function(){
    var anaKategori = $("#anaKategoriListesi option:selected").val()
    var altKategori = $("#altKategoriListesi option:selected").val()
    var aciklama = $("#txtUrunAciklama").val()
    if (anaKategori != "" && altKategori != "") {
      urun.anaKategori = anaKategori
      urun.altKategori = altKategori
      urun.aciklama = aciklama
    }else {
      alertify.error("Kategori secimlerini dogru yapiniz !")
      return
    }
    console.log(urun);
    if (urun.ustResim != "") {
      wsPost("/urunler/ekle", urun, function(hata, sonuc){
        if (hata || !sonuc.state) {
          console.log(hata + "-" + JSON.stringify(sonuc));
          alertify.error("Urun eklenirken hata olsutu !")
          return
        }
        alertify.success("Urun basariyla eklendi !")
        location.reload()
      })
    }
  })

  $("#inpMedya").change(function(){
    var numFiles = $("#inpMedya")[0].files.length;
    if (numFiles > 4) {
      $("#inpMedya").val("")
      alertify.error("Max medya adedi 4 tur !")
    }
  })

  $("#formUstResim").ajaxForm(function(sonuc){
    ustResimEkle(urun,sonuc);
  })

  $("#formMedya").ajaxForm(function(sonuc){
    galeriyeEkle(urun,sonuc);
})

resimSil(urun);
ustResimSil();
    
    removeFromTable("urunlerTable","/urunler/sil",function(){});
    
    $(".urunlerTable").on("click",".guncelle",function(){
        var id=$(this).closest("tr").attr("id");
        $("#btnGuncelle").removeAttr("style");
        $("#btnUrunKaydet").attr("style","display:none");
        wsPost("/urunler/getir",{_id:id},function(err,res){
            if(err){
                console.error(err);
                return;
            }
            var inp=$("<input id='inpId' style='display:none;'value="+res.data._id+">");
            $(".urunlerTable").append(inp);
            $("#anaKategoriListesi").find('option:contains('+res.data.anaKategori+')').attr('selected', true);
            var anaKategoriId= $("#anaKategoriListesi option:selected").attr("data");
            console.log("kid : "+ anaKategoriId);
            wsPost("/urunkategorileri/ara", { kullaniciKodu : $("#inpKullaniciKodu").val(), _id : anaKategoriId}, function(hata, kategori){
                if (hata || !kategori || !kategori.state) {
                  console.log("Hata : " + hata);
                  alertify.error("Hata Olustu !")
                  return
                }
                for(var i = 0; i < kategori.data[0].altKategori.length; i ++){
                  var option = $("<option value='" + kategori.data[0].altKategori[i].kategoriAdi + "' data='" + kategori.data[0].altKategori[i]._id + "'>" + kategori.data[0].altKategori[i].kategoriAdi + "</option>");
                  $("#altKategoriListesi").append(option)
                }
                $("#altKategoriListesi").find('option:contains('+res.data.altKategori+')').attr('selected', true);
              })
            $("#imgUstResim").attr("src",res.data.ustResim);
            $("#txtAciklama").val(res.data.aciklama);
            urun.galeri=res.data.galeri;
            for(var i=0;i<res.data.galeri.length;i++){
                $("#resim"+i).attr("src",res.data.galeri[i].resimLinki);
            }
            
        });
    });
    
    $("#btnGuncelle").click(function(){
        urun.anaKategori = $("#anaKategoriListesi option:selected").val()
        urun.altKategori = $("#altKategoriListesi option:selected").val()
        urun.aciklama=$("#txtAciklama").val();
        urun.kullaniciKodu=$("#inpKullaniciKodu").val();
        if($("#imgUstResim").attr("src")!="/images/default.png"){
            urun.ustResim=$("#imgUstResim").attr("src");
          }
        
        urun._id=$("#inpId").val();
        wsPost("/urunler/guncelle",urun,function(err,res){
            if(err){
                console.log(err);
                return;
            }
            alertify.success("işleminiz başarı ile gerçekleştirildi.");
            location.reload();
        });
    });
});
function selectBosalt(selectId){
  $(selectId).empty()
  var temp = $("<option value='' selected disabled>Alt kategori seciniz</option>");
  $(selectId).append(temp)
}
function urunOlustur(){
  var urun = {
    kullaniciKodu : "",
    anaKategori : "",
    altKategori : "",
    ustResim : "",
    galeri : [],// {resimLinki : ""}
    aciklama : ""
  }
  urun.kullaniciKodu = $("#kullaniciKodu").val()

  return urun
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
