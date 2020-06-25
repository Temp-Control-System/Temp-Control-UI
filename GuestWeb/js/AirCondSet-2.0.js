var affirm;
$(document).ready(function () {
    var urlTest = "https://mockapi.eolinker.com/1hywENt9b4bf5cdb7381fe38284a05d44d0631cf253c095";
    var urlAdd = "/add"
    var query = "/query?"
    var roomId=GetQueryString("roomId");
    $("#roomId").val(roomId);
    
    var wind;
    var mode;
    var targetT;

    // 0. 设置表单默认值 （上次未设置过的填缺省： wind 中风， mode refrigeration， temperature 25℃）
    $.ajax({
        type: "GET",
        url: urlTest+query,
        data: {"roomId": roomId},
        dataType: "json",
        success: function (response) {
            $("input[value='"+response.wind+"']").attr("checked", true);
            $("input[value='"+response.mode+"']").attr("checked", true);
            $("#targetTemperature").val(response.targetTemperature)
        }
    });
    //1. 获取并校验调温请求
    $("#targetTemperature").blur(function () { 
        targetT = $("#targetTemperature").val();
        if (targetT < 18 || targetT > 25 ) {
            $("#checkTemp").text("温度设置出错，请重新设置，范围应在18-25℃");
            $("#targetTemperature").val('');
        } else {
            $("#checkTemp").text("");
        }
    });

    //4. 发送调温调风请求
    affirm=function (){
	//2. 获取调风数据
	wind = $("input[name='wind']:checked").val();
	//3. 获取选择模式	
        mode = $("input[name='mode']:checked").val();      
        targetT = $("#targetTemperature").val();
	//console.log(mode,wind);
        $.ajax({
            type: "POST",
            url: urlTest+urlAdd,
            data: {
            "roomId": roomId,
            "mode": mode,
            "wind": wind,
            "targetTemperature": targetT
            },
            dataType:"json",
            success: function (response) {
                alert("设置成功");
                window.location.href="./AirCondShow-2.0.html?roomId="+roomId;
            },    
			error:function(xhr,state,errorThrown){
				requesFail(xhr);
			}
        });            
    }
})
function GetQueryString(name)
{
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);//search,查询？后面的参数，并匹配正则
     if(r!=null)return  unescape(r[2]); return null;
}
