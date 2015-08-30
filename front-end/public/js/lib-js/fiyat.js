$(document).ready(function(){
    var fiyatListesi = {
        kullaniciKodu:"",
        icerikListeAdi:"",
        dosya:""
    };
    $("#formDosya").ajaxForm(function(sonuc){
      if (!sonuc.state) {
        alertify.error("Dosya Yüklenirken Hata Olustu !")
      }
      alertify.success("Dosya Basariyla Yüklendi !")
      fiyatListesi.dosya = sonuc.dosyaListesi.dosyaListesi.path.replace("front-end/public/", sonuc.host)
      console.log(fiyatListesi);
    });

    $("#btnEkle").click(function(){
        fiyatListesi.icerikListeAdi=$("#inpIcerikListeAdi").val();
        fiyatListesi.kullaniciKodu=$("#inpKullaniciKodu").val();
        if (fiyatListesi.dosya != "") {
          wsPost("/fiyatlistesi/ekle",fiyatListesi,function(err,res){
              if(err){
                  alertify.error("Fiyat Listesi Eklenirken Hata Olustu !")
                  return;
              }
              alertify.success("işleminiz başarı ile gerçekleşmistir.");
              location.reload();
          });
        }else {
          alertify.error("Fiyat Listesine PDF ekleyiniz !")
        }
    });
    removeFromTable("fiyatTable","/fiyatlistesi/sil",function(){});

    $(".fiyatTable").on("click",".guncelle",function(){
        var id=$(this).closest("tr").attr("id");
        $("#btnGuncelle").removeAttr("style");
        $("#btnEkle").attr("style","display:none");
        wsPost("/fiyatlistesi/getir",{_id:id},function(err,res){
            if(err){
                console.error(err);
                return;
            }
            fiyatListesi.dosya = res.data.dosya
            var inp=$("<input id='inpId' style='display:none;'value="+res.data._id+">");
            $("#inpIcerikListeAdi").val(res.data.icerikListeAdi);
            $(".fiyatTable").append(inp);
        });
    });

    $("#btnGuncelle").click(function(){
        fiyatListesi.icerikListeAdi=$("#inpIcerikListeAdi").val();
        fiyatListesi.kullaniciKodu=$("#inpKullaniciKodu").val();
        if(fiyatListesi.dosya){
            alertify.error("Lutfen PDF Yukleyiniz !")
        }
        fiyatListesi._id=$("#inpId").val();
        console.log(fiyatListesi);
        wsPost("/fiyatlistesi/guncelle",fiyatListesi,function(err,res){
            if(err){
                console.log(err);
                return;
            }
            alertify.success("işleminiz başarı ile gerçekleştirildi.");
            location.reload();
        });
    });
});
