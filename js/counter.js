function numberWithDots(x) {
    return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".");
}


$.fn.jQuerySimpleCounter = function( options ) {
    var settings = $.extend({
        start:  0,
        end:    100,
        easing: 'swing',
        duration: 400,
        complete: ''
    }, options );
    var thisElement = $(this);
    $({count: settings.start}).animate({count: settings.end}, {
		duration: settings.duration,
		easing: settings.easing,
		step: function() {
			var mathCount = Math.ceil(this.count);
			thisElement.text(numberWithDots(mathCount));
        },
		complete: settings.complete
	});
    setTimeout(function(){
        thisElement.text(numberWithDots(2537206));
    }, 3200);
};


$('#counter1').jQuerySimpleCounter({end: 2537206,duration: 3000});
