$(document).ready(function(){
    var uretim={
        kullaniciKodu:"",
        ustResim:"",
        aciklama:"",
        galeri:[]
    };
    $("#formMedya").ajaxForm(function(sonuc){
        console.log(sonuc);
        galeriyeEkle(uretim,sonuc);
    });
    $("#btnFotoYukle").click(function(e){
        if (!$("#inpMedya").val()) {
          e.preventDefault();
          alertify.error("Lutfen yuklemek istediginiz resmi seciniz !")
          return
        }
    });
    $("#formUstResim").ajaxForm(function(sonuc){
        ustResimEkle(uretim,sonuc);
    });
    ustResimSil();
    resimSil(uretim);

    $("#btnEkle").click(function(){
        uretim.aciklama=tinyMCE.get('txtAciklama').getContent()
        uretim.kullaniciKodu=$("#inpKullaniciKodu").val();
        wsPost("/uretim/ekle",uretim,function(err,res){
            if(err){
                console.error(err);
                return;
            }
            alertify.success("işleminiz başarı ile gerçekleşmistir.");
            location.reload();
        });
    });
    removeFromTable("uretimTable","/uretim/sil",function(){});

    $(".uretimTable").on("click",".guncelle",function(){
        var id=$(this).closest("tr").attr("id");
        $("#btnGuncelle").removeAttr("style");
        $("#btnEkle").attr("style","display:none");
        wsPost("/uretim/getir",{_id:id},function(err,res){
            if(err){
                console.error(err);
                return;
            }
            var inp=$("<input id='inpId' style='display:none;'value="+res.data._id+">");
            $(".uretimTable").append(inp);
            $("#imgUstResim").attr("src",res.data.ustResim);
            tinyMCE.get('txtAciklama').setContent(res.data.aciklama);
            uretim.galeri=res.data.galeri;
            for(var i=0;i<res.data.galeri.length;i++){
                $("#resim"+i).attr("src",res.data.galeri[i].resimLinki);
            }

        });
    });

    $("#btnGuncelle").click(function(){
        uretim.aciklama=tinyMCE.get('txtAciklama').getContent()
        uretim.kullaniciKodu=$("#inpKullaniciKodu").val();
        if($("#imgUstResim").attr("src")!="/images/default.png"){
            uretim.ustResim=$("#imgUstResim").attr("src");
        }
        uretim._id=$("#inpId").val();
        wsPost("/uretim/guncelle",uretim,function(err,res){
            if(err){
                console.log(err);
                return;
            }
            alertify.success("işleminiz başarı ile gerçekleştirildi.");
            location.reload();
        });
    });
});
