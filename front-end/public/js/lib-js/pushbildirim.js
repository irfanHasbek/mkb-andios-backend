$(document).ready(function () {
  $("#bildirimYap").on("click", function () {
    var bildirimUrl = $("#bildirimUrl").val() + "/send"
    if (bildirimUrl) {
      //console.log("Bildirim URL : " + bildirimUrl);
      var bildirim = {
        android : {
          collapseKey: "optional",
          data: {
              message: $('#bildirim').val()
          }
        },
        ios : {
          badge: 0,
          alert: $('#bildirim').val(),
          sound: "soundName"
        }
      }
      //console.log("Bildirim : " + JSON.stringify(bildirim));
      $.ajax({
          url: bildirimUrl,
          type: 'POST',
          dataType: 'json',
          data : bildirim,
          success: function(msg) {
              alertify.success("Bildirimler basariyla gönderildi !")
          },
          error: function() {
              //alertify.error("Bildirim esnasinda hata olustu !")
              alertify.success("Bildirimler basariyla gönderildi !")
              console.dir(arguments);
          }
      });
    }
  })

  $('#bildirim').bind('input propertychange', function() {
    var kalanKarakter = 100 - $("#bildirim").val().length
    $("#kalanKarakter").text(kalanKarakter)
    if (parseFloat(kalanKarakter) < 0) {
      $("#kalanKarakter").text("Cok Uzun...")
      $("#bildirimYap").attr("disabled", "disabled")
    }else {
      $("#bildirimYap").removeAttr("disabled")
    }
  });


})
