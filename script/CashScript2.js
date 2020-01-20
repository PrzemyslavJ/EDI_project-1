$(document).ready( function() {

 $.getJSON("http://api.nbp.pl/api/exchangerates/tables/A/?format=json", function(result){
      $.each(result[0].rates, function(a,b){
		$("#list").append($('<option/>',{
			value: b.code,
			text: b.currency
		}));
	  });
 });
 function GenTextDt(DateObject){
	 let date = new Date(DateObject);
	 if(date.getDate()<10){
	 day = "0"+ date.getDate();
	 }
	 else{
	 day = date.getDate(); 
	 }
	 if(date.getMonth()+1<10){
	 MO = date.getMonth()+1;
	 month ="0"+ MO;
	 }
	 else{
	 month = date.getMonth()+1; 
	 }
	 year = date.getFullYear();
	 let textDate = [year, month, day].join('-');
	 return textDate;
 }

 $("#show").click(function(){
	 $("#showed").html("");
	  let LinkText = "http://api.nbp.pl/api/exchangerates/rates/a/";
	    LinkText+=$("#list option:selected").val();
		LinkText+="/";
		LinkText+=GenTextDt($('#StartDate').val());
		LinkText+="/";
		LinkText+=GenTextDt($('#EndDate').val());
		LinkText+="/?format=json";
		$.getJSON(LinkText, function(result){
      $.each(result.rates, function(a,b){
        $("#showed").append(b.effectiveDate+" Kurs: " + b.mid + "</br> ");
      });
    });
	 
 });
 
});