var urlTest = "https://mockapi.eolinker.com/1hywENt9b4bf5cdb7381fe38284a05d44d0631cf253c095"
var query = "/query?"
var roomId

//1. 状态获取
$(document).ready(function () {
	//从当前url获取roomId
	var roomId = GetQueryString("roomId");
	$("#roomId").text(roomId);
	getStates();
	draw()
});

function GetQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);//search,查询？后面的参数，并匹配正则
	if (r != null) return unescape(r[2]); return null;
}

function getStates() {
	var query = "/query?"
	var roomId = $("#roomId").text();
	$.ajax({
		type: "GET",
		url: urlTest + query,
		data: { "roomId": roomId },
		dataType: "json",
		success: function (response) {
			$("#status").text(response.status);
			$("#mode").text(response.mode);
			$("#wind").text(response.wind);
			var tarT = Number(response.targetTemperature).toFixed(2)
			$("#targetTemperature").text(tarT);
			var temp = Number(response.temperature).toFixed(2)
			$("#temperature").text(temp);
			var cost = Number(response.totalCost / 100).toFixed(2)
			$("#totalCost").text(cost);
		}
	});
}

//2. 点击设置跳转界面
function goSet() {
	window.location = "./AirCondSet-2.0.html?roomId=" + $("#roomId").text();
}

//3. 发送关机请求
var cmdOff = "/takeoff?"
function shutDown() {
	$.ajax({
		type: "GET",
		url: urlTest + cmdOff,
		data: { "roomId": roomId },
		dataType: "json",
		success: function (response) {
			alert("空调已关闭"); //想一下之后有没有更好的提示方法
		}
	});
}

//4. 下载账单  
var cmdBill = "/detail_bill?"
function downBill() {
	$.ajax({
		type: "GET",
		url: urlTest + cmdBill,
		data: { "roomId": roomId },
		dataType: "json",
		success: function (response) {
			window.location = "./bill-2.0.html?roomId=" + $("#roomId").text();
		}
	});
}
//5. 下载详单
function downDetail() {
	$.ajax({
		type: "GET",
		url: urlTest + cmdBill,
		data: { "roomId": roomId },
		dataType: "json",
		success: function (response) {
			//alert(JSON.stringify(response))
			window.location = "./detailBill-2.0.html?roomId=" + $("#roomId").text();
		}
	});
}

//6. 显示实时计费表 横坐标只保留时分秒
function draw() {

	var myChart = echarts.init(document.getElementById('realCharts'))
	myChart.showLoading()
	option = {
		title: {
			text: '温度和费用实时变化图'
		},
		tooltip: {
			trigger: 'axis'
		},
		legend: {
			data: ['温度/℃', '花费/cent']
		},
		xAxis: {
			type: 'category',
			boundaryGap: true,
			data: (function () {
				var now = new Date();
				var res = [];
				var len = 10;
				while (len--) {
					res.unshift(now.toLocaleTimeString().replace(/^\D*/, ''));
					now = new Date(now - 2000);
				}
				return res;
			})()
		},
		yAxis: [
			{
				type: 'value',
				name: '温度/℃',
				min: 0,
				boundaryGap: [0.2, 0.2]
			},
			{
				type: 'value',
				name: '花费/cent',
				min: 0,
				boundaryGap: [0.2, 0.2]
			}
		],
		series: [ //loading阶段随机生成数
			{
				name: '花费/cent',
				type: 'bar',
				yAxisIndex: 1,
				data: (function () {
					var res = [];
					var len = 10;
					while (len--) {
						res.push(Math.round(Math.random() * 1000));
					}
					return res;
				})()
			},
			{
				name: '温度/℃',
				type: 'line',
				data: (function () {
					var res = [];
					var len = 0;
					while (len < 10) {
						res.push((Math.random() * 10 + 5).toFixed(1) - 0);
						len++;
					}
					return res;
				})()
			}
		]
	};
	setInterval(function () {

		axisData = (new Date()).toLocaleTimeString().replace(/^\D*/, '');
		var query = "/query?"
		var roomId = $("#roomId").text();
		$.ajax({
			type: "GET",
			url: urlTest + query,
			data: { "roomId": roomId },
			dataType: "json",
			success: function (response) {
				myChart.hideLoading()
				$("#status").text(response.status);
				$("#mode").text(response.mode);
				$("#wind").text(response.wind);
				var tarT = Number(response.targetTemperature).toFixed(2)
				$("#targetTemperature").text(tarT);
				var temp = Number(response.temperature).toFixed(2)
				$("#temperature").text(temp);
				var cost = Number(response.totalCost / 100).toFixed(2)
				$("#totalCost").text(cost);
				var data0 = option.series[0].data;
				var data1 = option.series[1].data;
				data0.shift();
				data0.push(response.totalCost);
				data1.shift();
				data1.push(response.temperature);
				option.xAxis.data.shift();
				option.xAxis.data.push(axisData);
				myChart.setOption(option);
			}
		});
	}, 1000);
}	