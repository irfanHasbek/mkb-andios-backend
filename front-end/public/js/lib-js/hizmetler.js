$(document).ready(function(){
    var hizmetler={
        kullaniciKodu:"",
        kategori:"",
        ustResim:"",
        aciklama:"",
        galeri:[]
    };
    $("#btnHKSil").click(function(){
     var optVal=$("#slctHKategori option:selected").val();
     var optId=$("#slctHKategori option:selected").attr("data");
     wsPost("/hizmetkategorileri/sil",{_id:optId},function(err,res){
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
        wsPost("/hizmetkategorileri/ekle",{kullaniciKodu:kullaniciKodu,kategori:yeniKategori},function(err,res){
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
        galeriyeEkle(hizmetler,sonuc);
    });
    $("#btnFotoYukle").click(function(e){
        if (!$("#inpMedya").val()) {
          e.preventDefault();
          alertify.error("Lutfen yuklemek istediginiz resmi seciniz !")
          return
        }
    });
    $("#formUstResim").ajaxForm(function(sonuc){
        ustResimEkle(hizmetler,sonuc);
    });
    ustResimSil();
    resimSil();
    
    $("#btnEkle").click(function(){
        hizmetler.kategori=$("#slctHKategori option:selected").val();
        hizmetler.aciklama=$("#txtAciklama").val();
        hizmetler.kullaniciKodu=$("#inpKullaniciKodu").val();
        wsPost("/hizmetler/ekle",hizmetler,function(err,res){
            if(err){
                console.error(err);
                return;
            }
            alertify.success("işleminiz başarı ile gerçekleşmistir.");
            location.reload();
        });
    });
    removeFromTable("hizmetlerTable","/hizmetler/sil",function(){});
    
    $(".hizmetlerTable").on("click",".guncelle",function(){
        var id=$(this).closest("tr").attr("id");
        $("#btnGuncelle").removeAttr("style");
        $("#btnEkle").attr("style","display:none");
        wsPost("/hizmetler/getir",{_id:id},function(err,res){
            if(err){
                console.error(err);
                return;
            }
            var inp=$("<input id='inpId' style='display:none;'value="+res.data._id+">");
            $(".hizmetlerTable").append(inp);
            $("#slctHKategori").find('option:contains('+res.data.kategori+')').attr('selected', true);
            $("#imgUstResim").attr("src",res.data.ustResim);
            $("#txtAciklama").val(res.data.aciklama);
            for(var i=0;i<res.data.galeri.length;i++){
                $("#resim"+i).attr("src",res.data.galeri[i].resimLinki);
            }
            
        });
    });
    
    $("#btnGuncelle").click(function(){
        hizmetler.kategori=$("#slctHKategori option:selected").val();
        hizmetler.aciklama=$("#txtAciklama").val();
        hizmetler.kullaniciKodu=$("#inpKullaniciKodu").val();
        if($("#imgUstResim").attr("src")!="/images/default.png"){
            hizmetler.ustResim=$("#imgUstResim").attr("src");
          }
        for(var i=0;i<4;i++){
            if($("#resim"+i).attr("src")!="/images/default.png"){
                hizmetler.galeri.push({resimLinki:$("#resim"+i).attr("src")});
            }
            
        }
        hizmetler._id=$("#inpId").val();
        wsPost("/hizmetler/guncelle",hizmetler,function(err,res){
            if(err){
                console.log(err);
                return;
            }
            alertify.success("işleminiz başarı ile gerçekleştirildi.");
            location.reload();
        });
    });
});
