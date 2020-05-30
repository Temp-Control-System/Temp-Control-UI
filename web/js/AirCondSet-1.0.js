var urlTest = "https://mockapi.eolinker.com/1hywENt9b4bf5cdb7381fe38284a05d44d0631cf253c095"
var roomId = 8

//1. 获取并校验调温请求
//var targetT = $("#targetTemperature").val();
var targetT = document.getElementById("targetTemperature").value;
if (targetT < 18 || targetT > 30 ) {
    $("#checkTemp").html("温度设置出错，请重新设置，范围应在18-30℃");
    $("#targetTemperature").val("");
}

//2. 获取调风数据
var wind = $("input[name='wind']:checked").val();

//3. 获取选择模式
var mode = $("input[name='mode']:checked").val();

//4. 发送调温调风请求
var cmdAdd = "/add?"
function affirm() {
    $.ajax({
        type: "POST",
        url: urlTest+cmdAdd+roomId+"&mode="+mode+"&wind="+wind+"&targetTemperature="+targetT,
        data: {
            "roomId": roomId,
            "targetTemperature": targetT,
            "wind": wind,
            "mode": mode
        },
        success: function (response) {
            alert("设置成功");
        }
    });            
}