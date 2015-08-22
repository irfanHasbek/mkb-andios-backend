$(document).ready(function(){
    var fiyatListesi={
        kullaniciKodu:"",
        icerikListeAdi:"",
        ustResim:""
    };
    $("#formUstResim").ajaxForm(function(sonuc){
        ustResimEkle(fiyatListesi,sonuc);
    });
    ustResimSil();
    
    $("#btnEkle").click(function(){
        fiyatListesi.icerikListeAdi=$("#inpIcerikListeAdi").val();
        fiyatListesi.kullaniciKodu=$("#inpKullaniciKodu").val();
        wsPost("/fiyatlistesi/ekle",fiyatListesi,function(err,res){
            if(err){
                console.error(err);
                return;
            }
            alertify.success("işleminiz başarı ile gerçekleşmistir.");
            location.reload();
        });
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
            var inp=$("<input id='inpId' style='display:none;'value="+res.data._id+">");
            $("#inpIcerikListeAdi").val(res.data.icerikListeAdi);
            $(".fiyatTable").append(inp);
            $("#imgUstResim").attr("src",res.data.ustResim);
            
        });
    });
    
    $("#btnGuncelle").click(function(){
        fiyatListesi.icerikListeAdi=$("#inpIcerikListeAdi").val();
        fiyatListesi.kullaniciKodu=$("#inpKullaniciKodu").val();
        if($("#imgUstResim").attr("src")!="/images/default.png"){
            fiyatListesi.ustResim=$("#imgUstResim").attr("src");
        }
        fiyatListesi._id=$("#inpId").val();
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
