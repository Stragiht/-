
//获取剩余时间

var remainTime = {
	
	dom:{},

	init:function(){
		
		this.initDom();
		this.bindEvent();
	},

	initDom:function(){
		var dom = this.dom ;
	 	dom.shopTime = $('.remainTime');
		dom.passTime = new Date('2016/9/30 10:00');
		dom.endTime  = new Date('2016/9/30 10:00');
		dom.spanArr  = $('.showTime span')
	},	

	bindEvent:function(){
		var dom = this.dom;
	
		setInterval(function(){
			dom.time = new Date();
			var str  = stopTime(dom.time,dom.passTime);
			dom.str = str.days+ '天' + str.hours+'小时' + str.minutes +'分'+ str.seconds+ '妙';
			var str1 = stopTime(dom.time,dom.endTime);
			//剩余时间
			dom.shopTime.html('剩余时间 : ' + dom.str);

			//限购时间

			dom.spanArr.eq(0).html(str.hours);
			dom.spanArr.eq(1).html(str.minutes);
			dom.spanArr.eq(2).html(str.seconds);
		},1000);
		
		
		function stopTime(d1,d2){
			var seconds = (d2.getTime() - d1.getTime()) / 1000;
			var days    = parseInt(seconds / 3600 / 24);
			var hours   = parseInt(seconds / 60 % 24);
			var minutes = parseInt(seconds / 60) % 60;
			if(minutes < 10){
				minutes = '0'+minutes;
			}
			seconds =parseInt(seconds % 60) ;
			if(seconds < 10){
				seconds = '0'+seconds;
			}
			
			return {'days':days,'hours':hours,'minutes':minutes,'seconds':seconds};
		};
		
	}

}
$(function(){
	remainTime.init();
});