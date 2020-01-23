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
	 let TabChart = [];
	 //let TabChart = [{x: new Date(2020,0,15),y: 3},{x: new Date(2020,0,17),y: 4},{x: new Date(2020,0,19),y: 5}];
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
		TabChart.push({x: new Date(b.effectiveDate.substring(0,3),b.effectiveDate[5],b.effectiveDate[8,10]),y: b.mid});
	});
	  });

	  
	 let elo="2020-01-22";
	  TabChart.push({x: new Date(elo.substring(0,3),elo[5],elo.substring(8,10)),y: 6});
	  TabChart.push({x: new Date(elo.substring(0,3),elo[5],26),y: 9});

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
		dataPoints: TabChart
	}]
});
chart.render();

});
	
 });
 
