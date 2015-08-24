$(document).ready(function(){
    var bilgiBankasi={
        kullaniciKodu:"",
        kategori:"",
        ustResim:"",
        videoLinki:"",
        galeri:[]
    };
    $("#btnHKSil").click(function(){
     var optVal=$("#slctHKategori option:selected").val();
     var optId=$("#slctHKategori option:selected").attr("data");
     wsPost("/bilgibankasikategorileri/sil",{_id:optId},function(err,res){
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
        wsPost("/bilgibankasikategorileri/ekle",{kullaniciKodu:kullaniciKodu,kategori:yeniKategori},function(err,res){
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
        galeriyeEkle(bilgiBankasi,sonuc);
    });
    $("#btnFotoYukle").click(function(e){
        if (!$("#inpMedya").val()) {
          e.preventDefault();
          alertify.error("Lutfen yuklemek istediginiz resmi seciniz !")
          return
        }
    });
    $("#formUstResim").ajaxForm(function(sonuc){
        ustResimEkle(bilgiBankasi,sonuc);
    });
    ustResimSil();
    resimSil(bilgiBankasi);
    
    $("#btnEkle").click(function(){
        bilgiBankasi.kategori=$("#slctHKategori option:selected").val();
        bilgiBankasi.videoLinki=$("#inpVideoLinki").val();
        bilgiBankasi.kullaniciKodu=$("#inpKullaniciKodu").val();
        wsPost("/bilgibankasi/ekle",bilgiBankasi,function(err,res){
            if(err){
                console.error(err);
                return;
            }
            alertify.success("işleminiz başarı ile gerçekleşmistir.");
            location.reload();
        });
    });
    removeFromTable("bilgiBankasiTable","/bilgibankasi/sil",function(){});
    
    $(".bilgiBankasiTable").on("click",".guncelle",function(){
        var id=$(this).closest("tr").attr("id");
        $("#btnGuncelle").removeAttr("style");
        $("#btnEkle").attr("style","display:none");
        wsPost("/bilgibankasi/getir",{_id:id},function(err,res){
            if(err){
                console.error(err);
                return;
            }
            var inp=$("<input id='inpId' style='display:none;'value="+res.data._id+">");
            $(".bilgiBankasiTable").append(inp);
            $("#slctHKategori").find('option:contains('+res.data.kategori+')').attr('selected', true);
            $("#imgUstResim").attr("src",res.data.ustResim);
            $("#inpVideoLinki").val(res.data.videoLinki);
            bilgiBankasi.galeri=res.data.galeri;
            for(var i=0;i<res.data.galeri.length;i++){
                $("#resim"+i).attr("src",res.data.galeri[i].resimLinki);
            }
            
        });
    });
    
    $("#btnGuncelle").click(function(){
        bilgiBankasi.kategori=$("#slctHKategori option:selected").val();
        bilgiBankasi.videoLinki=$("#inpVideoLinki").val();
        bilgiBankasi.kullaniciKodu=$("#inpKullaniciKodu").val();
        if($("#imgUstResim").attr("src")!="/images/default.png"){
            bilgiBankasi.ustResim=$("#imgUstResim").attr("src");
          }
        
        bilgiBankasi._id=$("#inpId").val();
        wsPost("/bilgibankasi/guncelle",bilgiBankasi,function(err,res){
            if(err){
                console.log(err);
                return;
            }
            alertify.success("işleminiz başarı ile gerçekleştirildi.");
            location.reload();
        });
    });
});
