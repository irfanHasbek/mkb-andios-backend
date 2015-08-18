$(document).ready(function(){
    $("#frmBayiler").ajaxForm(function(res){
        if(!res.state){
            console.error(res.data);
            return;
        }
        location.reload();
    });
    removeFromTable("bayilerTable","/bayiler/sil",function(id){
        
    });
    
    $(".bayilerTable").on("click",".guncelle",function(){
        $("#frmBayiler").attr("action","/bayiler/guncelle");
        var _id=$(this).closest("tr").attr("id");
        wsPost("/bayiler/getir",{_id:_id},function(err,result){
            console.log(JSON.stringify(result.data));
            if(err){
                console.error("error : "+err);
                return;
            }
            
        })
        
    });
});

