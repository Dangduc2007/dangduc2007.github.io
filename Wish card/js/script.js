  function htmlScrol(){
        $('.side-right').addClass('fade-left');
        $('.side-left').addClass('fade-right');
        $('.fade-left').attr("data-av-animation", "fadeInLeft");
        $('.fade-right').attr('data-av-animation', 'fadeInRight');


        var options = {
            animateThreshold: 100,
            scrollPollInterval: 200,
        }
        $('.fade-left').AniView(options);
        var fadeRight = {
            animateThreshold: 100,
            scrollPollInterval: 200,
        }
        $('.fade-right').AniView(fadeRight);
      
    }


    function smoothLyScroll() {

        $('.nav a[href^="#"').click(function(){

            if (this.has !==""){
                event.preventDefault();
                var hash = this.hash;
                $('html, body').animate({
                    scrollTop: $(hash).offset().top
                }, 800, function(){
                    window.location.hash = hash;
                })
            }
        })
    }

$(function () {
    htmlScrol();
    smoothLyScroll();
})