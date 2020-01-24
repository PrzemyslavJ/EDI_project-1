$(document).ready( function() {

$.getJSON("https://api.bitbay.net/rest/trading/stats", function(result){
	$.each(result.items, function(i,b){
		if(b.m.includes("-PLN")){
        $("#CryptTable").append("<tr><td>"+b.m.substring(0,3)+"</td>"+"<td>" +b.r24h+"</td>"+"<td>"+b.h+"</td>"+"<td>"+b.l+"</td></tr>");
		}
      });
        
      });


});