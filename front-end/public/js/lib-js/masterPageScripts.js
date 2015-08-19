  <script>
      $(".button-collapse").sideNav();
      $(".dropdown-button").dropdown({
          constrain_width: false,
          hover: true,
          belowOrigin: true
      });

  </script>
  <script>
      $(document ).ready(function(){
          //modal-trigger
          $('.modal-trigger').leanModal();
          alertify.set('notifier','position', 'top-right');
          $('.upsize').on("click",function(){
            $('.upsize ul').slideToggle(400)
          });

          $('ul .altMenu').each(function(){
            $(this).attr("style","display:none;")
          });
      })
  </script>
  </body>
</html>
