

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
			dom.nav    = $('.naver');
			dom.arr    = $('.nav_move');
			dom.moveLi = $('.moveLi');
			this.len   = dom.arr.size();
			dom.subNav = $('.beauty');
			domTop     =dom.nav.offset().top;

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

			//导航移入事件
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
			
			//导航条滚动事件
			$(window).scroll(function(){
				dom_scrollTop = $(this).scrollTop();
				if(dom_scrollTop > domTop ){
				
					dom.nav.addClass('nav_fixed');
				}else{
					
					dom.nav.removeClass('nav_fixed');

				}
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


/* 人气推荐 女装 ，美妆 切换*/

var popular  = {
	
	dom:{},

	init:function(){
		this.initDom();
		this.bindEvent();
	},

	initDom:function(){
		var dom = this.dom;
			dom.btnArr  = $('.mainTitle span');
			dom.content = $('.mainCon');
	},
	
	bindEvent:function(){
		var dom = this.dom;
			
			dom.btnArr.mouseenter(function(){
				dom.index = $(this).index();
				console.log(dom.index);
				dom.btnArr.css({
					'background': 'none',
					'color': '#666'
				})
				$(this).css({
					'background':'#fe689a',
					'color':'#fff'
				});
				dom.content.css('display','none');
				// console.log(dom.index);
				dom.content.eq(dom.index-1).css('display','block');
				
			});


	}
};

//人气品牌点击图片运动

var brand = {

	dom:{},

	init:function(){
		this.initDom();
		this.bindEvent();
	},

	initDom:function(){
		var dom     = this.dom;
		dom.list    = $('.brand_list');
		dom.nextBtn = $('.next_pic');
		dom.preBtn  = $('.pre_pic');
		dom.brand   = $('.brandIntroduce') 
	},

	bindEvent:function(){
		var dom = this.dom;
		var flag = true;
		dom.preBtn.click(function(){

			if(flag == true ){
				dom.brand.css('display','none')
				dom.brand.eq(0).css('display','block');
				dom.list.animate({'left':0},800,function(){
					
					flag = false;
					dom.nextBtn.css('background','none')
				});
			}
		});
		dom.nextBtn.click(function(){
			if(flag == false ){
				dom.brand.css('display','none');
				dom.brand.eq(1).css('display','block');
				dom.list.animate({'left':'-190px'},800,function(){
					dom.preBtn.css('background','none')
					flag = true;
				});
			}
		});
	}
};


/* 新品上架 女装 ，美妆 切换*/

var newPro  = {
	
	dom:{},

	init:function(){
		this.initDom();
		this.bindEvent();
	},

	initDom:function(){
		var dom = this.dom;
			dom.btnArr  = $('.newTitle span');
			dom.content = $('.newPro');
	},
	
	bindEvent:function(){
		var dom = this.dom;
			
			dom.btnArr.mouseenter(function(){
				dom.index = $(this).index();
				console.log(dom.index);
				dom.btnArr.css({
					'background': 'none',
					'color': '#666'
				})
				$(this).css({
					'background':'#36dbd9',
					'color':'#fff'
				});
				dom.content.css('display','none');
				// console.log(dom.index);
				dom.content.eq(dom.index-1).css('display','block');
				
			});


	}
};

var bottom = {
	dom : {},
	init:function(){
		this.initDom();
		this.bindEvent();

	},

	initDom:function(){
		
		var dom        = this.dom;
		dom.btn        = $('.bottom_btn');
		dom.bottom_bar = $('.bottom_bar');
	},
	bindEvent:function(){
		var dom = this.dom;
		dom.btn.click(function(){
			dom.bottom_bar.css('display','none');


		});
	}

};
/*---------------------右边栏运动事件-------------------------------*/

/*var rightBar =  {
	dom:{},

	init:function(){
		this.initDom();
		this.bindEvent();
	},

	initDom:function(){
		var dom    = this.dom;
		dom.ask    = $('.rightBar_ask a');
		dom.askBar = $('#rightAsk');
	},

	bindEvent:function(){
		var dom = this.dom;
		鼠标移上去
		dom.ask.mouseover(function(){
			console.log('sdf');
			$(this).find('.rightAsk').css('display','block');
			$(this).find('.rightAsk').stop().animate({'left':'-116'},800);
		});
		
		dom.ask.mouseout(function(){
			console.log(1);
			$(this).find('.rightAsk').stop().animate({'left':'-200px'},800,function(){
				console.log(2);
				// $('.rightBar_ask').find('.rightAsk').css('display','none');
			});
			
		});
		
		dom.askBar.mouseleave(function(){
			dom.askBar.animate({'left':'-200'},800,function(){
			dom.askBar.css('display','none');
				
			});
		});

	}
}
*/

/*  ---------------------------回到顶部------------------------------*/

var goTop = {
	dom:{},

	init:function(){
		this.initDom();
		this.bindEvent();
	},

	initDom:function(){
		var dom = this.dom;
		dom.backBtn = $('.goTop');
			
	},
	bindEvent:function(){
		var dom = this.dom;
		
		dom.backBtn.click(function(){
			dom.scrollTop = $(window).scrollTop(); 
			dom.timer = setInterval(function(){
				if(dom.scrollTop < 10){
					$(window).scrollTop(0);
					clearInterval(dom.timer);
				}
				var iSpeed = 1.1;
				
				dom.scrollTop  = dom.scrollTop / iSpeed;
				
				$(window).scrollTop(dom.scrollTop);
			},200);
		});
	}

}



var login = {
	dom:{},

	init:function(){
		
		this.initDom();
		this.bindEvent();
	},

	initDom:function(){
		function getCookie(searchName) {

			//user=jobs; psw=123; age=18; 

			// 获取当前的cookie值
			var str = document.cookie;

			// 先分割字符串
			var arr = str.split("; ");

			for (var i = 0; i < arr.length; i++) {
				var arr2 = arr[i].split("=");

				var name = arr2[0];
				var val = arr2[1];

				if (name == searchName) {
					return val;
					//alert(val);
				}
			}

			// 如果找不到名字，那么返回空字符串
			return "";
		}




		var dom = this.dom;
		// console.log(2)
		dom.userName = getCookie("users");
		dom.login = $('.top_login');
		 // console.log(dom.userName);
		
	},

	bindEvent:function(){
		var dom = this.dom;

		if( dom.userName !=''){
			var res = window.confirm('亲，确定登录嘛？')
			if(res){
				dom.login.html(dom.userName);
			}
		} 
	}

};

$(function(){
	topApp.init();
	nav.init();
	lunbo.init();
	popular.init();
	brand.init();
	newPro.init();
	bottom.init();
	goTop.init();
	login.init();
});

