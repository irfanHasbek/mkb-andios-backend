$(document).ready(function(){
  $("#izinGuncelle").on("click", function(){
    var izinler = {
        "_id": $("#kurumsalIzinlerId").val(),
        "iletisim": {
            "iletisimFormu": false,
            "kroki": false,
            "adresVeTelefonlar": false
        },
        "duyurular": false,
        "etkinlikler": false,
        "haberler": false,
        "kariyer": {
            "isVeStaj": false,
            "ikPolitikasi": false
        },
        "fiyatListesi": false,
        "satisNoktalari": false,
        "musteriHizmetleri": {
            "bilgiBankasi": false,
            "sikSorulanSorular": false,
            "oneriIstekSikayet": false
        },
        "uretim": false,
        "projeler": false,
        "hizmetler": false,
        "urunler": false,
        "kurumsal": {
            "icerik": {
                "kurumsalFotoGaleri": false,
                "kurumsalVideo": false,
                "belgeVeSertifikalar": false
            },
            "hakkimizda": {
                "kalitePolitikasi": false,
                "misyon": false,
                "vizyon": false
            }
        }
    }
    if($("#vizyon").is(":checked")){
      izinler.kurumsal.hakkimizda.vizyon = true;
    }
    if($("#misyon").is(":checked")){
      izinler.kurumsal.hakkimizda.misyon = true;
    }
    if($("#kalitePolitikasi").is(":checked")){
      izinler.kurumsal.hakkimizda.kalitePolitikasi = true;
    }
    if($("#belgeVeSertifikalar").is(":checked")){
      izinler.kurumsal.icerik.belgeVeSertifikalar = true;
    }
    if($("#kurumsalVideo").is(":checked")){
      izinler.kurumsal.icerik.kurumsalVideo = true;
    }
    if($("#kurumsalFotoGaleri").is(":checked")){
      izinler.kurumsal.icerik.kurumsalFotoGaleri = true;
    }
    if($("#urunler").is(":checked")){
      izinler.urunler = true;
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
    if($("#oneriIstekSikayet").is(":checked")){
      izinler.musteriHizmetleri.oneriIstekSikayet = true;
    }
    if($("#sikSorulanSorular").is(":checked")){
      izinler.musteriHizmetleri.sikSorulanSorular = true;
    }
    if($("#bilgiBankasi").is(":checked")){
      izinler.musteriHizmetleri.bilgiBankasi = true;
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
    if($("#ikPolitikasi").is(":checked")){
      izinler.kariyer.ikPolitikasi = true;
    }
    if($("#isVeStaj").is(":checked")){
      izinler.kariyer.isVeStaj = true;
    }
    if($("#adresVeTelefonlar").is(":checked")){
      izinler.iletisim.adresVeTelefonlar = true;
    }
    if($("#kroki").is(":checked")){
      izinler.iletisim.kroki = true;
    }
    if($("#iletisimFormu").is(":checked")){
      izinler.iletisim.iletisimFormu = true;
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
})
