$(document).ready(function () {
    var urlTest = "https://mockapi.eolinker.com/1hywENt9b4bf5cdb7381fe38284a05d44d0631cf253c095";
    var bill = "/detail_bill?"

    var roomId = GetQueryString("roomId");
    $("#roomId").html(roomId)
    $.ajax({
        type: "GET",
        url: urlTest + bill,
        data: { "roomId": roomId },
        dataType: "json",
        success: function (response) {
            creatTable(response)
        }
    });
});
function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);//search,查询？后面的参数，并匹配正则
    if (r != null) return unescape(r[2]); return null;
}

function creatTable(data) {

    var tbData = "<tr><td>房间号</td>"
    tbData += "<td>" + data.serviceRecords[0].roomId + "</td></tr>"

    tbData += "<tr><td>入住时间</td>"
    var dateIn = timeFormat(data.checkInDate)
    tbData += "<td>" + dateIn + "</td></tr>"

    tbData += "<tr><td>离店时间</td>"
    var dateOut = timeFormat(data.checkOutDate)
    tbData += "<td>" + dateOut + "</td></tr>"

    tbData += "<tr><td>总费用（元）</td>"
    var cost = Number(data.totalCost / 100).toFixed(2)
    tbData += "<td>" + cost + "</td></tr>"
    tbData += "<tr><td>总服务时长（秒）</td>"
    tbData += "<td>" + data.totalServiceTime + "</td></tr>"
    tbData += "<tr><td>服务次数</td>"
    tbData += "<td>" + data.serviceNum + "</td></tr>"
    $("#billTable").html(tbData)
}

function timeFormat(time) { //时间戳格式转换为正常格式
    var d = new Date(time);

    var year = d.getFullYear();       //年  
    var month = d.getMonth() + 1;     //月  
    var day = d.getDate();            //日  

    var hh = d.getHours();            //时  
    var mm = d.getMinutes();          //分  
    var ss = d.getSeconds();           //秒  

    var clock = year + "-";
    if (month < 10) clock += "0";
    clock += month + "-";
    if (day < 10) clock += "0";
    clock += day + " ";
    if (hh < 10) clock += "0";
    clock += hh + ":";
    if (mm < 10) clock += '0';
    clock += mm + ":";
    if (ss < 10) clock += '0';
    clock += ss;
    return (clock);
}
