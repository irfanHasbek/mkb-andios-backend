$(document).ready(function(){
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

  $("#btnAltKategoriEkle").on("click", function(){
    var anaKategoriId = $("#anaKategoriListesi option:selected").attr("data");
    var altKategori = $("#inpAltKategori").val()
    if (anaKategoriId && altKategori) {
      wsPost("/urunkategorileri/arrayekle", {_id : anaKategoriId, arrayItem : { altKategori : [{ kategoriAdi : altKategori}]}}, function(hata, kategori){
        if(hata || !kategori || !kategori.state){
          console.log("Hata : " + hata);
          alertify.error("Hata Olustu !")
          return
        }
        console.log(kategori);
      })
    }else {
      alertify.error("Lutfen kategori secin veya alt kategori giriniz !")
    }
  })

  $("#anaKategoriListesi").change(function(){
    $("#altKategoriListesi").empty()
    var temp = $("<option value='' selected disabled>Alt kategori seciniz</option>");
    $("#altKategoriListesi").append(temp)

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
          alertify.success("Kategoriler listelendi !")
        }
      })
    }
  })
})
