$(document).ready(function(){
    $("#frmBayiler").ajaxForm(function(res){
        if(!res.state){
            console.error(res.data);
            return;
        }
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
        clearInputs("divBayiler");
        $("#divBayiler select").find('option:contains("Ülke Seç")').attr('selected', true);
        $("#divBayiler select").find('option:contains("İl Seç")').attr('selected', true);
        $("#divBayiler select").find('option:contains("İlçe Seç")').attr('selected', true);
        $("#divBayiler select").find('option:contains("Bayi \ Servisler Seç")').attr('selected', true);
        $("textarea").val("");
    });
    removeFromTable("bayilerTable","/bayiler/sil",function(id){
        
    });
    
});

