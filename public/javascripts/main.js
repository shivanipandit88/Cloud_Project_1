/******MENU********/
(function($) {
    var size;
	
		//SMALLER HEADER WHEN SCROLL PAGE
    function smallerMenu() {
        var sc = $(window).scrollTop();
        if (sc > 40) {
            $('#header-sroll').addClass('small');
        }else {
            $('#header-sroll').removeClass('small');
        }
    }

    // VERIFY WINDOW SIZE
    function windowSize() {
        size = $(document).width();
        if (size >= 991) {
            $('body').removeClass('open-menu');
            $('.hamburger-menu .bar').removeClass('animate');
        }
    };

     // ESC BUTTON ACTION
    $(document).keyup(function(e) {
        if (e.keyCode == 27) {
            $('.bar').removeClass('animate');
            $('body').removeClass('open-menu');
            $('header .desk-menu .menu-container .menu .menu-item-has-children a ul').each(function( index ) {
                $(this).removeClass('open-sub');
            });
        }
    });



     // ANIMATE HAMBURGER MENU
    $('.hamburger-menu').on('click', function() {
        $('.hamburger-menu .bar').toggleClass('animate');
        if($('body').hasClass('open-menu')){
            $('body').removeClass('open-menu');
        }else{
            $('body').toggleClass('open-menu');
        }
    });

    $('header .desk-menu .menu-container .menu .menu-item-has-children ul').each(function(index) {
        $(this).append('<li class="back"><a href="#">Back</a></li>');
    });

    // RESPONSIVE MENU NAVIGATION
    $('header .desk-menu .menu-container .menu .menu-item-has-children > a').on('click', function(e) {
        e.preventDefault();
        if(size <= 991){
            $(this).next('ul').addClass('open-sub');
        }
    });

    // CLICK FUNCTION BACK MENU RESPONSIVE
    $('header .desk-menu .menu-container .menu .menu-item-has-children ul .back').on('click', function(e) {
        e.preventDefault();
        $(this).parent('ul').removeClass('open-sub');
    });

    $('body .over-menu').on('click', function() {
        $('body').removeClass('open-menu');
        $('.bar').removeClass('animate');
    });

    $(document).ready(function(){
        windowSize();
    });

    $(window).scroll(function(){
        smallerMenu();
    });

    $(window).resize(function(){
        windowSize();
    });

})(jQuery);

// scroll to product page /////////////////////////////////////////////////////////////////////////////////////////////////////////////
$(document).on('click', 'a[href^="#"]', function(e) {
    // target element id
    var id = $(this).attr('href');
    // target element
    var $id = $(id);
    if ($id.length === 0) {
        return;
    }
    // prevent standard hash navigation (avoid blinking in IE)
    e.preventDefault();
    // top position relative to the document
    var pos = $id.offset().top;
    // animated top scrolling
    $('body, html').animate({scrollTop: pos}, 1000);
      
});
// END scroll to product page /////////////////////////////////////////////////////////////////////////////////////////////////////////////