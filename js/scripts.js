// Preloader

  $(window).load(function(){
        $('.loader').fadeOut();
        $('#preloader').delay(350).fadeOut('slow');
        $('body').delay(350);
    });

$(function() {
// console.log('disabling');
    var $body = $(".page-container");
    $body.bind('scroll', function() {
        // "Disable" the horizontal scroll.
        if ($body.scrollLeft() !== 0) {
            $body.scrollLeft(0);
        }
    });

});
// Global document ready function

jQuery(document).ready(function($) {
     // "use strict";
    //check if background-images have been loaded and show single pages
    $('.single-page').bgLoaded({
        afterLoaded: function() {
            showCaption($('.page-container .single-page').eq(0));
        }
    });
    //dynamically add phone number and email
    $('#phoneNumber').text('714 717 4608');
    $('#email').text('kchau.jobs@gmail.com');

    //open page
    $('.single-page').on('click', function() {
        var selectedProject = $(this),
            toggle = !selectedProject.hasClass('is-full-width'),
            page = selectedProject.attr('id');
            $("a[data-page="+page+"]").addClass('active-btn');
        if (toggle) toggleProject($(this), $('.page-container'), toggle);
    });

    //toggles hidden class for dropdown
    function hideDropDown() {
      $(".menu-btn.dropbtn > i").toggleClass("hidden");
      $(".menu-btn.drop-content").toggleClass("hide-content");
    }

    //open and close dropdown
    $(".menu-btn.dropbtn").on('click', hideDropDown);

    //close page and open page via button
    $('.page-container .drop-content').on('click', function() {
        var selected = $(this).attr("data-page");
        //if active btn do nothing
        if ($(this).hasClass("active-btn")) { return false };
        //else remove active-btn class and add to button clicked if not home btn
        hideDropDown();
        toggleProject($('.is-full-width'), $('.page-container'), false);
        $(".active-btn").removeClass("active-btn");
        if (selected !== "home") {
          $(this).addClass('active-btn');
          selected = '#' + selected;
          var toggle = !($(selected).hasClass('is-full-width'));
          if (toggle) toggleProject($(selected), $('.page-container'), toggle);
          $(".page-container").scrollTop(0);
        }
    });

    //scroll to page info
    $('.page-container .page-scroll').on('click', function() {
        $('.page-container').stop().animate({
            'scrollTop': $(window).height()
        }, 500);
    });

    //update title and .page-scroll opacity while scrolling
    $('.page-container').on('scroll', function() {
        window.requestAnimationFrame(changeOpacity);
    });

    function toggleProject(project, container, bool) {
        if (bool) {
            //expand page
            container.addClass('project-is-open');
            project.addClass('is-full-width').siblings('.single-page').removeClass('is-loaded');
        } else {
            //check media query
            var mq = window.getComputedStyle(document.querySelector('.page-container'), '::before').getPropertyValue('content'),
                delay = (mq == 'mobile') ? 100 : 0;

            container.removeClass('project-is-open');
            //fade out page
            project.animate({
                opacity: 0
            }, 500, function() {
                project.removeClass('is-loaded');
                $('.page-container').find('.page-scroll').attr('style', '');
                setTimeout(function() {
                    project.attr('style', '').removeClass('is-full-width').find('.page-title').attr('style', '');
                }, delay);
                setTimeout(function() {
                    showCaption($('.page-container .single-page').eq(0));
                }, 300);
            });
        }
    }

    function changeOpacity() {
        var newOpacity = 1 - ($('.page-container').scrollTop()) / 300;
        $('.page-container .page-scroll').css('opacity', newOpacity);
        $('.is-full-width .page-title').css('opacity', newOpacity);
    }

    function showCaption(project) {
        if (project.length > 0) {
            setTimeout(function() {
                project.addClass('is-loaded');
                showCaption(project.next());
            }, 150);
        }
    }

    // Magnific Popup

    $('.open-portfolio').magnificPopup({
        type: 'inline',
        midClick: true,
        zoom: {
            enabled: true,
            duration: 300, // duration of the effect, in milliseconds
            easing: 'ease-in-out' // CSS transition easing function
        }
    });


    // Mixitup Filter

    $(function notStrict() {
        // Instantiate MixItUp:
        $('#portfolio').mixItUp();
    });

    // Google Map


    // main directions
    map = new GMaps({
        disableDefaultUI: true,
        draggable: false,
        position: "TOP_CENTER",
        el: '#map',
        lat: 33.652496,
        lng: -117.932187,
        zoom: 11,
        // zoomControl: true,
        zoomControlOpt: {
            style: 'SMALL',
            position: 'TOP_LEFT'
        },
        panControl: false,
        scrollwheel: false,
        styles: [{"featureType":"administrative","elementType":"all","stylers":[{"saturation":"-100"}]},{"featureType":"administrative.province","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"landscape","elementType":"all","stylers":[{"saturation":-100},{"lightness":65},{"visibility":"on"}]},{"featureType":"poi","elementType":"all","stylers":[{"saturation":-100},{"lightness":"50"},{"visibility":"simplified"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":"-100"}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"all","stylers":[{"lightness":"30"}]},{"featureType":"road.local","elementType":"all","stylers":[{"lightness":"40"}]},{"featureType":"transit","elementType":"all","stylers":[{"saturation":-100},{"visibility":"simplified"}]},{"featureType":"water","elementType":"geometry","stylers":[{"hue":"#ffff00"},{"lightness":-25},{"saturation":-97}]},{"featureType":"water","elementType":"labels","stylers":[{"lightness":-25},{"saturation":-100}]}]
    });
    // add address markers
    map.addMarker({
        lat: 33.652496,
        lng: -117.932187,
        title: 'Me',
        infoWindow: {
            content: '<p> Costa Mesa , CA</p>'
        }
    });


    // Contact Form

    $('form#contactForm button.submit').click(function() {

        $('#image-loader').fadeIn();

        var contactName = $('#contactForm #contactName').val();
        var contactEmail = $('#contactForm #contactEmail').val();
        var contactMessage = $('#contactForm #contactMessage').val();

        var data = 'contactName=' + contactName + '&contactEmail=' + contactEmail + '&contactMessage=' + contactMessage;

        $.ajax({

            type: "POST",
            url: "inc/mail_handler.php",
            data: data,
            success: function(msg) {

                // Message was sent
                if (msg == 'OK') {
                    $('#image-loader').fadeOut();
                    $('#message-warning').hide();
                    $('#contactForm').fadeOut();
                    $('#message-success').fadeIn();
                }
                // There was an error
                else {
                    $('#image-loader').fadeOut();
                    $('#message-warning').html(msg);
                    $('#message-warning').fadeIn();
                }

            }

        });
        return false;
    });

    // Contact form end


});

/*
 * BG Loaded
 * Copyright (c) 2014 Jonathan Catmull
 * Licensed under the MIT license.
 */
(function($) {
    $.fn.bgLoaded = function(custom) {
        var self = this;

        // Default plugin settings
        var defaults = {
            afterLoaded: function() {
                this.addClass('bg-loaded');
            }
        };

        // Merge default and user settings
        var settings = $.extend({}, defaults, custom);

        // Loop through element
        self.each(function() {
            var $this = $(this),
                bgImgs = window.getComputedStyle($this.get(0), '::before').getPropertyValue('content').replace(/'/g, "").replace(/"/g, "").split(', ');
            $this.data('loaded-count', 0);
            $.each(bgImgs, function(key, value) {
                var img = value.replace(/^url\(["']?/, '').replace(/["']?\)$/, '');
                $('<img/>').attr('src', img).load(function() {
                    $(this).remove(); // prevent memory leaks
                    $this.data('loaded-count', $this.data('loaded-count') + 1);
                    if ($this.data('loaded-count') >= bgImgs.length) {
                        settings.afterLoaded.call($this);
                    }
                });
            });

        });
    };
})(jQuery);
