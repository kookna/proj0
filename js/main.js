$(document).ready(function() {

	var agent = navigator.userAgent.toLowerCase();
	if ( (navigator.appName == 'Netscape' && agent.indexOf('trident') != -1) || (agent.indexOf("msie") != -1)) {
		// ie일 경우
		/*===== main-visual START =====*/
		function video_resize(){
			var target = $(".main__visual-video");
			var window_w = $(window).width();
			var window_h = $(window).height();
			var video_ratio = 16 / 9;
			var window_ratio = window_w / window_h;
			var sectionV_h = $(".main__visual").height();

			if(window_ratio < video_ratio){
				target.height(window_h);
				target.width(window_h * video_ratio);
			}else{
				target.width(window_w);
				target.height(window_w / video_ratio);
			}
		}video_resize();

		$(window).resize(function(){
			video_resize();
		})
	
	}else{
		// ie가 아닐 경우
	}


	// 메인 비주얼
	$('.main__visual-wrap').on('init', function(e, slick) {
		
		var $firstAnimatingElements = $('div.main__visual-item:first-child').find('[data-animation]');
		doAnimations($firstAnimatingElements);    
		$('.slick-active > .bg .main__visual-img').addClass('is-scale');
		
	});
	$('.main__visual-wrap').on('beforeChange', function(e, slick, currentSlide, nextSlide) {

		var $animatingElements = $('div.main__visual-item[data-slick-index="' + nextSlide + '"]').find('[data-animation]');
		doAnimations($animatingElements);
		$('.slick-slide .main__visual-img').removeClass('is-scale');
	});
	$('.main__visual-wrap').on('afterChange', function(e, slick, currentSlide, nextSlide){
		$('.slick-active > .bg .main__visual-img').addClass('is-scale');
	});

	$('.main__visual-wrap').slick({
		dots:true,
		//dotsClass:'main__visual-dots',
		appendDots: $(".main__visual-dots"),
		//lazyLoad: 'ondemand', //or progressive
		arrows: true,
		prevArrow: $('.main__visual-arrow.prev'),
		nextArrow: $('.main__visual-arrow.next'),
		autoplay: true,
		autoplaySpeed:10000,
		infinite: true,
		speed: 1500,
		fade: true,
		pauseOnFocus: false,
		pauseOnHover: false,
		customPaging: function (slider, i) {
			var title = $(slider.$slides[i]).data('title');
			return '<button><span>' + title + '</span></button>';
		}
		
	});

	function doAnimations(elements) {
		var animationEndEvents = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
		elements.each(function() {
			var $this = $(this);
			var $animationDelay = $this.data('delay');
			var $animationType = 'animated ' + $this.data('animation');
			var $animationDuration = $this.data('dura');
			$this.css({
				'animation-delay': $animationDelay,
				'-webkit-animation-delay': $animationDelay,
				'animation-duration' : $animationDuration
			});
			$this.addClass($animationType).one(animationEndEvents, function() {
				$this.removeClass($animationType);
			});
		});
	}

	var visualBtn = $(".main__visual-control .play");
	$(visualBtn).on("click",function() {
		if ($(this).hasClass('paused')) {
			$(this).removeClass('paused').text('일시정지');
			$('.main__visual-wrap').slick('slickPlay');
		} else {
			$(this).addClass('paused').text('재생');
			$('.main__visual-wrap').slick('slickPause');
		}
	});

});

//비주얼 Control 위치
$(window).on('load resize',function(){
	var visualH = $(".main__visual-item").height();
	var visualCH = $(".main__visual-copy").height();
	$(".main__visual-control").css('top', - (visualH - visualCH) / 2 + 10);
});

$(document).ready(function() {
	/* 스크롤이동 */
	$(".scroll-btn").click(function(event){
		$('html,body').animate({scrollTop:$(this.hash).offset().top}, 500);
		event.preventDefault();
	});


});


$(window).on("load resize", function () {
	//높이 맞춤
	$('.main__news .cols-box').matchHeight({ 
		byRow: false, 
		property: 'height',
	});

	$('.main__info-list .item .num').matchHeight({ 
		byRow: true, 
		property: 'height',
	});

	$('.main__with-inner .cols-2').matchHeight({ 
		byRow: true, 
		property: 'height',
	});

	/*
	$('.main__business-item .cols .cols-bottom').matchHeight({ 
		byRow: true, 
		property: 'height',
	});
	 */

	
});


//제품 높이 조절
function tabCH(){
	var tabH = $('.main__tab.is-active').height();
	var tabCon = $('.main__tab-contents.is-active').height();
	$('.main__products-box').css({
		'min-height'    :   tabH + tabCon + 0 + 'px'
	});
	$('.main__tab-contents.is-active').css({
		'top'    :   tabH + 'px'
	});
};
$(document).ready(function() {

	$('.main__products-list').each(function() {

		$(this).slick( {
			infinite: true,
			//arrows: false,
			autoplay: true,
			autoplaySpeed:3000,
			variableWidth: false,
			dots: false,
			slidesToShow: 3,
			slidesToScroll: 1,
			prevArrow: $(this).parent().next().children().children('.prev'),
			nextArrow: $(this).parent().next().children().children('.next'),
			responsive: [
				{
					breakpoint: 768,
					settings: {
						slidesToShow: 2,
						slidesToScroll: 1,
						}
				},
				{
					breakpoint: 521,
					settings: {
						slidesToShow: 1,
						slidesToScroll: 1,
						}
				}

			]
			//appendDots:$(this).next().children('.slider-dots')
		});
	});
	tabCH();
	
	// 탭
	$('.main__tab').on('click', function(e){
		e.preventDefault();
		$(this).siblings().removeClass('is-active');
		$(this).next('dd').addClass('is-active');
		$(this).addClass('is-active');
		$('.main__products-list').slick('setPosition');
		tabCH();
	});
	

});
$(window).on("load resize", function () {
	$('.main__products-list').slick('setPosition');
	tabCH();
});



$(document).ready(function(){
	$('.main__issue-list .list').slick({
		dots:false,
		//dotsClass:'main__visual-dots',
		//appendDots: $(".main__visual-dots"),
		//lazyLoad: 'ondemand', //or progressive
		arrows: true,
		autoplay: true,
		autoplaySpeed:3000,
		infinite: true,
		speed: 1000,
		slidesToShow: 3,
		slidesToScroll: 1,
		centerMode: true,
		centerPadding:'0px',
		//focusOnSelect: true,
		pauseOnFocus: true,
		pauseOnHover: true,
		//variableWidth: true,
		prevArrow: $('.main__issue .slider-btn.prev'),
		nextArrow: $('.main__issue .slider-btn.next'),

		responsive: [
			{breakpoint: 769,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					centerPadding:'140px',
				}
			},
			{breakpoint: 641,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					centerPadding:'100px'
				}
			},
			{breakpoint: 481,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					centerPadding:'50px'
				}
			}
		]

		
	});
});




$(window).on("load resize", function () {
	if ($('body').attr('data-phone') == 'false') {
		$('.main__business-item .cols').removeClass('js-active').removeClass('is-hidden');
		$('.main__business-item .cols-inner').on("click" ,function(e){
			$(this).parent().addClass('js-active').removeClass('is-hidden').siblings().removeClass('js-active').addClass('is-hidden');
		});
	
		$('.main__business-item .cols .close').on("click" ,function(e){
			e.stopPropagation();
			$('.main__business-item .cols').removeClass('is-hidden').removeClass('js-active');
		});
	} else {
		$('.main__business-item .cols').addClass('js-active').removeClass('is-hidden');
	}




	
});