$(document).ready(function(){
  var urun = urunOlustur()
  //modal-trigger
  $('.modal-trigger').leanModal();
  //Sayfayi refreshden onleme
  window.onbeforeunload = function() {
    return "Hey, you're leaving the site. Bye!";
  };
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
    console.log(urun);
  })

  $("#inpMedya").change(function(){
    var numFiles = $("#inpMedya")[0].files.length;
    if (numFiles > 4) {
      $("#inpMedya").val("")
      alertify.error("Max medya adedi 4 tur !")
    }
  })

  $("#formUstResim").ajaxForm(function(sonuc){
    if(!sonuc.state) {
      alertify.error("Resim yuklenirken hata olustu !")
      return
    }
    var ustResimUrl = resimLinkOlustur(sonuc.medyaListesi.medyaListesi.path, sonuc.host)
    if (ustResimUrl) {
      $("#imgUstResim").attr("src", ustResimUrl);
      urun.ustResim = ustResimUrl
      alertify.success("Resim basariyla yuklendi !")
      $("#inpUstResim").val("")
    }else {
      alertify.error("Resim yuklenirken hata olustu !")
      return
    }
  })

  $("#formMedya").ajaxForm(function(sonuc){
    if(!sonuc.state) {
      alertify.error("Resim yuklenirken hata olustu !")
      return
    }
    var galeri = sonuc.medyaListesi.medyaListesi
    if (galeri.length > 0) {
      for (var i = 0; i < galeri.length; i++) {
        if (urun.galeri.length < 4) {
          urun.galeri.push({ resimLinki : resimLinkOlustur(galeri[i].path, sonuc.host)})
        }else {
          alertify.success("Max resim sayisina ulasildi !")
          return
        }
        $("#resim" + i).attr("src", resimLinkOlustur(galeri[i].path, sonuc.host))
      }
    }else {
      urun.galeri.push({ resimLinki : resimLinkOlustur(galeri.path, sonuc.host)})
      $("#resim0").attr("src", resimLinkOlustur(galeri.path, sonuc.host))
    }
    $("#inpMedya").val("")
    alertify.success("Resimler basariyla yuklendi !")
  })

})

$(".resimSil").on("click", function(){
  var sira = $(this).attr("id").replace("sil","")
  var resimLinki = $("#resim" + sira).attr("src")

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

//dropdown bosalt
function selectBosalt(selectId){
  $(selectId).empty()
  var temp = $("<option value='' selected disabled>Alt kategori seciniz</option>");
  $(selectId).append(temp)
}

function resimLinkOlustur(link, sunucu){
  var ustResimUrl = link.replace("front-end/public/",sunucu)
  return ustResimUrl
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
