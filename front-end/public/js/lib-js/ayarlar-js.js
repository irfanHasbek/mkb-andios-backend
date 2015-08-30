$(document).ready(function(){
  $("#izinGuncelle").on("click", function(){
    var izinler = {
        "_id": $("#kurumsalIzinlerId").val(),
        "iletisim": false,
        "duyurular": false,
        "etkinlikler": false,
        "haberler": false,
        "kariyer": false,
        "fiyatListesi": false,
        "satisNoktalari": false,
        "musteriHizmetleri": false,
        "uretim": false,
        "projeler": false,
        "hizmetler": false,
        "urunler": false,
        "kurumsal": false,
        "pushbildirim": false
    }
    if($("#kurumsal").is(":checked")){
      izinler.kurumsal = true;
    }
    if($("#urunler").is(":checked")){
      izinler.urunler = true;
    }
    if($("#pushbildirim").is(":checked")){
      izinler.pushbildirim = true;
    }
    if($("#hizmetler").is(":checked")){
      izinler.hizmetler = true;
    }
    if($("#projeler").is(":checked")){
      izinler.projeler = true;
    }
    if($("#uretim").is(":checked")){
      izinler.uretim = true;
    }
    if($("#musteriHizmetleri").is(":checked")){
      izinler.musteriHizmetleri = true;
    }
    if($("#satisNoktalari").is(":checked")){
      izinler.satisNoktalari = true;
    }
    if($("#fiyatListesi").is(":checked")){
      izinler.fiyatListesi = true;
    }
    if($("#haberler").is(":checked")){
      izinler.haberler = true;
    }
    if($("#etkinlikler").is(":checked")){
      izinler.etkinlikler = true;
    }
    if($("#duyurular").is(":checked")){
      izinler.duyurular = true;
    }
    if($("#kariyer").is(":checked")){
      izinler.kariyer = true;
    }
    if($("#iletisim").is(":checked")){
      izinler.iletisim = true;
    }
    wsPost("/kurumsalizinler/guncelle", izinler, function(hata, etkilenenSatir){
      if(hata){
        alert("Izinler guncellenirken hata olustu !")
        return
      }
      alert("Izinler basari ile guncellendi ! : ")
    })
    //console.log(JSON.stringify(izinler));
  })

  $("#btnResimYukle").on("click", function (e) {
    if(!$("#inpResim").val()){
      e.preventDefault()
      alertify.error("Lutfen Resim Seciniz !")
    }
  })
  $("#formResim").ajaxForm(function (data) {
    if (!data.state) {
      alertify.error("Resim Yuklenirken Hata Olustu !")
      return
    }
    //console.log(data);
    $("#inpProfilResmi").val(data.medyaListesi.medyaListesi.path.replace("front-end/public/", data.host))
    //console.log($("#inpProfilResmi").val());
    alertify.success("Resim Basariyla Yüklendi !")
  })

  $("#kullaniciAyarlariForm").ajaxForm(function (data) {
    if (!data.state) {
      alertify.error("Kullanici Ayarlari Güncellenirken Hata Olustu !")
      return
    }
    alertify.success("Kullanici Ayarlari Basariyla Güncellendi !")
  })

  $("#formSosyalMedya").ajaxForm(function (data) {
    if (!data.state) {
      alertify.error("Sosyal Medya Hesaplari Güncellenirken Hata Olustu !")
      return
    }
    alertify.success("Sosyal Medya Hesaplari Basariyla Güncellendi !")
  })
})
