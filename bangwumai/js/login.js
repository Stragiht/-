var login = {
	dom:{},
	init:function(){
		this.initDom();
		this.bindeEvent();
	},

	initDom:function(){
			var dom    = this.dom;
			dom.login  = $('.login_text');
			dom.psw    =  $('.login_psw');
			dom.signUp = $('.sure_login');
			dom.code   = $('.check_code');
			dom.check_pic = $('.check_pic img');
			dom.changeBtn  = $('.changeMa em');
			dom.forget 	  = $('.forget_psw');
			dom.codeArr = ['checkMa_pic1.jpg','checkMa_pic2.jpg','checkMa_pic4.jpg','checkMa_pic5.jpg','checkMa_pic6.jpg','checkMa_pic7.jpg'];

			dom.strArr  =  ['2n2e','83nc','p68f','5ffb','xwc3','wnww','dyen'];
			
	},

	bindeEvent:function(){
		var dom = this.dom;
		
		
		dom.username = getCookie("users");
		dom.login.val(dom.username);
		dom.flag = true;
		dom.login.focus(function(){
			dom.flag = true;
		});
		
		dom.login.blur(function(){
		
			// var saveWord = getCookie("passWord");
			if(dom.username ==''){
				dom.username = dom.login.val();
				if(dom.login.val() != ''){
					$.get('../ajax/chat.php?type=query',function(data){
					 	console.log(data);
						$.each(data,function(index,obj){
							if(dom.username != obj.name){
								alert('用户名不存在！,请重新输入用户名');
								dom.flag = false;
								dom.login.val('');
							};
						});		
					},'json');
					
				}
			}
		
		});

		dom.password = getCookie("psw");
		dom.psw.val(dom.password);
		dom.passkey = true;
		dom.psw.focus(function(){
			dom.passkey = true;
		});
		dom.psw.blur(function(){
			if(dom.password ==''){
				dom.password = dom.psw.val();
				if(dom.psw.val() != ''){
					$.get('../ajax/chat.php?type=query&',function(data){
					 	console.log(data);
						$.each(data,function(index,obj){
							if(dom.password != obj.password){
								alert('密码输入不正确！,请重新输入密码');
								dom.passkey = false;
								dom.psw.val('');
							};
						});		
					},'json');
					
				}
				
			}
		});
		
		//随机产生图片
		checkCode();
		function checkCode(){
			dom.index = parseInt(Math.random()*6);//产生0-5的正整数
			// console.log(dom.index);
			dom.check_pic.attr('src','../images/'+ dom.codeArr[dom.index]);
			// console.log(dom.codeArr[dom.index]);

		}
		
		dom.code.blur(function(){
			if(dom.code.val() !=''){
				dom.codeCentent = dom.code.val();
				if(dom.codeCentent != dom.strArr[dom.index]){
					alert('验证码输入不正确，请重新输入');
					dom.code.val('');
					checkCode();
				}
				
			}

		});

		//换图片按钮
		dom.changeBtn.click(function(){
			checkCode();
		});


		//忘记密码
		dom.forget.mouseenter(function(){
			$(this).find('.other_account').css('display','block');
			$(this).css('color','#fd7a4d');
		});
		dom.forget.mouseleave(function(){
			$(this).find('.other_account').css('display','none');
			$(this).css('color','#999');
		});

		$('.phone_link').mouseenter(function(){
			$(this).find('em').addClass('phoneBg');
			$(this).css('color','#fd7a4d');
		});
		
		$('.phone_link').mouseleave(function(){
			$(this).css('color','#999');
			$(this).find('em').removeClass('phoneBg');
		});

		$('.mail_link').mouseenter(function(){
			console.log(1);
			$(this).find('i').addClass('mailBg');
			$(this).css('color','#fd7a4d');

		});

		$('.mail_link').mouseleave(function(){
			$(this).find('i').removeClass('mailBg');
			$(this).css('color','#999');
		});
		
		dom.signUp.click(function(){
			console.log(1);
			var users = getCookie('users');
			if(dom.flag && dom.passkey ){
				location = '../index.html';
			}
			if (!users) {
				var res = window.confirm('你需要记住密码嘛');
				if(res){	
					var	userName = dom.username;
					var password = dom.password;
					setCookie("users",userName,7);
					setCookie("psw",passWord,7);

				}
			}
		});

		$('.login_register').click(function(){
			location ='../html/register.html'; 
		});

	}
 };


$(function(){
	login.init();
});