$(document).ready(function(){
    var etkinlikler={
        kullaniciKodu:"",
        ustResim:"",
        tarih:"",
        aciklama:"",
        galeri:[]
    };
    $("#formMedya").ajaxForm(function(sonuc){
        console.log(sonuc);
        galeriyeEkle(etkinlikler,sonuc);
    });
    $("#btnFotoYukle").click(function(e){
        if (!$("#inpMedya").val()) {
          e.preventDefault();
          alertify.error("Lutfen yuklemek istediginiz resmi seciniz !")
          return
        }
    });
    $("#formUstResim").ajaxForm(function(sonuc){
        ustResimEkle(etkinlikler,sonuc);
    });
    ustResimSil();
    resimSil(etkinlikler);

    $("#btnEkle").click(function(){
        etkinlikler.aciklama=tinyMCE.get('txtAciklama').getContent()
        etkinlikler.tarih=$("#inpTarih").val();
        etkinlikler.kullaniciKodu=$("#inpKullaniciKodu").val();
        wsPost("/etkinlikler/ekle",etkinlikler,function(err,res){
            if(err){
                console.error(err);
                return;
            }
            alertify.success("işleminiz başarı ile gerçekleşmistir.");
            location.reload();
        });
    });
    removeFromTable("etkinliklerTable","/etkinlikler/sil",function(){});

    $(".etkinliklerTable").on("click",".guncelle",function(){
        var id=$(this).closest("tr").attr("id");
        $("#btnGuncelle").removeAttr("style");
        $("#btnEkle").attr("style","display:none");
        wsPost("/etkinlikler/getir",{_id:id},function(err,res){
            if(err){
                console.error(err);
                return;
            }
            var inp=$("<input id='inpId' style='display:none;'value="+res.data._id+">");
            $(".etkinliklerTable").append(inp);
            $("#imgUstResim").attr("src",res.data.ustResim);
            $("#inpTarih").val(res.data.tarih);
            tinyMCE.get('txtAciklama').setContent(res.data.aciklama);
            etkinlikler.galeri=res.data.galeri;
            for(var i=0;i<res.data.galeri.length;i++){
                $("#resim"+i).attr("src",res.data.galeri[i].resimLinki);
            }

        });
    });

    $("#btnGuncelle").click(function(){
        etkinlikler.aciklama=tinyMCE.get('txtAciklama').getContent()
        etkinlikler.tarih=$("#inpTarih").val();
        etkinlikler.kullaniciKodu=$("#inpKullaniciKodu").val();
        if($("#imgUstResim").attr("src")!="/images/default.png"){
            etkinlikler.ustResim=$("#imgUstResim").attr("src");
        }
        etkinlikler._id=$("#inpId").val();
        wsPost("/etkinlikler/guncelle",etkinlikler,function(err,res){
            if(err){
                console.log(err);
                return;
            }
            alertify.success("işleminiz başarı ile gerçekleştirildi.");
            location.reload();
        });
    });
});
