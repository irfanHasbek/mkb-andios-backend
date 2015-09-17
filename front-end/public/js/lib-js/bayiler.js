$(document).ready(function(){
    $("#slctSehir").change(function (){
      //console.log($(this).val());
      var sehir = $(this).val()
      wsPost("/sehir/ara", {city : sehir}, function (ilceHata, ilceler) {
        if(ilceHata) {
          console.error(ilceHata);
          return
        }
        ilceDoldur(ilceler.data[0].towns)
      })
    })

    function ilceDoldur (ilceler){
      $("#slctIlce").empty()
      var sabitSecenek = $("<option selected disabled> Ilce Seciniz</option>")

      $("#slctIlce").append(sabitSecenek)

      for (var i = 0; i < ilceler.length; i++) {
        var ilce = $("<option value'" + ilceler[i].townName + "'> " + ilceler[i].townName + "</option>")
        $("#slctIlce").append(ilce)
      }
    }
    $("#frmBayiler").ajaxForm(function(res){
        if(!res.state){
            console.error(res.data);
            return;
        }

        if($("#frmBayiler").attr("action")=="/bayiler/ekle"){
            addRow(res);
            allClear();

        }else{

            $("#frmBayiler").attr("action","/bayiler/ekle");
            $("#btnEkle").text("ekle");
            var id=$("#inpId").val();
            wsPost("/bayiler/getir",{_id:id},function(err,result){
                 if(err){
                    console.error("error : "+err);
                    return;
                 }
                $(".bayilerTable tbody").find("tr[id="+$("#inpId").val()+"]").find("td").eq("1").text(result.data.bayiTuru);
                $(".bayilerTable tbody").find("tr[id="+$("#inpId").val()+"]").find("td").eq("2").text(result.data.ilAdi);
                $(".bayilerTable tbody").find("tr[id="+$("#inpId").val()+"]").find("td").eq("3").text(result.data.ilceAdi);
                $(".bayilerTable tbody").find("tr[id="+$("#inpId").val()+"]").find("td").eq("4").text(result.data.ad);
                $(".bayilerTable tbody").find("tr[id="+$("#inpId").val()+"]").find("td").eq("5").text(result.data.adres);
                $(".bayilerTable tbody").find("tr[id="+$("#inpId").val()+"]").find("td").eq("6").text(result.data.tel);
                $(".bayilerTable tbody").find("tr[id="+$("#inpId").val()+"]").find("td").eq("7").text(result.data.fax);
                $(".bayilerTable tbody").find("tr[id="+$("#inpId").val()+"]").find("td").eq("8").text(result.data.email);
                $(".bayilerTable tbody").find("tr[id="+$("#inpId").val()+"]").find("td").eq("9").text(result.data.web);
                allClear();
                alertify.success("Bilgileriniz başarı ile güncellendi.");
            });

        }
    });
    removeFromTable("bayilerTable","/bayiler/sil",function(id){

    });

    $(".bayilerTable").on("click",".guncelle",function(){
        $("#frmBayiler").attr("action","/bayiler/guncelle");
        $("#btnEkle").text("Güncelle");
        var _id=$(this).closest("tr").attr("id");
        wsPost("/bayiler/getir",{_id:_id},function(err,result){

            if(err){
                console.error("error : "+err);
                return;
            }
            $("#slctUlke").find('option:contains('+result.data.ulkeAdi+')').attr('selected', true);
            $("#slctSehir").find('option:contains('+result.data.ilAdi+')').attr('selected', true);
            $("#slctIlce").find('option:contains('+result.data.ilceAdi+')').attr('selected', true);
            $("#slctBayiTuru").find('option:contains('+result.data.bayiTuru+')').attr('selected', true);
            var input=$("<input value="+_id+" style='display:none;' type='text' name='_id' id='inpId'>");
            $("#divBayi").append(input);
            $("#inpAd").val(result.data.ad);
            $("#inpAdres").val(result.data.adres);
            $("#inpTel").val(result.data.tel);
            $("#inpFax").val(result.data.fax);
            $("#inpEmail").val(result.data.email);
            $("#inpWeb").val(result.data.web);
            tinyMCE.get('txtAciklama').setContent(result.data.aciklama);

        });

    });
});
function allClear(){
    clearInputs("divBayiler");
    $("#divBayiler select").find('option:contains("Ülke Seç")').attr('selected', true);
    $("#divBayiler select").find('option:contains("İl Seç")').attr('selected', true);
    $("#divBayiler select").find('option:contains("İlçe Seç")').attr('selected', true);
    $("#divBayiler select").find('option:contains("Bayi \ Servisler Seç")').attr('selected', true);
    $("textarea").val("");

}
function addRow(res){
    var tbody=$(".bayilerTable tbody");
    var tableLength=tbody.find("tr").length +1;
    var tr=$("<tr id="+res.data._id+"></tr>");
    var tdSira=$("<td>"+tableLength+".</td>");
    var tdBayiTuru=$("<td>"+res.data.bayiTuru+"</td>");
    var tdIlAdi=$("<td>"+res.data.ilAdi+"</td>");
    var tdilceAdi=$("<td>"+res.data.ilceAdi+"</td>");
    var tdAd=$("<td>"+res.data.ad+"</td>");
    var tdadres=$("<td>"+res.data.adres+"</td>");
    var tdTel=$("<td>"+res.data.tel+"</td>");
    var tdfax=$("<td>"+res.data.fax+"</td>");
    var tdemail=$("<td>"+res.data.email+"</td>");
    var tdweb=$("<td>"+res.data.web+"</td>");
    var tdbuttons=$('<td id='+res.data._id+'><button class="btn btn-floating red tooltipped sil"  data-position="top" data-delay="50" data-tooltip="Sil"><i class="mdi-action-delete"></i></button><button class="btn btn-floating green tooltipped guncelle"  data-position="top" data-delay="50" data-tooltip="Değiştir"><i class="mdi-av-replay"></i></button></td>');
    tbody.append(tr);
    tr.append(tdSira);
    tr.append(tdBayiTuru);
    tr.append(tdIlAdi);
    tr.append(tdilceAdi);
    tr.append(tdAd);
    tr.append(tdadres);
    tr.append(tdTel);
    tr.append(tdfax);
    tr.append(tdemail);
    tr.append(tdweb);
    tr.append(tdbuttons);
    alertify.success("bilgileriniz başarı ile eklendi.");
}
