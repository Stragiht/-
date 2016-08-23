

//顶部app的运动效果

// mouseleave，mouseenter:事件不会向下传递 


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
			// 鼠标移上去 让app显示
			dom.phone.mouseenter(function(){
				dom.topApp.show();
			});
			//鼠标移开 三秒后消失 也可以不用定时器
			dom.phone.mouseleave(function(){
				timer = setTimeout(function(){
					dom.topApp.hide();
				},3000);
				
			});
			//鼠标移动到app，让其显示 并且不消失
			dom.topApp.mouseenter(function(){
				 clearTimeout(timer);
				 // dom.topApp.show();
				
			});
			//鼠标离开 app消失
			dom.topApp.mouseleave(function(){
				dom.topApp.hide();
			});
	}
};




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
			this.len   = dom.arr.size();
			dom.subNav = $('.beauty')

	},

	bindEvemt:function(){
		var dom = this.dom;
			dom.index = 0 ;
			dom.arr.mouseenter(function(){
				nav.move(dom.moveLi,$(this).position().left);
				dom.index =$(this).index();	
				
				if(dom.index > 0 && dom.index < 6){
					dom.subNav.eq(dom.index-1).show();
					dom.subNav.eq(dom.index-1).siblings().hide();

				}else{
					dom.subNav.hide();
				}
				dom.moveLi.mouseenter(function(){
					dom.subNav.eq(dom.index-1).show();			
				});
				
			});

			
			dom.arr.mouseleave(function(){
				dom.subNav.hide();
				
			});

			dom.subNav.mouseenter(function(){
				dom.subNav.eq(dom.index-1).show();
				dom.subNav.eq(dom.index-1).siblings().hide();

			});

			dom.subNav.mouseleave(function(){
				dom.subNav.hide();
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


//轮播图
var lunbo = {
	
	dom:{},

	len:0,

	index:0,

	timer:null,

	init:function(){
		this.initDom();
		this.bindEvent();
	
	},

	initDom:function(){
		var dom       = this.dom;
			dom.btns  = $('.index_btns a')
			dom.list  = $('.index_list');
			dom.list.children().clone(true).appendTo(dom.list);
			dom.li    = $('.index_list li');
			this.len  = dom.li.size();
			dom.liWidth = dom.li.eq(0).width();
			dom.width = this.len * dom.liWidth;
			dom.list.width(dom.width);

	},
	bindEvent:function(){
		var dom = this.dom;
		var self = this;
		this.timer = setInterval(function(){
		 	move();
			
		},3000);
		
		//运动函数
		function move(){
			self.index++;
			// console.log(self.index);
			
			dom.btns.eq(self.index).addClass('index_active');
			dom.btns.eq(self.index).siblings().removeClass('index_active');
			var left = -(self.index * dom.liWidth);
			dom.list.animate({'left':left},1000,function(){
				next();
			});
			
		
		}
		//判断当前的下标索引值	
		function next(){
			
			// console.log('next');
			if(self.index >= self.len / 2){
				dom.list.css('left',0);
				// console.log(self.index);
				self.index = 0;
				dom.btns.eq(self.index).addClass('index_active');
				dom.btns.eq(self.index).siblings().removeClass('index_active');
			}
					
		}

		//按钮点击事件
		dom.btns.click(function(){
			//点击清除定时器
			clearInterval(self.timer);
			//获得当前点击的下标
			self.index = $(this).index() -1;
			move();
			
		});
		
		//鼠标移入清除当前定时器
		dom.list.mouseenter(function(){
			clearInterval(self.timer);
		});
		//鼠标移开开启定时器，同时判断一下是否最后一张
		dom.list.mouseleave(function(){
			self.timer = setInterval(function(){
			 	next();
			  	move();
			
			},3000);
			
		});
	
	}
};



$(function(){
	topApp.init();
	nav.init();
	lunbo.init();
	
});

