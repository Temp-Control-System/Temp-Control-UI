$(document).ready(function () {
    var urlTest = "https://mockapi.eolinker.com/1hywENt9b4bf5cdb7381fe38284a05d44d0631cf253c095"
    var urlDetail = "/detail_bill?"

    var roomId = GetQueryString("roomId"); //从当前url获取房间号
    $.ajax({
        type: "GET",
        url: urlTest + urlDetail,
        data: { "roomId": roomId },
        dataType: "json",
        success: function (response) {
            creatTable(response)
        }
    });
});

function creatTable(data) {
    var tbData = "<tr>"
    tbData += "<td>" + "房间号" + "</td>"
    tbData += "<td>" + "总费用（元）" + "</td>"
    tbData += "<td>" + "服务开始时间" + "</td>"
    tbData += "<td>" + "服务终止时间" + "</td>"
    tbData += "<td>" + "服务持续时间（秒）" + "</td>"
    tbData += "<td>" + "风速" + "</td>"
    tbData += "<td>" + "费率（元/秒）" + "</td>"
    tbData += "<td>" + "服务开始温度" + "</td>"
    tbData += "<td>" + "服务终止温度" + "</td>"
    tbData += "</tr>"

    tbData += "<tr>"
    tbData += "<td>" + data.serviceRecords[0].roomId + "</td>"
    tbData += "<td>" + Number(data.totalCost / 100).toFixed(2) + "</td>"
    
    var startTime = timeFormat(data.serviceRecords[0].serviceStartTime); //调整格式
    tbData += "<td>" + startTime + "</td>"

    var stopTime = getStopTime(data.serviceRecords[0].serviceStartTime, data.serviceRecords[0].lastTime)
    tbData += "<td>" + stopTime + "</td>"
    tbData += "<td>" + data.serviceRecords[0].lastTime + "</td>"
    tbData += "<td>" + data.serviceRecords[0].wind + "</td>"
    tbData += "<td>" + Number((Number(data.serviceRecords[0].totalCost/100).toFixed(2)) / data.serviceRecords[0].lastTime).toFixed(2) + "</td>"
    tbData += "<td>" + Number(data.serviceRecords[0].startTemperature).toFixed(1) + "</td>"
    tbData += "<td>" + Number(data.serviceRecords[0].endTemperature).toFixed(1) + "</td>"
    tbData += "</tr>"

    for (var i = 1; i < data.serviceNum; i++) {
        tbData += "<tr>"

        tbData += "<td>&nbsp;</td><td>&nbsp;</td>"
        startTime = timeFormat(data.serviceRecords[i].serviceStartTime); //调整格式
        tbData += "<td>" + startTime + "</td>"

        stopTime = getStopTime(data.serviceRecords[i].serviceStartTime, data.serviceRecords[i].lastTime)
        tbData += "<td>" + stopTime + "</td>"

        tbData += "<td>" + data.serviceRecords[i].lastTime + "</td>"
        tbData += "<td>" + data.serviceRecords[i].wind + "</td>"
        tbData += "<td>" + Number((Number(data.serviceRecords[i].totalCost/100).toFixed(2)) / data.serviceRecords[i].lastTime).toFixed(2) + "</td>"
        tbData += "<td>" + Number(data.serviceRecords[i].startTemperature).toFixed(1) + "</td>"
        tbData += "<td>" + Number(data.serviceRecords[i].endTemperature).toFixed(1) + "</td>"

        tbData += "</tr>"
    }
    $("#detailTable").html(tbData)
}

function GetQueryString(name) {
    //获得当前url ？后的参数
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);//search,查询？后面的参数，并匹配正则
    if (r != null) return unescape(r[2]); return null;
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
    if (mm < 10) clock += "0";
    clock += mm + ":";
    if (ss < 10) clock += "0";
    clock += ss;
    return (clock);
}

function isLeapYear(time) {
    //判断是否是闰年
    var d = new Date(time);
    var year = d.getFullYear();       //年  
    if ((year % 4 == 0 && year % 100 != 0) || (year % 400 == 0))
        return true;
    else return false
}
function perMonth(time) {
    //每个月的天数
    var d = new Date(time)
    var year = d.getFullYear()
    var month = d.getMonth() + 1

    switch (month) {
        case 1: case 3: case 5: case 7: case 8: case 10: case 12:
            return 31
        case 2:
            if (isLeapYear(time)) return 29
            else return 28
        case 4: case 6: case 9: case 11:
            return 30
    }
}
function getStopTime(time, duration) {
    //stopTime = time+duration
    var d = new Date(time);

    var year = d.getFullYear();       //年  
    var month = d.getMonth() + 1;     //月  
    var day = d.getDate();            //日  

    var hh = d.getHours();            //时  
    var mm = d.getMinutes();          //分  
    var ss = d.getSeconds();           //秒  

    var sec = ss + duration

    ss = sec % 60
    if (sec > 59) { //需要进位
        var min = mm + parseInt(sec / 60)
        mm = min % 60
        if (min > 59) {
            var hour = hh + parseInt(min / 60)
            hh = hour % 24
            if (hour > 23) {
                var dd = day + parseInt(hour / 24)
                //非闰年 1 3 5 7 8 10 12 每月31天；  2月28天 闰29天； 4 6 9 11 每月30天
                var dayPerMonth = perMonth(time);
                day = dd % dayPerMonth
                if (dd > dayPerMonth) {
                    mon = month + parseInt(dd / dayPerMonth); //只能控制一个月 超出一个月会不准
                    month = mon
                    if (mon > 12) {
                        year += 1
                    }
                }
            }
        }
    }

    var clock = year + '-'
    if (month < 10) clock += "0"
    clock += month + '-'
    if (day < 10) clock += "0"
    clock += day + ' '
    if (hh < 10) clock += "0"
    clock += hh + ':'
    if (mm < 10) clock += "0"
    clock += mm + ':'
    if (ss < 10) clock += "0"
    clock += ss

    return clock;
}
