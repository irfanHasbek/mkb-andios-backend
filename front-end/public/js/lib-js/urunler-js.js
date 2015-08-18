$(document).ready(function(){
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
      alert("Lutfen kategori adi giriniz !")
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

  $("#formUstResim").ajaxForm(function(sonuc){
    if(!sonuc.state) {
      alertify.error("Resim yuklenirken hata olustu !")
      return
    }
    var ustResimUrl = sonuc.medyaListesi.medyaListesi.path.replace("front-end/public/",sonuc.host)
    if (ustResimUrl) {
      $("#imgUstResim").attr("src", ustResimUrl);
      alertify.success("Resim basariyla yuklendi !")
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
    alertify.success("Resim basariyla yuklendi !")
  })

})

//dropdown bosalt
function selectBosalt(selectId){
  $(selectId).empty()
  var temp = $("<option value='' selected disabled>Alt kategori seciniz</option>");
  $(selectId).append(temp)
}
