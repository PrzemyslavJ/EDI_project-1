$(document).ready( function() {

 $.getJSON("http://api.nbp.pl/api/exchangerates/tables/A/?format=json", function(result){
      $.each(result[0].rates, function(a,b){
        $("#All").append("<tr><td>"+b.currency+"</td>"+"<td>"+b.mid +" zł </br>"+"</td></tr>");
      });
    });

	 const MainLinks = ["http://api.nbp.pl/api/exchangerates/rates/A/USD/?format=json",
			  "http://api.nbp.pl/api/exchangerates/rates/A/EUR/?format=json",
			  "http://api.nbp.pl/api/exchangerates/rates/A/GBP/?format=json",
			  "http://api.nbp.pl/api/exchangerates/rates/A/CHF/?format=json"]

for(let i=0;i<MainLinks.length;i++){	
$.getJSON(MainLinks[i], function(result){
        $("#Main").append("<tr><td>"+result.currency+"</td>"+"<td>"+result.rates[0].mid+" zł"+"</td></tr>");
      });
    }
	
});	