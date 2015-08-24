$(document).ready(function(){
    var kurumsalVideo={
        kullaniciKodu:"",
        videoAdi:"",
        videoLinki:""
    };
    $("#btnKVEkle").click(function(){
        kurumsalVideo.kullaniciKodu=$("#inpKullaniciKodu").val();
        kurumsalVideo.videoAdi=$("#inpVideoAdi").val();
        kurumsalVideo.videoLinki=$("#inpVideoLinki").val();
        wsPost("/kurumsalvideo/ekle",kurumsalVideo,function(err,kurumsalVideo){
            if(err){
                alertify.error("hata!!! ");
                return;
            }
            alertify.success("işleminiz başarı ile gerçekleşti.");
            location.reload();
        });
    });
    removeFromTable("kurumsalVideoTable","/kurumsalvideo/sil",function(){});
    $(".kurumsalVideoTable").on("click",".guncelle",function(){
        var id=$(this).closest("tr").attr("id");
        $("#btnKVGuncelle").removeAttr("style");
        $("#btnKVEkle").attr("style","display:none");
        wsPost("/kurumsalvideo/getir",{_id:id},function(err,kurumsalVideo){
            if(err){
                alertify.error("hata!!! ");
                return;
            }
            $("#inpVideoAdi").val(kurumsalVideo.data.videoAdi);
            $("#inpVideoLinki").val(kurumsalVideo.data.videoLinki);
            var inp=$("<input id='inpId' style='display:none;'value="+kurumsalVideo.data._id+">");
            $(".kurumsalVideoTable").append(inp);
        });
    });
    $("#btnKVGuncelle").click(function(){
        kurumsalVideo.kullaniciKodu=$("#inpKullaniciKodu").val();
        kurumsalVideo.videoAdi=$("#inpVideoAdi").val();
        kurumsalVideo.videoLinki=$("#inpVideoLinki").val();
        kurumsalVideo._id=$("#inpId").val();
        console.log(kurumsalVideo);
        wsPost("/kurumsalvideo/guncelle",kurumsalVideo,function(err,res){
            if(err){
                console.log(err);
                return;
            }
            alertify.success("işleminiz başarı ile gerçekleştirildi.");
            location.reload();
        });
    });
});