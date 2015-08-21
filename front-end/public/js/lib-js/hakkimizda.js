$(document).ready(function(){
   
    $("#hakkimizdaForm").ajaxForm(function(data){
        if(data.state==false){
            alertify.error("hata!!!");
            return;
        }
        alertify.success("başarıyla güncellendi.");
    });
});