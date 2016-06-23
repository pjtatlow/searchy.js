
(function( $ ) {
 
  $.fn.searchyBox = function(options) {

    var settings = $.extend({
      appendTo: "body",
      dates: false,
      draggable: false,
      posts : [],
      idx : {},
      floatingBtn: false
    }, options );
    
    $(settings.appendTo).append('<div class="searchy-background"><div class="searchy-cover"><div class="searchy-box"><div class="col-md-12 col-lg 12 col-sm-12 col-xs-12 input-group"><input type="text" class="form-control searchy-input" placeholder="searchy Notes" autocomplete="off"><span class="searchy-addon input-group-addon"><i class="glyphicon glyphicon-search"></i></span></div><span class="searchy-input-cover"></span><div class="searchy-bottom" class="col-md-12 col-lg 12 col-sm-12 col-xs-12"></div></div></div></div>')

    if (settings.floatingBtn) {
      $(settings.appendTo).append('<button class="searchy-button"><i class="glyphicon glyphicon-search"></i></button>')
      $(".searchy-button").click(function() {
        $(".searchy-background").fadeToggle(100, function() {
        if ($(".searchy-background").css('display') !== "none") {
          $(".searchy-input").focus();
        }
        else {
          $(".searchy-input").blur();
        }        
      });
    })
    }
                                
    
    var selectPost = function(id) {
      $(".searchy-result").each(function() {
        $(this).removeClass("selected");
        if ($(this).attr("data-searchy-id") == id) {
          $(this).addClass("selected");
        }
      })    

      var post = settings.posts[id];

      $(".searchy-results-preview").empty();
      $(".searchy-results-preview").append('<h5 class="text-center"><strong>Preview</strong></h5><div class="searchy-preview-container"></div>');
      $(".searchy-preview-container").append(post.html);
      if (settings.dates) {
        $(".searchy-results-preview").append('<h5 class="searchy-results-preview-meta">' + post.date.toLocaleDateString() + "</h5>");
      }
      $('.searchy-input').focus();
    }
    
    if (settings.draggable) {
      $(".searchy-box").draggable({
        containment: ".searchy-background",
        handle: ".searchy-input-cover"
      }); // make searchy-bar draggable
    }
    $(document).keydown(function(e) {
      if (e.which == 32) { // spacebar
        if (e.shiftKey) {    
          e.preventDefault();
          $(".searchy-background").fadeToggle(100, function() {
            if ($(".searchy-background").css('display') !== "none") {
              $(".searchy-input").focus();
            }
            else {
              $(".searchy-input").blur();
            }
          })
        }
      }
      else if ($(".searchy-background").css('display') !== "none") {
        if (e.which == 40 || (e.which == 9 && e.shiftKey === false)) { // down arrow
          e.preventDefault();
          var index = -1;
          var max = -1;
          $(".searchy-result").each(function() {
            if ($(this).attr("data-searchy-index") > max) {
              max = $(this).attr("data-searchy-index");
            }          
            if ($(this).hasClass("selected")) {
              $(this).removeClass("selected");
              index = $(this).attr("data-searchy-index");
            }
          })
          index++;
          if (index > max) {
            index = 0;
          }
          selectPost($("[data-searchy-index="+ index + "]").attr("data-searchy-id"));

        }
        else if (e.which == 38 || (e.which == 9 && e.shiftKey === true)) { // up arrow

          e.preventDefault();
          var index = -1;
          var max = -1;
          $(".searchy-result").each(function() {
            if ($(this).attr("data-searchy-index") > max) {
              max = $(this).attr("data-searchy-index");
            }
            if ($(this).hasClass("selected")) {
              $(this).removeClass("selected");
              index = $(this).attr("data-searchy-index");
            }
          })
          index--;
          if (index < 0) {
            index = max;
          }

          selectPost($("[data-searchy-index="+ index + "]").attr("data-searchy-id"));
        }
        else if (e.which == 13) {
          console.log($(".searchy-result.selected").children('a').attr("href"));
          var href = $(".searchy-result.selected").children('a').attr("href");
          $(".searchy-bottom").empty();
          $('.searchy-background').hide()
            window.location = href;          
        }
      }

    }); // watch for SHIFT + SPACE and arrow up and down

    $(".searchy-background").on("click",function(e) {
      if (e.target == $(this)[0]) {
        $(this).fadeToggle(100, function() {
          $("#searchy-input").blur();
        });
      }
    }); // close when you click outside of 

    $(".searchy-input-cover").on("click",function(e) { 
      $(".searchy-input").focus();
    }); // focus on input box when you click anywhere on the searchy bar

    $(".searchy-input").on("input",function(e) {
      $(".searchy-bottom").empty();
      var results = settings.idx.search($(this).val());
      if (results.length > 0) {
        $(".searchy-bottom").empty();
        $(".searchy-bottom").append('<div class="searchy-results"><div><h5 class="searchy-results-title"><strong>Results:</strong><span class="pull-right>"'+ results.length +'</span></h5></div></div><div class="searchy-results-preview"></div>')
        var i = 0;
        for (var result of results) {
          var post = settings.posts[result.ref]
          var striped = "";
          if ((i % 2) == 1) {
             striped = "striped";
          }
          $(".searchy-results").append('<div class="searchy-result '+ striped + '" data-searchy-index="'+ i +'" data-searchy-id="'+ result.ref +'"><h5>' + post.title + "</h5><a href='"+post.url+"'><i class='fa fa-arrow-circle-right'></i></a></div>")
          if (i == 0) {
            selectPost(result.ref);
          }
          i++;
        }
      }
    });

    $(".searchy-input").keydown(function(e) {
      if (e.which == 40 || e.which == 38) {
        e.preventDefault();
      }
    });



    $(document).on('click',".searchy-result",function(e) {
      var id = $(e.target).attr("data-searchy-id")
      if (id === undefined) {
        id = $(e.target).parent().attr("data-searchy-id")
      }
      selectPost(id);
    });
    return this;

  };

}( jQuery ));
