$(document).ready( function() {

let Transactions = [];
const Cry = new XMLHttpRequest();


Cry.addEventListener("load",  function() {
    if (Cry.status === 200) {
        const data = JSON.parse(Cry.response);
		$.each(data.items, function(i,b){
		if(b.m.includes("-PLN")){
        $("#CryptTable").append("<tr><td>"+b.m.substring(0,3)+"</td>"+"<td>" +b.r24h+"</td>"+"<td>"+b.h+"</td>"+"<td>"+b.l+"</td></tr>");
		$("#Crypto").append($('<option/>',{
			value: b.m.substring(0,3),
			text: b.m.substring(0,3)
		}));
		}
      });
    }
	});
	
Cry.addEventListener("error", function() {
    alert("Błąd wczytywania danych z serwisu !");
});

Cry.open("GET", "https://api.bitbay.net/rest/trading/stats", true);
Cry.send();

$("#Crypto").change(function () {
    Transactions = [];	
    Link = "https://api.bitbay.net/rest/trading/transactions/";
	Link+=$('#Crypto').val();
	Link+="-PLN";
	$.getJSON(Link, function(result){
	$.each(result.items, function(i,b){
	Transactions.push({y: parseFloat(b.r),label: b.ty +" "+(i+1)});
	});
});
});

$("#WykrCrypt").click(function(){
	
var chart = new CanvasJS.Chart("chartContainer2", {
	animationEnabled: true,
	theme: "light2", // "light1", "light2", "dark1", "dark2"
	title:{
		text: "Ostatnie transakcje kryptowaluty (PLN)"
	},
	axisY: {
		title: "Kurs(PLN)"
	},
	data: [{        
		type: "column",  
		showInLegend: true, 
		legendMarkerColor: "grey",
		legendText: "Kupno lub sprzedaż (buy/sell)",
		dataPoints: Transactions     
		
	}]
	
});
chart.render();
});

/*
$.getJSON("https://api.bitbay.net/rest/trading/stats", function(result){
	$.each(result.items, function(i,b){
		if(b.m.includes("-PLN")){
        $("#CryptTable").append("<tr><td>"+b.m.substring(0,3)+"</td>"+"<td>" +b.r24h+"</td>"+"<td>"+b.h+"</td>"+"<td>"+b.l+"</td></tr>");
		}
      });
        
      });
*/

});