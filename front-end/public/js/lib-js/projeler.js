$(document).ready(function(){
    var projeler={
        kullaniciKodu:"",
        projeDurumu:"",
        ustResim:"",
        aciklama:"",
        galeri:[]
    };
    $("#formMedya").ajaxForm(function(sonuc){
        console.log(sonuc);
        galeriyeEkle(projeler,sonuc);
    });
    $("#btnFotoYukle").click(function(e){
        if (!$("#inpMedya").val()) {
          e.preventDefault();
          alertify.error("Lutfen yuklemek istediginiz resmi seciniz !")
          return
        }
    });
    $("#formUstResim").ajaxForm(function(sonuc){
        ustResimEkle(projeler,sonuc);
    });
    ustResimSil();
    resimSil(projeler);

    $("#btnEkle").click(function(){
        projeler.projeDurumu=$("#slctProjeler option:selected").val();
        projeler.aciklama=tinyMCE.get('txtAciklama').getContent()
        projeler.kullaniciKodu=$("#inpKullaniciKodu").val();
        wsPost("/projeler/ekle",projeler,function(err,res){
            if(err){
                console.error(err);
                return;
            }
            alertify.success("işleminiz başarı ile gerçekleşmistir.");
            location.reload();
        });
    });
    removeFromTable("projelerTable","/projeler/sil",function(){});

    $(".projelerTable").on("click",".guncelle",function(){
        var id=$(this).closest("tr").attr("id");
        $("#btnGuncelle").removeAttr("style");
        $("#btnEkle").attr("style","display:none");
        wsPost("/projeler/getir",{_id:id},function(err,res){
            if(err){
                console.error(err);
                return;
            }
            var inp=$("<input id='inpId' style='display:none;'value="+res.data._id+">");
            $(".projelerTable").append(inp);
            $("#slctProjeler").find('option:contains('+res.data.projeDurumu+')').attr('selected', true);
            $("#imgUstResim").attr("src",res.data.ustResim);
            tinyMCE.get('txtAciklama').setContent(res.data.aciklama);
            projeler.galeri=res.data.galeri;
            for(var i=0;i<res.data.galeri.length;i++){
                $("#resim"+i).attr("src",res.data.galeri[i].resimLinki);
            }

        });
    });

    $("#btnGuncelle").click(function(){
        projeler.projeDurumu=$("#slctProjeler option:selected").val();
        projeler.aciklama=tinyMCE.get('txtAciklama').getContent()
        projeler.kullaniciKodu=$("#inpKullaniciKodu").val();
        if($("#imgUstResim").attr("src")!="/images/default.png"){
            projeler.ustResim=$("#imgUstResim").attr("src");
        }
        projeler._id=$("#inpId").val();
        wsPost("/projeler/guncelle",projeler,function(err,res){
            if(err){
                console.log(err);
                return;
            }
            alertify.success("işleminiz başarı ile gerçekleştirildi.");
            location.reload();
        });
    });
});
