var affirm;
$(document).ready(function () {
    var url = "https://mockapi.eolinker.com/1hywENt9b4bf5cdb7381fe38284a05d44d0631cf253c095";
    var url_info = "/report?";
    var startdate;
    var enddate;
    //alert("www");
    // var date_now = new Date();
    // var year = date_now.getFullYear();
    // var month = date_now.getMonth()+1<10?"0"+(date_now.getMonth()+1):(date_now.getMonth()+1);
    // var date = date_now.getDate()<10?"0"+date_now.getDate():date_now.getDate();
    // $("#start").attr("max",year+"-"+month+"-"+date);
    // $("#end").attr("max",year+"-"+month+"-"+date);
    // //设置时间要求，不能输入超过当前时间的日期信息
    // $("#start").blur(function () {
    //     startdate = document.getElementById("start").value;
    //     alert(startdate);
    //     if(startdate>date){
    //         alert("起始日期不合法！");
    //         $("#start").val('');
    //     }
    // });
    // $("#end").blur(function () {
    //     enddate=$("#end").val();
    //     if(startdate==null){
    //         alert("请先输入起始日期！");
    //         $("#end").val('');
    //     }
    //     else if(startdate>enddate||enddate>date)
    //     {
    //         alert("截止日期小于起始日期！");
    //         $("#end").val('');
    //     }
    // });
    affirm=function () {
        //alert("123");
        startdate = document.getElementById("start").value;
        enddate = document.getElementById("end").value;
        //alert(startdate);
        //alert(enddate);
        //var url1="./DailyReport.html?startDate="+startdate;
        //window.location.href = "./DailyReport.html?startDate="+startdate+"&endDate="+enddate;
        //alert("sss");
        if(startdate==null||enddate==null){
            alert("请输入时间信息！")
        }else if(startdate>enddate){
            alert("日期不合法！")
            $("#start").val('')
            $("#end").val('')
        }
        $.ajax({
                type:"GET",
                url:url+url_info,    //地址修改
                data:{
                    "startDate":startdate,
                    "endDate":enddate
                },
                dataType:"json",
                success:function (response) {
                    //alert("查询成功！");
                    window.location.href = "./DailyReport.html?startDate="+startdate+"&endDate="+enddate;
                    //window.location.href = "/DailyReport.html?startDate="+startdate+"&endDate="+enddate;
                    //跳转
                },
            });


    }
})

function quit() {
    window.location="./login.html"
}
