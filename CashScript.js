$(document).ready( function() {

 $.getJSON("http://api.nbp.pl/api/exchangerates/tables/A/?format=json", function(result){
      $.each(result[0].rates, function(a,b){
        $("#All").append(b.currency+" Kurs: " + b.mid + "</br> ");
      });
    });

	 const MainLinks = ["http://api.nbp.pl/api/exchangerates/rates/A/USD/?format=json",
			  "http://api.nbp.pl/api/exchangerates/rates/A/EUR/?format=json",
			  "http://api.nbp.pl/api/exchangerates/rates/A/GBP/?format=json",
			  "http://api.nbp.pl/api/exchangerates/rates/A/CHF/?format=json",
			  "http://api.nbp.pl/api/exchangerates/rates/A/JPY/?format=json",
			  "http://api.nbp.pl/api/exchangerates/rates/A/CNY/?format=json",
			  "http://api.nbp.pl/api/exchangerates/rates/A/SEK/?format=json"]

for(let i=0;i<MainLinks.length;i++){	
$.getJSON(MainLinks[i], function(result){
        $("#Main").append(result.currency+" kurs: "+result.rates[0].mid+" zł </br></br>");
      });
    }
	
});	