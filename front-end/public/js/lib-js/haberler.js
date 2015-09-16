$(document).ready(function(){
    var haberler={
        kullaniciKodu:"",
        kategori:"",
        ustResim:"",
        aciklama:"",
        galeri:[]
    };
    $("#btnHKSil").click(function(){
     var optVal=$("#slctHKategori option:selected").val();
     var optId=$("#slctHKategori option:selected").attr("data");
     wsPost("/haberkategorileri/sil",{_id:optId},function(err,res){
        if(err){
            alertify.error("kategori silinemedi hata!!!");
            return;
        }
        $("#slctHKategori option[value="+optVal+"]").remove();
         alertify.success("işleminiz başarıyla gerçekleşti.");
       });
    });
    $("#btnHKEkle").click(function(){
        var yeniKategori=$("#inpHKategoriAdi").val();
        var kullaniciKodu=$("#inpKullaniciKodu").val();
        wsPost("/haberkategorileri/ekle",{kullaniciKodu:kullaniciKodu,kategori:yeniKategori},function(err,res){
            if(err){
                alertify.error("hata!!");
                return;
            }
            console.log(JSON.stringify(res));
            var opt=$("<option data="+res.data._id+" value="+res.data.kategori+">"+res.data.kategori+"</option>");
            $("#slctHKategori").append(opt);
            $("#inpHKategoriAdi").val("");
            alertify.success("işleminiz başarı ile gerçekleştirildi.");
        })
    });
    $("#formMedya").ajaxForm(function(sonuc){
        console.log(sonuc);
        galeriyeEkle(haberler,sonuc);
    });
    $("#btnFotoYukle").click(function(e){
        if (!$("#inpMedya").val()) {
          e.preventDefault();
          alertify.error("Lutfen yuklemek istediginiz resmi seciniz !")
          return
        }
    });
    $("#formUstResim").ajaxForm(function(sonuc){
        ustResimEkle(haberler,sonuc);
    });
    ustResimSil();
    resimSil(haberler);

    $("#btnEkle").click(function(){
        haberler.kategori=$("#slctHKategori option:selected").val();
        haberler.aciklama=tinyMCE.get('txtAciklama').getContent()
        haberler.kullaniciKodu=$("#inpKullaniciKodu").val();
        wsPost("/haberler/ekle",haberler,function(err,res){
            if(err){
                console.error(err);
                return;
            }
            alertify.success("işleminiz başarı ile gerçekleşmistir.");
            location.reload();
        });
    });
    removeFromTable("haberlerTable","/haberler/sil",function(){});

    $(".haberlerTable").on("click",".guncelle",function(){
        var id=$(this).closest("tr").attr("id");
        $("#btnGuncelle").removeAttr("style");
        $("#btnEkle").attr("style","display:none");
        wsPost("/haberler/getir",{_id:id},function(err,res){
            if(err){
                console.error(err);
                return;
            }
            var inp=$("<input id='inpId' style='display:none;'value="+res.data._id+">");
            $(".haberlerTable").append(inp);
            $("#slctHKategori").find('option:contains('+res.data.kategori+')').attr('selected', true);
            $("#imgUstResim").attr("src",res.data.ustResim);
            tinyMCE.get('txtAciklama').setContent(res.data.aciklama);
            haberler.galeri=res.data.galeri;
            for(var i=0;i<res.data.galeri.length;i++){
                $("#resim"+i).attr("src",res.data.galeri[i].resimLinki);
            }

        });
    });

    $("#btnGuncelle").click(function(){
        haberler.kategori=$("#slctHKategori option:selected").val();
        haberler.aciklama=tinyMCE.get('txtAciklama').getContent()
        haberler.kullaniciKodu=$("#inpKullaniciKodu").val();
        if($("#imgUstResim").attr("src")!="/images/default.png"){
            haberler.ustResim=$("#imgUstResim").attr("src");
          }

        haberler._id=$("#inpId").val();
        wsPost("/haberler/guncelle",haberler,function(err,res){
            if(err){
                console.log(err);
                return;
            }
            alertify.success("işleminiz başarı ile gerçekleştirildi.");
            location.reload();
        });
    });
});
