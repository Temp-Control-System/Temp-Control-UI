$(document).ready(function () {
    var urlTest = "https://mockapi.eolinker.com/1hywENt9b4bf5cdb7381fe38284a05d44d0631cf253c095";
    var cmdAdd = "/add?"
    var query = "/query?"
    var roomId;
    $.ajax({
		type: "GET",
		url: urlTest+query,
		data: {"roomId" : roomId},
		dataType: "json",
		success: function (response) {
            $("#roomId").text(response.roomId);
		}
    });
    
    var wind;
    var mode;
    var targetT;
    //1. 获取并校验调温请求
    $("#targetTemperature").blur(function () { 
        targetT = $("#targetTemperature").val();
        if (targetT < 18 || targetT > 30 ) {
            $("#checkTemp").text("温度设置出错，请重新设置，范围应在18-30℃");
            $("#targetTemperature").val('');
        }    
    });

    //2. 获取调风数据
    $("#wind").blur(function () {
        wind = $("input[name='wind']:checked").val();
    });

    //3. 获取选择模式
    $("#mode").blur(function () { 
        mode = $("input[name='mode']:checked").val();        
    });

    //4. 发送调温调风请求
    function affirm() {
        $.ajax({
            type: "POST",
            url: urlTest+cmdAdd,
            data: {
            "roomId": $("#roomId").text(),
            "wind": wind,
            "mode": mode,
            "targetTemperature": targetT
            },
            success: function (response) {
                alert("设置成功");
                window.location.href="../AirCondShow-1.0.html";
            }
        });            
    }


})
