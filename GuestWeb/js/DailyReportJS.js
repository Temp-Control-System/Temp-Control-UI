$(document).ready(function () {
    var url = "https://mockapi.eolinker.com/1hywENt9b4bf5cdb7381fe38284a05d44d0631cf253c095"
    var url_info = "/report?"
    var startD=GetQueryString("startDate")
    var endD = GetQueryString("endDate")
    //alert("sss")
    $.ajax({
        type:"get",
        url:url+url_info,
        data:{
            "startDate":startD,
            "endDate":endD
        },
        dataType:"json",
        success:function (response) {
           createTable(response)
        }
    })
})

function GetQueryString(name) {
    //获得当前url ？后的参数
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);//search,查询？后面的参数，并匹配正则
    if (r != null) return unescape(r[2]); return null;
}

function createTable(data) {
    var tbdata = "<tr>"
    tbdata+="<td>"+"序号"+"</td>"
    tbdata+="<td>"+"日期"+"</td>"
    tbdata+="<td>"+"房间号"+"</td>"
    tbdata+="<td>"+"使用次数"+"</td>"
    tbdata+="<td>"+"常用目标温度"+"</td>"
    tbdata+="<td>"+"常用风速"+"</td>"
    tbdata+="<td>"+"达标次数"+"</td>"
    tbdata+="<td>"+"调度次数"+"</td>"
    tbdata+="<td>"+"总费用"+"</td>"
    tbdata+="</tr>"
    for(var i =0;i<data.length;i++){
        tbdata+="<tr>"
        tbdata+="<td>"+(i+1)+"</td>"        //详单数，之后替换
        tbdata+="<td>"+data[i].date+"</td>"
        tbdata+="<td>"+data[i].roomId+"</td>"
        tbdata+="<td>"+data[i].use_times+"</td>"
        tbdata+="<td>"+data[i].mostFreqTemp+"</td>"
        tbdata+="<td>"+data[i].mostFreqWind+"</td>"
        tbdata+="<td>"+data[i].reachTargetTimes+"</td>"
        tbdata+="<td>"+data[i].scheduledTimes+"</td>"
        tbdata+="<td>"+data[i].totalCost+"</td>"
        tbdata+="</tr>"
    }
    $("#ReportTable").html(tbdata)
}