$(document).ready(function(){
    var kurumsalFotoGaleri={
        kullaniciKodu:"",
        galeriAdi:"",
        galeri:[]
    };
    $("#formMedya").ajaxForm(function(sonuc){
        console.log(sonuc);
        galeriyeEkle(kurumsalFotoGaleri,sonuc);
    });
    $("#btnFotoYukle").click(function(e){
        if (!$("#inpMedya").val()) {
          e.preventDefault();
          alertify.error("Lutfen yuklemek istediginiz resmi seciniz !")
          return
        }
    });
    resimSil(kurumsalFotoGaleri);
    
    $("#btnKFEkle").click(function(){
        kurumsalFotoGaleri.galeriAdi=$("#inpGaleriAdi").val();
        kurumsalFotoGaleri.kullaniciKodu=$("#inpKullaniciKodu").val();
        wsPost("/kurumsalfotogaleri/ekle",kurumsalFotoGaleri,function(err,res){
            if(err){
                console.error(err);
                return;
            }
            alertify.success("işleminiz başarı ile gerçekleşmistir.");
            location.reload();
        });
    });
    removeFromTable("kurumsalFotoGaleriTable","/kurumsalfotogaleri/sil",function(){});
    
    $(".kurumsalFotoGaleriTable").on("click",".guncelle",function(){
        var id=$(this).closest("tr").attr("id");
        $("#btnKFGuncelle").removeAttr("style");
        $("#btnKFEkle").attr("style","display:none");
        wsPost("/kurumsalfotogaleri/getir",{_id:id},function(err,res){
            if(err){
                console.error(err);
                return;
            }
            var inp=$("<input id='inpId' style='display:none;'value="+res.data._id+">");
            $(".kurumsalFotoGaleriTable").append(inp);
            $("#inpGaleriAdi").val(res.data.galeriAdi);
            kurumsalFotoGaleri.galeri=res.data.galeri;
            for(var i=0;i<res.data.galeri.length;i++){
                $("#resim"+i).attr("src",res.data.galeri[i].resimLinki);
            }
            
        });
    });
    
    $("#btnKFGuncelle").click(function(){
        kurumsalFotoGaleri.galeriAdi=$("#inpGaleriAdi").val();
        kurumsalFotoGaleri.kullaniciKodu=$("#inpKullaniciKodu").val();
        kurumsalFotoGaleri._id=$("#inpId").val();
        wsPost("/kurumsalfotogaleri/guncelle",kurumsalFotoGaleri,function(err,res){
            if(err){
                console.log(err);
                return;
            }
            alertify.success("işleminiz başarı ile gerçekleştirildi.");
            location.reload();
        });
    });
});
