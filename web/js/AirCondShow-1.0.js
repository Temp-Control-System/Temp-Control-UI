
//1. 状态获取
var urlTest = "https://mockapi.eolinker.com/1hywENt9b4bf5cdb7381fe38284a05d44d0631cf253c095"
var roomId = 8 //var roomId = $('#roomId').text();
var query = "/query?"
$(document).ready(function () {
	$.ajax({
		type: "GET",
		url: urlTest+query,
		data: {"roomId" : roomId},
		dataType: "json",
		success: function (response) {
			$("#roomId").text(response.roomId);
			$("#status").text(response.status);
			$("#mode").text(response.mode);
			$("#wind").text(response.wind);
			$("#targetTemperature").text(response.targetTemperature);
			$("#temperature").text(response.temperature);
			$("#totalCost").text(response.totalCost);
		}
	});	
});

//2. 点击设置跳转界面
//在html中写了

//3. 发送关机请求
var cmdOff = "/takeoff?"
function shutDown(){
	$.ajax({
		type: "GET",
		url: urlTest+cmdOff, 
		data: {"roomId": roomId},
		dataType: "json",
		success: function (response) {
			alert("空调已关闭"); //想一下之后有没有更好的提示方法
		}
	});
}

//4. 下载账单  //这个下载的话是直接打印一张图片呢 还是弄成文件呢？
var cmdBill = "/detail_bill?"
function downBill(){
	$.ajax({
		type: "GET",
		url: urlTest+cmdBill,
		data: {"roomId": roomId},
		dataType: "json",
		success: function (response) {
			//现在直接弹出来的是JSON格式的数据
			var bill = JSON.stringify(response);
			alert(bill);
		}
	});
}
//5. 下载详单

function downDetail(){
	$.ajax({
		type: "GET",
		url: urlTest+cmdBill,
		data: {"roomId": roomId},
		dataType: "json",
		success: function (response) {
			var detailBill = JSON.stringify(response);
			alert(detailBill);
		}
	});
}

//6. 显示实时计费表
