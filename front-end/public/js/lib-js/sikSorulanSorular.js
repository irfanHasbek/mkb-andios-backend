$(document).ready(function(){
    var sikSorulanSorular={
        kullaniciKodu:"",
        soru:"",
        cevap:""
    };
    $("#btnSEkle").click(function(){
        sikSorulanSorular.kullaniciKodu=$("#inpKullaniciKodu").val();
        sikSorulanSorular.soru=$("#inpSoru").val();
        sikSorulanSorular.cevap=tinyMCE.get('txtCevap').getContent()
        wsPost("/siksorular/ekle",sikSorulanSorular,function(err,sikSorulanSorular){
            if(err){
                alertify.error("hata!!! ");
                return;
            }
            alertify.success("işleminiz başarı ile gerçekleşti.");
            location.reload();
        });
    });
    removeFromTable("sikSorulanSorularTable","/siksorular/sil",function(){});
    $(".sikSorulanSorularTable").on("click",".guncelle",function(){
        var id=$(this).closest("tr").attr("id");
        $("#btnSGuncelle").removeAttr("style");
        $("#btnSEkle").attr("style","display:none");
        wsPost("/siksorular/getir",{_id:id},function(err,sikSorulanSorular){
            if(err){
                alertify.error("hata!!! ");
                return;
            }
            $("#inpSoru").val(sikSorulanSorular.data.soru);
            tinyMCE.get('txtCevap').setContent(sikSorulanSorular.data.cevap);
            var inp=$("<input id='inpId' style='display:none;'value="+sikSorulanSorular.data._id+">");
            $(".sikSorulanSorularTable").append(inp);
        });
    });
    $("#btnSGuncelle").click(function(){
        sikSorulanSorular.kullaniciKodu=$("#inpKullaniciKodu").val();
        sikSorulanSorular.soru=$("#inpSoru").val();
        sikSorulanSorular.cevap=tinyMCE.get('txtCevap').getContent()
        sikSorulanSorular._id=$("#inpId").val();
        wsPost("/siksorular/guncelle",sikSorulanSorular,function(err,res){
            if(err){
                console.log(err);
                return;
            }
            alertify.success("işleminiz başarı ile gerçekleştirildi.");
            location.reload();
        });
    });
});
