$(document).ready(function(){
    var duyurular={
        kullaniciKodu:"",
        ustResim:"",
        aciklama:"",
        galeri:[]
    };
    $("#formMedya").ajaxForm(function(sonuc){
        //console.log(sonuc);
        galeriyeEkle(duyurular,sonuc);
    });
    $("#btnFotoYukle").click(function(e){
        if (!$("#inpMedya").val()) {
          e.preventDefault();
          alertify.error("Lutfen yuklemek istediginiz resmi seciniz !")
          return
        }
    });
    $("#formUstResim").ajaxForm(function(sonuc){
        ustResimEkle(duyurular,sonuc);
    });
    ustResimSil();
    resimSil(duyurular);

    $("#btnEkle").click(function(){
        duyurular.aciklama=tinyMCE.get('txtAciklama').getContent()
        duyurular.kullaniciKodu=$("#inpKullaniciKodu").val();
        wsPost("/duyurular/ekle",duyurular,function(err,res){
            if(err){
                console.error(err);
                return;
            }
            alertify.success("işleminiz başarı ile gerçekleşmistir.");
            location.reload();
        });
    });
    removeFromTable("duyurularTable","/duyurular/sil",function(){});

    $(".duyurularTable").on("click",".guncelle",function(){
        var id=$(this).closest("tr").attr("id");
        $("#btnGuncelle").removeAttr("style");
        $("#btnEkle").attr("style","display:none");
        wsPost("/duyurular/getir",{_id:id},function(err,res){
            if(err){
                console.error(err);
                return;
            }
            var inp=$("<input id='inpId' style='display:none;'value="+res.data._id+">");
            $(".duyurularTable").append(inp);
            $("#imgUstResim").attr("src",res.data.ustResim);
            tinyMCE.get('txtAciklama').setContent(res.data.aciklama);
            duyurular.galeri=res.data.galeri;
            for(var i=0;i<res.data.galeri.length;i++){
                $("#resim"+i).attr("src",res.data.galeri[i].resimLinki);
            }

        });
    });

    $("#btnGuncelle").click(function(){
        duyurular.aciklama=tinyMCE.get('txtAciklama').getContent()
        duyurular.kullaniciKodu=$("#inpKullaniciKodu").val();
        if($("#imgUstResim").attr("src")!="/images/default.png"){
            duyurular.ustResim=$("#imgUstResim").attr("src");
        }
        duyurular._id=$("#inpId").val();
        wsPost("/duyurular/guncelle",duyurular,function(err,res){
            if(err){
                console.log(err);
                return;
            }
            alertify.success("işleminiz başarı ile gerçekleştirildi.");
            location.reload();
        });
    });
});
