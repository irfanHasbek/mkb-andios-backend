$(document).ready(function(){
    var ikPolitikasi={
        kullaniciKodu:"",
        ustResim:"",
        aciklama:""
    };
    $("#formUstResim").ajaxForm(function(sonuc){
        ustResimEkle(ikPolitikasi,sonuc);
    });
    ustResimSil();

    $("#btnEkle").click(function(){
        ikPolitikasi.aciklama=tinyMCE.get('txtAciklama').getContent()
        ikPolitikasi.kullaniciKodu=$("#inpKullaniciKodu").val();
        wsPost("/ikpolitikasi/ekle",ikPolitikasi,function(err,res){
            if(err){
                console.error(err);
                return;
            }
            alertify.success("işleminiz başarı ile gerçekleşmistir.");
            location.reload();
        });
    });
    removeFromTable("ikPolitikasiTable","/ikpolitikasi/sil",function(){});

    $(".ikPolitikasiTable").on("click",".guncelle",function(){
        var id=$(this).closest("tr").attr("id");
        $("#btnGuncelle").removeAttr("style");
        $("#btnEkle").attr("style","display:none");
        wsPost("/ikpolitikasi/getir",{_id:id},function(err,res){
            if(err){
                console.error(err);
                return;
            }
            var inp=$("<input id='inpId' style='display:none;'value="+res.data._id+">");
            tinyMCE.get('txtAciklama').setContent(res.data.aciklama);
            $(".ikPolitikasiTable").append(inp);
            $("#imgUstResim").attr("src",res.data.ustResim);

        });
    });

    $("#btnGuncelle").click(function(){
        ikPolitikasi.aciklama=tinyMCE.get('txtAciklama').getContent()
        ikPolitikasi.kullaniciKodu=$("#inpKullaniciKodu").val();
        if($("#imgUstResim").attr("src")!="/images/default.png"){
            ikPolitikasi.ustResim=$("#imgUstResim").attr("src");
        }
        ikPolitikasi._id=$("#inpId").val();
        wsPost("/ikpolitikasi/guncelle",ikPolitikasi,function(err,res){
            if(err){
                console.log(err);
                return;
            }
            alertify.success("işleminiz başarı ile gerçekleştirildi.");
            location.reload();
        });
    });
    removeFromTable("isStajTable","/isstaj/sil",function(){});
});
