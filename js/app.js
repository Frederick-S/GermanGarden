(function ($, window) {
    var document = window.document;
    
    // Scroll up plugin
    $.fn.scrollUp = function () {
        return this.each(function () {
            var $this = $(this);

            $(window).scroll(function (e) {
                if ($(document).scrollTop() >= 300) {
                    $this.show();
                } else {
                    $this.hide();
                }
            });

            $this.click(function () {
                $("html, body").animate({
                    scrollTop: $("body").offset().top + "px"
                }, {
                    duration: 500,
                    easing: "swing"
                });

                return false;
            });
        });
    }
})(jQuery, window);
