$(document).ready(function(){
  $("#btnAnaKategoriEkle").on("click", function(){
    var anaKategori = $("#inpAnaKategori").val()
    if (anaKategori != "") {
      wsPost("/urunkategori/ekle", {anaKategori : anaKategori, altKategori : []}, function(hata, kategori){
        if(hata || !kategori){
          console.log("Hata : " + hata);
          alert("Hata Olustu !")
          return
        }
        var option = $("option");
        option.val(kategori.anaKategori);
        option.attr("data", kategori._id);
        
      })
    }else {
      alert("Lutfen kategori adi giriniz !")
    }
  })
})
