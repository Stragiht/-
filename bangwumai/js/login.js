
/*注册验证*/

var register = {

	dom:{},

	init:function(){
		this.initDom();
		this.bindEvent();
	},

	initDom:function(){
		
		var dom = this.dom;

		dom.phone        = $('.checkPhone');

		dom.codeCheck    = $('.verify_code');

		dom.phoneCode    = $('.phone_code');

		dom.changBtn     = $('.register_color');

		dom.phoneCheckBtn =  $('.getphone_code');

		dom.psw           =   $('.setPsw input');

		dom.pswAgain      =   $('.confirm_psw input');

		dom.realBtn       =    $('.regestier_deal input');

		dom.signIn        =    $('.sign_in');

		dom.codeArr = ['checkMa_pic1.jpg','checkMa_pic2.jpg','checkMa_pic4.jpg','checkMa_pic5.jpg','checkMa_pic6.jpg','checkMa_pic7.jpg'];

		dom.strArr  =  ['2n2e','83nc','dyen','p68f','5ffb','xwc3','wnww'];

		 dom.check_pic = $('.check_pic img');

		 dom.phone_code  = $('.code_check .changePhone');

		 dom.grade = $('.grade em');
	},

	bindEvent:function(){
		var flag = true;
		var dom = this.dom;
		
		//手机号码验证
		//获得焦点
		dom.phone.focus(function(){
			$(this).css('borderColor','#ff8e00');
			$(this).next().css('display','block');
			$(this).next().html('您可以用该手机号登录和找回密码');
			$(this).next().css('color','#adadad');
		});

		//失去焦点 手机
		dom.phone.blur(function(){
			var str = $(this).val();
			//手机规则 第一位为1 第二位为 34578 剩下9 位数字 总共11位
			// /^   $/ 开始和结尾

			// [1][34578]\d{9} \d 代表数字
			$(this).css('borderColor','#e6e6e6');
			var reg = /^[1][34578]\d{9}$/; 
			if (reg.test(str)){
				$(this).next().html('手机号码输入正确！');
			
			}else if(str ==''){
				$(this).next().css('display','none');
			}else{
				$(this).next().html('手机格式有误，请输入正确手机号');
				$(this).next().css('color','red');
				$(this).val('');
			}

		});
		//随机图片验证

		//页面加载时随机给页面一个验证码；
		//产生图片事件
		checkCode();
		function checkCode(){
			dom.index = parseInt(Math.random()*6);//产生0-5的正整数
			console.log(dom.index);
			dom.check_pic.attr('src','../images/'+ dom.codeArr[dom.index]);
		}

		//验证码获得焦点
		dom.codeCheck.focus(function(){
				dom.phone_code.css('display','block');
				$(this).css('borderColor','#ff8e00');
		});

		// 验证码失去焦点
		dom.codeCheck.blur(function(){
			var str = $(this).val();
			$(this).css('borderColor','#e6e6e6');
			console.log(str);
			console.log(dom.strArr[dom.index]);
			if(str == dom.strArr[dom.index]){
					dom.code = true;

			}else if(str == '' ){
					$(this).siblings('.changePhone').css('display','none');
			}else{
				$(this).siblings('.changePhone').css('display','none');
			}
		});

		//图片更改点击事件
		dom.changBtn.click(function(){
			checkCode();

		});

		//获取验证码
		dom.phoneCheckBtn.click(function(){

		});

		//密码获得焦点事件
		dom.psw .focus(function(){
			$(this).change(function(){
				console.log(1);
				dom.keyword = $(this).val();
				dom.grade.parent().css('display','block');
				$(this).siblings('.changePhone').css('display','block');
				$(this).css('borderColor','#ff8e00');
							
				if(dom.keyword.length<9 && dom.keyword.length >6){
					dom.grade.eq(0).css('background','#ffa83b');

				}else if(dom.keyword.length < 12){
					dom.grade.eq(0).css('background','#ffa83b');
					dom.grade.eq(1).css('background','#ffa83b');
	
				}

			});
		});

		// 密码失去焦点事件
		dom.psw.blur(function(){
			dom.keyword = $(this).val();
			//长度 6- 15 s数字 字母 和下划线
			var reg  = /^\d{6,15}$/;
			var reg1 =/^[a-zA-Z]{6,15}$/;
			var reg2 =/^\w{6,15}$/;
			console.log(dom.keyword);
			$(this).css('borderColor','#e6e6e6');
			if(reg.test(dom.keyword)){
				$(this).siblings('.changePhone').html('密码不能全部为数字');
				$(this).siblings('.changePhone').css('color','red');
				/*if(reg2.test(dom.keyword)){
					$(this).siblings('.changePhone').html('密码输入正确！');
					$(this).siblings('.changePhone').css('color','red');
					$(this).siblings('.changePhone').css('color','red');
				}*/
			};
			
			if(reg1.test(dom.keyword)){
				$(this).siblings('.changePhone').html('密码不能全部为字母');
				$(this).siblings('.changePhone').css('color','red');
				/*if(reg2.test(dom.keyword)){
					$(this).siblings('.changePhone').html('密码输入正确！');
					$(this).siblings('.changePhone').css('color','red');
					$(this).siblings('.changePhone').css('color','red');
				}*/
			}
			
			
			
		});

		//密码确认事件

		dom.pswAgain.focus(function(){
			$(this).siblings('.changePhone').css('display','block');
				$(this).css('borderColor','#ff8e00');
		});

		dom.pswAgain.blur(function(){
			$(this).css('borderColor','#e6e6e6');
			dom.passkey = $(this).val();
			if(dom.keyword == dom.passkey){
				$(this).siblings('.changePhone').html('两次密码输入正确！');
			}else if(dom.passkey !=''){
				$(this).siblings('.changePhone').html('两次密码不一样！');
			}
		});

			
		dom.realBtn 		
			
		dom.signIn.click(function(){
			
		});

			
			

			



	}

};



































$(function(){
	register.init();
});