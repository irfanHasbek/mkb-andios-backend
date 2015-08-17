  <script src="//code.jquery.com/jquery-1.11.3.min.js"></script>
  <script src="/js/utility-js/materialize.js"></script>
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
