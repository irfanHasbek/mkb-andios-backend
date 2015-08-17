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
      wsPost("/urunkategorileri/arrayekle", {}, function(hata, kategori){
        if(hata || !kategori || !kategori.state){
          console.log("Hata : " + hata);
          alertify.error("Hata Olustu !")
          return
        }
        
      })
    }else {
      alertify.error("Lutfen kategori secin veya alt kategori giriniz !")
    }
  })
})
