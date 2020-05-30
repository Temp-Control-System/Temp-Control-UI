var urlTest = "https://mockapi.eolinker.com/1hywENt9b4bf5cdb7381fe38284a05d44d0631cf253c095"
var roomId = 8
//1. 状态获取
var query = "/query?roomId="
$(function () {
	$.ajax({
		type: "GET",
		url: urlTest+query+roomId,
		data: {"roomId" : roomId},
		success: function (data) {
			var roomId = data.roomId;
			var status = data.status;
			var mode = data.mode;
			var wind = data.wind;
			var targetTemperature = data.targetTemperature;
			var temperature = data.temperature;
			var totalCost = data.totalCost;
	
			$("#roomId").val("roomId");
			$("#status").val("status");
			$("#mode").val("mode");
			$("#wind").val("wind");
			$("#targetTemperature").val("targetTemperature");
			$("#temperature").val("temperature");
			$("#totalCost").val("totalCost");
		}
	});	
});

//2. 点击设置跳转界面
//在html中写了

//3. 发送关机请求
var cmdOff = "/takeoff?roomId"
function shutDown(){
	$.ajax({
		type: "GET",
		url: urlTest+cmdOff+roomId, 
		data: {"roomId": roomId},
		dataType: "json",
		success: function (response) {
			alert("空调已关闭"); //想一下之后有没有更好的提示方法
		}
	});
}

//4. 下载账单  //这个下载的话是直接打印一张图片呢 还是弄成文件呢？
var cmdBill = "/detail_bill?roomId="
function downBill(){
	$.ajax({
		type: "GET",
		url: urlTest+cmdBill+roomId,
		data: {"roomId": roomId},
		dataType: "dataType",
		success: function (data) {
			alert(data);
		}
	});
}
//5. 下载详单

function downDetail(){
	$.ajax({
		type: "GET",
		url: urlTest+cmdBill+roomId,
		data: {"roomId": roomId},
		success: function (data) {
			alert(data);
		}
	});
}

//6. 显示实时计费表
var myCharts = encharts.init(document.getElementById("realCharts"));

data = [[],[]];
option = {

	// Make gradient line here
	visualMap: [{
		show: false,
		type: 'continuous',
		seriesIndex: 0,
		min: 0,
		max: 400
	}, {
		show: false,
		type: 'continuous',
		seriesIndex: 1,
		dimension: 0,
		min: 0,
		max: dateList.length - 1
	}],


	title: [{
		left: 'center',
		text: 'Gradient along the y axis'
	}, {
		top: '55%',
		left: 'center',
		text: 'Gradient along the x axis'
	}],
	tooltip: {
		trigger: 'axis'
	},
	xAxis: [{
		data: dateList
	}, {
		data: dateList,
		gridIndex: 1
	}],
	yAxis: [{
		splitLine: {show: false}
	}, {
		splitLine: {show: false},
		gridIndex: 1
	}],
	grid: [{
		bottom: '60%'
	}, {
		top: '60%'
	}],
	series: [{
		type: 'line',
		showSymbol: false,
		data: valueList
	}, {
		type: 'line',
		showSymbol: false,
		data: valueList,
		xAxisIndex: 1,
		yAxisIndex: 1
	}]
};

myCharts.setOption(option);

