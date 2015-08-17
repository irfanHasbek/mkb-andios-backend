$(document).ready(function(){
   
    $("#hakkimizdaForm").ajaxForm(function(data){
        console.log("başarılı "+data);
    });
});