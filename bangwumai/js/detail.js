
var  changeBig = {
	
	dom:{},

	init:function(){
		
		this.initDom();
		this.bindEvent();
	},

	initDom:function(){

		var dom       = this.dom;
		dom.float     = $('.float'); 
 		dom.small_pic = $('.detail_imgs');
 		dom.big_pic   = $('.float_big');
	},

	bindEvent:function(){

		var dom = this.dom;
	
	 dom.small_pic.hover(function(){

		 	dom.float.show();
		 	dom.big_pic.show();


		 },function(){

		 	dom.float.hide();
		 	dom.big_pic.hide();


		 });

	 dom.small_pic.mousemove(function(e){

	 	dom.disx = e.pageX;
	 	dom.disy = e.pageY;

	 	
	 	dom.left = $(this).offset().left;	

	 	dom.top  = $(this).offset().top;

	 	var floatW = dom.float.outerWidth();
	 	var floatH = dom.float.outerHeight();
	 	
	 	var left   = dom.disx -dom.left- floatW/2;
	 	var top    = dom.disy  -dom.top- floatH/2;

	 	if(left < 0){
	 		left = 0;
	 	}
	 	if( top < 0){
	 		top = 0;
	 	}

	 	var x  = $(this).find('img').width() - floatW;  
	 	var y  = $(this).find('img').height() - floatH;  
	 	if(left >= x){
	 		left = x;
	 	}

	 	if(top >= y){
	 		top = y;
	 	}

	 	var percentX = left / x;
	 	var percentY =  top / y;

	 	dom.left = percentX*(dom.big_pic.find('img').width() - dom.big_pic.width());
	 	dom.top  =  percentY*(dom.big_pic.find('img').height() - dom.big_pic.height());
	 	
	 	dom.float.css({
	 		'left':left,
	 		'top':top
	 	});

	 	dom.big_pic.find('img').css({
	 		'left':-dom.left,
	 		'top':-dom.top
	 	});
	 });



	}
};

var count = {

	dom:{},

	init:function(){

		this.initDom();
		this.bindEvent();
	},

	initDom:function(){

		var dom = this.dom;
		dom.btnArr = $('.shop_number span');
		dom.number = $('.shop_number i');
	},

	bindEvent:function(){
		
		var dom = this.dom;

		dom.btnArr.eq(0).click(function(){
			var str =parseInt(dom.number.html());
				
			if(dom.number.html() ==2){
				dom.number.html(str-1);
				$(this).addClass('reduce');
				
			}else{
				dom.number.html(str-1);
				$(this).removeClass('reduce');
			}
		});
		
		dom.btnArr.eq(1).click(function(){
			var str =parseInt(dom.number.html());
			dom.number.html(str+1);
			$(this).siblings().removeClass('reduce');

		});


	}
};

var detailNav = {

	 dom:{},

	 init:function(){
	 	this.initDom();
	 	this.bindEvent();
	 },

	 initDom:function(){

	 	var dom  = this.dom;
	 		dom.arrBtn = $('.detail_nav em');
	 		dom.detailContent = $('.specificDetail_title');
	 		dom.nav = $('.naver');
	 },

	 bindEvent:function(){
	 	var dom = this.dom;
	 	var index = 0;	
	 	var navTop = $('.detail_nav').offset().top;
	 		$(window).scroll(function(){
	 			var _scrollTop = $(window).scrollTop();
 				dom.nav.removeClass('nav_fixed');
 				//让nav固定在页面上；
 				
 				if(_scrollTop >= navTop){
 					dom.arrBtn.parent().addClass('detail_nav_fixed');

 				}else{
 					dom.arrBtn.parent().removeClass('detail_nav_fixed');
 				}
		
 				dom.detailContent.each(function(index){
					
					var _top = dom.detailContent.eq(index).offset().top;
					if( _scrollTop >=  _top-150){
					 dom.arrBtn.removeClass('detail_active');
				 	dom.arrBtn.eq(index).addClass('detail_active');
				 }

 				});
 			});
				
			
	 		dom.arrBtn.click(function(){
	 			dom.index = $(this).index();
	 			$(this).siblings().removeClass('detail_active');
	 			$(this).addClass('detail_active');
	 			dom.top = dom.detailContent.eq(dom.index).offset().top;
	 			
	 			$('body').animate({'scrollTop':dom.top-150},500);	 			

	 		});
	 }
}

function flyFn(){
	var offset = $(".rightBar_shoppingCar span").position();  //结束的地方的元素
	var left = $('body').width() - $('.rightBar_shoppingCar span').width();
	var n = 0;
	$(".shoppingCar").click(function(event){
		 n+=1;
		var addcar = $(this);
		// addcar.css('background','#eeeeee');
		var img = $('.float_small').attr('src');
		var flyer = $('<img class="u-flyer" src="'+img+'">');
		
		flyer.fly({
				start: {
				left: event.clientX,
				top: event.clientY
			},
			end: {
				left: left,
				top: offset.top,
				width: 0,
				height: 0
			},
			onEnd: function(){
				flyer.remove();
				// $("#msg").show().animate({width: '250px'}, 200).fadeOut(1000);
			}
		});
		
		$('.rightBar_shoppingCar i').html(n);
	});

	
}



var chooseColor = {

	dom:{},

	init:function(){
		this.initDom();

		this.bindEvent();
	},

	initDom:function(){

		var dom = this.dom;

			dom.btn = $('.byColor span');
			//console.log(dom.btn)
	},

	bindEvent:function(){

		var dom = this.dom;

		dom.btn.click(function(){
			console.log(dom.btn)
			dom.btn.removeClass('addBg_color');

			$(this).addClass('addBg_color');
			console.log($(this))
		});
	}

};

$(function(){

	changeBig.init();
	count.init();
	detailNav.init();
	flyFn();
	chooseColor.init();
});


