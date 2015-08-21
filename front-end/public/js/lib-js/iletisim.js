$(document).ready(function(){
    $("#frmIletisim").ajaxForm(function(res){
        if(res.state==false){
            alertify.error("hata!!!");
            return;
        }
        alertify.success("işleminiz başarıyla gerçekleşmiştir.");
    });
    $("#btnGetir").click(function(){
        var lat=$("#inpLat").val();
        var long=$("#inpLong").val();
        
        $("#ifrmMap").attr("src","https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d7098.94326104394!2d"+long+"!3d"+lat+"!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2s!4v1385710909804")
    });
    removeFromTable("iletisimFormlariTable","/iletisimformu/sil",function(){});
});