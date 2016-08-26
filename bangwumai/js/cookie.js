
function setCookie(name, val, iDay) {

	var obj = new Date();

	// 得到10天后的日期
	obj.setDate( obj.getDate() + iDay );

	// "expires=" + obj
	// "expires=" + 日期对象
	// 【注意】 expires 前一定是 分号！
	// document.cookie = "user=jobs;expires=" + obj;
	document.cookie = "" + name + "=" + val + ";expires=" + obj; + ";path=/";
	//alert(document.cookie);
}


// 获取 cookie 的值
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
