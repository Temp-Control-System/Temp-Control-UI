function checkIn() {
    var urlTest = "https://mockapi.eolinker.com/1hywENt9b4bf5cdb7381fe38284a05d44d0631cf253c095"
    var check_in = "/check_in"	
    var roomId;
	$.ajax({
		type: "GET",
		url: urlTest+check_in,
		dataType: "json",
		success: function (response) {
            var  roomId=response.roomId;
            window.location.href="./AirCondShow-2.0.html?roomId="+roomId;
		}
    });
}