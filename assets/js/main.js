$(document).ready(function() {

    $("body").queryLoader2();

    var windowHeight = $(window).height();
    var navBarHeight = $('.top-nav').height();
    var newSecOneHeight = (windowHeight - navBarHeight);
    var secOneContentHeight = $('.section1 .container').height();
    var footerHeight = $('#contact').height();
    var aboutHeight = $("#about").height();
    var servicesHeight = $("#services").height();

    $('.section1').css('height', newSecOneHeight);
    $('.section1').css('padding-top', ((newSecOneHeight / 2) - (secOneContentHeight / 2)) + "px")



    $(window).scroll(function() {
        var winScroller = Math.round(($(this).scrollTop() / 2) - 400);
        winScroller = winScroller.toString();
        winScrollerSection1 = "50% " + winScroller + "px";
        winScrollerSection2 = "50% -" + winScroller + "px";


        $('.section1').css('background-position', winScrollerSection1);
        $('.section3').css('background-position', winScrollerSection2);
    });

    //set footer top/bottom paddings
    var footerPadding = ((windowHeight - footerHeight)) + "px";
    var aboutPadding = (windowHeight - aboutHeight) / 2 + "px";
    var servicesPadding = (windowHeight - servicesHeight) / 2 + "px";

    $('#about').css({ 'padding-top': aboutPadding, 'padding-bottom': aboutPadding })
    $('#services').css({ 'padding-top': servicesPadding, 'padding-bottom': servicesPadding })



    //setbg color for items
    $('.portfolio .item').each(function() {
        var imagePath = $(this).find('div').attr('src');
        var axisX = $(this).find('div').attr('data-axisX');
        var axisY = $(this).find('div').attr('data-axisY');
        backgroundPos = axisX + "% " + axisY + "%";

        $(this).css({
            'background-position': backgroundPos,
            'background-image': 'url(' + imagePath + ')'
        });
    });

    $(".hover-content").on('click', function() {
        $("#body-overlay").css('display', 'block');

        $(this).siblings('.portfolio-popup').modal('show');


        $(this).siblings('.portfolio-popup').find('.portfolio-big').load(function() {
            $(this).css('display', 'block');
            $(this).siblings('.loading').css('display', 'none');

        })


    });

    $(".navbar").singlePageNav({
        speed: 1000
    });


    //code for the contact form
    $("#contact-form #send").on('click', function(event) {
        //remove previousely appended error messages
        $("#mainErrorDisplay").html("");

        //stops submiting the form as usual HTML form behaviour
        event.preventDefault();

        //assign all submitted forms into variables
        var name = $("#contact-form #name").val();
        var email = $("#contact-form #email").val();
        var phone = $("#contact-form #phone").val();
        var message = $("#contact-form #message").val();
        var erCount = 0;
        var errorMessage = "";

        if (name == "" || email == "" || message == "") {
            errorMessage = errorMessage + '<li>' + "All fields except phone, are required" + '</li>';
            erCount++;
        }

        if (erCount < 1 && !validateEmail(email)) {
            errorMessage = errorMessage + '<li>' + "Invalid Email Address" + '</li>';
            erCount++;
        }

        if (erCount > 0) {
            $("#mainErrorDisplay").html('<div class="alert alert-danger"><ul>' + errorMessage + '</ul></div>');
        } else
        //if there is no error, send the data to the back end
        {
            //the ajax submission
            $.ajax({
                type: 'POST',
                url: 'send.php',
                data: {
                    name: name,
                    email: email,
                    phone: phone,
                    message: message,
                    mod: 'ajax'
                },
                success: function(response) {
                    //if email sent is success, show the success message
                    $("#mainErrorDisplay").html('<div class="alert alert-success">Email Successfully Sent!</div>');

                    //clear the fields
                    $("#contact-form #name").val("");
                    $("#contact-form #email").val("");
                    $("#contact-form #phone").val("");
                    $("#contact-form #message").val("");
                }
            });
        }
    });

    // setInterval(function () {
    //        console.log('it works' + new Date());
    //    },3000);
});

function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}



$(function() {

    "use strict";

    //===== Prealoder

    $(window).on('load', function(event) {
        $('#preloader').delay(500).fadeOut(500);
    });


    //===== Mobile Menu 

    $(".navbar-toggler").on('click', function() {
        $(this).toggleClass('active');
    });

    $(".navbar-nav a").on('click', function() {
        $(".navbar-toggler").removeClass('active');
    });


    //===== close navbar-collapse when a  clicked

    $(".navbar-nav a").on('click', function() {
        $(".navbar-collapse").removeClass("show");
    });


    //===== Sticky

    $(window).on('scroll', function(event) {
        var scroll = $(window).scrollTop();
        if (scroll < 10) {
            $(".navgition").removeClass("sticky");
        } else {
            $(".navgition").addClass("sticky");
        }
    });


    //===== Section Menu Active

    var scrollLink = $('.page-scroll');
    // Active link switching
    $(window).scroll(function() {
        var scrollbarLocation = $(this).scrollTop();

        scrollLink.each(function() {

            var sectionOffset = $(this.hash).offset().top - 90;

            if (sectionOffset <= scrollbarLocation) {
                $(this).parent().addClass('active');
                $(this).parent().siblings().removeClass('active');
            }
        });
    });


    //====== Magnific Popup

    $('.video-popup').magnificPopup({
        type: 'iframe'
            // other options
    });


    //===== Back to top

    // Show or hide the sticky footer button
    $(window).on('scroll', function(event) {
        if ($(this).scrollTop() > 600) {
            $('.back-to-top').fadeIn(200)
        } else {
            $('.back-to-top').fadeOut(200)
        }
    });


    //Animate the scroll to yop
    $('.back-to-top').on('click', function(event) {
        event.preventDefault();

        $('html, body').animate({
            scrollTop: 0,
        }, 1500);
    });


    //===== 
















});