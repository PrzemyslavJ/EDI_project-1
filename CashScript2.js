$(document).ready( function() {
	let Tab = [];

	$("#wykr").hide();
	
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
	 Tab =[];
	  $("#Courses").empty();
	  let LinkText = "http://api.nbp.pl/api/exchangerates/rates/a/";
	    LinkText+=$("#list option:selected").val();
		LinkText+="/";
		LinkText+=GenTextDt($('#StartDate').val());
		LinkText+="/";
		LinkText+=GenTextDt($('#EndDate').val());
		LinkText+="/?format=json";
		$.getJSON(LinkText, function(result){
      $.each(result.rates, function(a,b){
		$("#Courses").append("<tr><td>"+b.effectiveDate+"</td>"+"<td>" +b.mid+" zł"+"</td></tr>");
		if(b.effectiveDate[5]==0){
		Tab.push({x: new Date(b.effectiveDate.substring(0,4),b.effectiveDate[6]-1,b.effectiveDate.substring(8,10)),y: b.mid});
		}
		else{
		Tab.push({x: new Date(b.effectiveDate.substring(0,4),b.effectiveDate.substring(5,7)-1,b.effectiveDate.substring(8,10)),y: b.mid});
		}
	});
	  });
	  $("#wykr").show();
	  $("#chartContainer").hide();
 });
	  
$("#wykr").click(function(){
$("#chartContainer").show();	
 var chart = new CanvasJS.Chart("chartContainer", {
	animationEnabled: true,
	title:{
		text: "Kurs waluty w zdefiniowanym zakresie"
	},
	axisX:{
		valueFormatString: "DD MMM"
	},
	axisY: {
		title: "Kurs (PLN)",
		includeZero: false,
		scaleBreaks: {
			autoCalculate: true
		}
	},
	data: [{
		type: "line",
		xValueFormatString: "DD MMM",
		color: "#F08080",
		dataPoints: Tab
	}]
});
chart.render();
$("#wykr").hide();

});
	
 });
 
