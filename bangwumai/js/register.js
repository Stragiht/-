
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

		dom.psw           =  $('.setPsw input');

		dom.pswAgain      =  $('.confirm_psw input');

		dom.realBtn       =  $('.regestier_deal input');

		dom.signIn        =  $('.sign_in');

		dom.signUp        =  $('.enter');
		dom.codeArr = ['checkMa_pic1.jpg','checkMa_pic2.jpg','checkMa_pic4.jpg','checkMa_pic5.jpg','checkMa_pic6.jpg','checkMa_pic7.jpg'];

		dom.strArr  =  ['2n2e','83nc','p68f','5ffb','xwc3','wnww','dyen'];

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
			dom.checkPhone = true;
			$(this).css('borderColor','#ff8e00');
			$(this).next().css('display','block');
			$(this).next().html('您可以用该手机号登录和找回密码');
			$(this).next().css('color','#adadad');
		});

		//失去焦点 手机
		dom.phone.blur(function(){
			dom.phoneStr = $(this).val();
			//手机规则 第一位为1 第二位为 34578 剩下9 位数字 总共11位
			// /^   $/ 开始和结尾

			// [1][34578]\d{9} \d 代表数字
			$(this).css('borderColor','#e6e6e6');
			var reg = /^[1][34578]\d{9}$/; 
			if (reg.test(dom.phoneStr)){
				
				$(this).next().css('display','none');
				$.get('../ajax/chat.php?type=query',function(data){
					// console.log(data);
				 	$.each(data,function(index,obj){
				 		 // console.log(obj.name);
				 		 // console.log(dom.phoneStr);
				 		 // console.log(parseInt(dom.phoneStr) == parseInt(obj.name));
						if(parseInt(dom.phoneStr) == parseInt(obj.name)){
							alert('手机号码已经注册！');
							dom.phone.val('');
						};

					});		
				},'json');
			
			}else if(dom.phoneStr ==''){
				dom.checkPhone = false;
				$(this).next().css('display','none');
			}else{
				$(this).next().html('手机格式有误，请输入正确手机号');
				$(this).next().css('color','red');
				$(this).val('');
				dom.checkPhone = false;
			}

		});
		//随机图片验证

		//页面加载时随机给页面一个验证码；
		//产生图片事件
		checkCode();
		function checkCode(){
			dom.index = parseInt(Math.random()*6);//产生0-5的正整数
			// console.log(dom.index);
			dom.check_pic.attr('src','../images/'+ dom.codeArr[dom.index]);
		}

		//验证码获得焦点
		dom.codeCheck.focus(function(){
				dom.check_code = true;
				$(this).val('');
				$(this).siblings('.changePhone').html('6-15位字母，建议字母、数字及下划线两种以上组合');
				dom.phone_code.css('display','block');
				// $(this).css('borderColor','#ff8e00');
				$(this).siblings('.changePhone').css('color','red');	
				$(this).siblings('.changePhone').css('color','#adadad');	
				$(this).css('borderColor','#ff8e00');
		});

		// 验证码失去焦点
		dom.codeCheck.blur(function(){
			
			var str = $(this).val();
			$(this).css('borderColor','#e6e6e6');
			console.log(str);
			console.log(dom.strArr[dom.index]);
			if(str == dom.strArr[dom.index]){
				$(this).siblings('.changePhone').css('display','none');
			}else if(str == '' ){
					$(this).siblings('.changePhone').css('display','none');
					dom.check_code = false;
			}else{
				$(this).siblings('.changePhone').css('display','none');
				dom.check_code = false;
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
		dom.psw.focus(function(){
			dom.check_psw = true; 
			$(this).siblings('.changePhone').css('display','none');
			$(this).siblings('.changePhone').css('display','block');
			
			$(this).val('');
			$(this).css('borderColor','#ff8e00');
			//事件时时绑定
			$(this).on('input', function(){
				dom.keyword = $(this).val();
				// console.log(dom.keyword.length);
				dom.grade.parent().css('display','block');
				$(this).css('borderColor','#ff8e00');
				
				if (dom.keyword.length > 15) {
					dom.grade.addClass('z-act');
				} else if (dom.keyword.length <= 15 && dom.keyword.length > 9) {
					// console.log('zhong');
					dom.grade.removeClass('z-act');
					dom.grade.eq(0).addClass('z-act');
					dom.grade.eq(1).addClass('z-act');
				} else if (dom.keyword.length <= 9 && dom.keyword.length > 6){
					// console.log('luo');
					dom.grade.removeClass('z-act');
					dom.grade.eq(0).addClass('z-act');
				} else {
					dom.grade.removeClass('z-act');
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
			// console.log(dom.keyword);
			$(this).css('borderColor','#e6e6e6');
			$(this).siblings('.changePhone').css('display','none');
			if ($(this).val() !=''){
				$(this).siblings('.changePhone').css('color','red');
					if(reg2.test(dom.keyword) && reg.test(dom.keyword)){
					$(this).siblings('.changePhone').css('display','block');
					$(this).siblings('.changePhone').html('密码不能全部为数字');
					dom.check_psw = false; 
					
				} else if (reg2.test(dom.keyword) && reg1.test(dom.keyword)){
					$(this).siblings('.changePhone').css('display','block');
					$(this).siblings('.changePhone').html('密码不能全部为字母');
					dom.check_psw = false; 
					
				} else if (reg2.test(dom.keyword)) {
					$(this).siblings('.changePhone').css('display','none');
				} else {
					$(this).siblings('.changePhone').css('display','block');
					$(this).siblings('.changePhone').html('密码输入不合法');
					$(this).siblings('.changePhone').css('color','red');
					dom.check_psw = false; 
				}
				
			}
			
			
		});

		//密码确认事件

		dom.pswAgain.focus(function(){
			 dom.check_again = true; 
			$(this).css('borderColor','#ff8e00');
			$(this).val('');
			$(this).siblings('.changePhone').css('display','block');	
			
		});

		dom.pswAgain.blur(function(){
			$(this).css('borderColor','#e6e6e6');

			$(this).siblings('.changePhone').css('display','none');
			dom.passkey = $(this).val();
			if(dom.passkey != '' ){
				if(dom.keyword == dom.passkey){
				}else if(dom.passkey !=''){
					$(this).siblings('.changePhone').css('display','block');
					$(this).siblings('.changePhone').html('两次密码不一样！');
					$(this).siblings('.changePhone').css('color','red');
						dom.check_again = false; 
				}
				
			}
		});

		function realBtncheck() {
			if( (dom.realBtn.prop('checked') != true)){
				alert('请阅读注册协议');
			}
		}
			
			
		dom.signIn.click(function(){
			realBtncheck();

			if (dom.checkPhone && dom.check_code &&  dom.check_psw && dom.check_again ){
				
				$.post('../ajax/chat.php?type=send&sender=' +dom.phoneStr+'&msg='+dom.keyword,function(data){
				 	
				 	alert('注册成功');
				 	location.href = '../html/login.html';
				},'json');
			} else{
				alert('请核对好资料是否填写完整！');
			}
		});

		dom.signUp.click(function(){
			location.href = '../html/login.html';
		});



	}

};



































$(function(){
	register.init();
});