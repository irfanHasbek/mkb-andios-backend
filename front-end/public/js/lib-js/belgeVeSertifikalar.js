$(document).ready(function(){
    var belgeVeSertifikalar={
        kullaniciKodu:"",
        belgeAdi:"",
        ustResim:""
    };
    $("#formUstResim").ajaxForm(function(sonuc){
        ustResimEkle(belgeVeSertifikalar,sonuc);
    });
    ustResimSil();
    
    $("#btnEkle").click(function(){
        belgeVeSertifikalar.belgeAdi=$("#inpBelgeAdi").val();
        belgeVeSertifikalar.kullaniciKodu=$("#inpKullaniciKodu").val();
        wsPost("/sertifikalar/ekle",belgeVeSertifikalar,function(err,res){
            if(err){
                console.error(err);
                return;
            }
            alertify.success("işleminiz başarı ile gerçekleşmistir.");
            location.reload();
        });
    });
    removeFromTable("sertifikalarTable","/sertifikalar/sil",function(){});
    
    $(".sertifikalarTable").on("click",".guncelle",function(){
        var id=$(this).closest("tr").attr("id");
        $("#btnGuncelle").removeAttr("style");
        $("#btnEkle").attr("style","display:none");
        wsPost("/sertifikalar/getir",{_id:id},function(err,res){
            if(err){
                console.error(err);
                return;
            }
            var inp=$("<input id='inpId' style='display:none;'value="+res.data._id+">");
            $("#inpBelgeAdi").val(res.data.belgeAdi);
            $(".sertifikalarTable").append(inp);
            $("#imgUstResim").attr("src",res.data.ustResim);
            
        });
    });
    
    $("#btnGuncelle").click(function(){
        belgeVeSertifikalar.belgeAdi=$("#inpBelgeAdi").val();
        belgeVeSertifikalar.kullaniciKodu=$("#inpKullaniciKodu").val();
        if($("#imgUstResim").attr("src")!="/images/default.png"){
            belgeVeSertifikalar.ustResim=$("#imgUstResim").attr("src");
        }
        belgeVeSertifikalar._id=$("#inpId").val();
        wsPost("/sertifikalar/guncelle",belgeVeSertifikalar,function(err,res){
            if(err){
                console.log(err);
                return;
            }
            alertify.success("işleminiz başarı ile gerçekleştirildi.");
            location.reload();
        });
    });
});
