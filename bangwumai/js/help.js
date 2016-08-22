
//导航条弹性运动
var nav = {

	dom:{},

	len:0,

	init:function(){
		this.initDom();
		this.bindEvemt();
	},

	initDom:function(){
		
		var dom = this.dom;
			dom.arr    = $('.nav_move');
			dom.moveLi = $('.moveLi');
			this.len = dom.arr.size();

	},

	bindEvemt:function(){
		var dom = this.dom;
			dom.index = dom.arr.index();
				
			dom.arr.mousemove(function(){
			
				nav.move(dom.moveLi,$(this).position().left)
			});


	},

	move:function(obj,iTarget){
		
		var dom = this.dom;
		
		clearInterval(obj.timer);
			
		var iSpeed = 0;
		
		obj.timer = setInterval(function(){
			
			var current =obj.position().left;
				
			iSpeed += (iTarget -current ) / 5;
			
			iSpeed*= 0.7;

			if(Math.abs(iSpeed) < 1 && Math.abs(iTarget -current) < 1){
				if(dom.index == 0){
					dom.moveLi.css('width',100);
				}
				$(obj).css('left',iTarget);
				clearInterval(obj.timer);
			}
			
			obj.css('left',current+iSpeed );
			

		},30);

	}

};

var topApp = {
	dom:{},
	
	init:function(){
		this.initDom();
		this.bindEvemt();
	},

	initDom:function(){
		var dom = this.dom;
			dom.phone  = $('.top_phone');
			dom.topApp = $('.topApp');
	},

	bindEvemt:function(){
		var dom = this.dom;
		var timer = '';
			dom.phone.mouseenter(function(){
				dom.topApp.show();
			});
			dom.phone.mouseleave(function(){
				timer = setTimeout(function(){
					dom.topApp.hide();
				},3000);
				
			});
			dom.topApp.mouseenter(function(){
				 clearTimeout(timer);
				 // dom.topApp.show();
				
			});
			dom.topApp.mouseleave(function(){
				console.log(1);
				
				dom.topApp.hide();
			});
	}
};


$(function(){
	nav.init();
	topApp.init();
});

