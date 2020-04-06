/*$("body").mouseover(function(e){
	console.log(e)
});
*/
$("#table1").fadeIn(3000)

function myFunction(){
	$('table').css('display','none')
	var report=$("#report").html()
	console.log(report)
	var splitarray=report.split(" ");
	var country=splitarray[0]
	console.log(country)
	$.get("/graph"+"/"+country,function(data,staus){
		console.log(data)
		var labelarray=[]
		labelarray.push(data)
		if(country=='Global'){
		var dataarray=[]
		labelarray.forEach(function(dat){
			dataarray.push(dat.latest.confirmed)
			dataarray.push(dat.latest.deaths)
			dataarray.push(dat.latest.recovered)
		})
		console.log(dataarray)
		var ctx=$("#myChart")[0].getContext('2d')
var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['Confirmed', 'Dead', 'Recoverd'],
        datasets: [{
        	label:'Stats',
            data: dataarray,
            backgroundColor: [
                'yellow',
                'red',
                'green'
            ],
            borderColor: [
               'yellow',
               'red',
               'green'
            ],
            borderWidth: 5,
            fill:false
        }]
    },
    options: {
    	title: {
            display: true,
            text: country,
            fontSize:20
        },
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                    fontSize: 20
                }
            }],
             xAxes: [{
                ticks: {
                    beginAtZero: true,
                    fontSize: 20
                }
            }]
        }
    }
});
}
else{
		labelarray.push(data)
		var dataarray=[]
		labelarray.forEach(function(dat){
			dataarray.push(dat.confirmed)
			dataarray.push(dat.deaths)
			dataarray.push(dat.recovered)
		})
		console.log(dataarray)
		var ctx=$("#myChart")[0].getContext('2d')
var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['Confirmed', 'Deaths','Recovered'],
        datasets: [{
        	label:'Stats',
            data: dataarray,
            backgroundColor: [
                'yellow',
                'red',
                'green'
            ],
            borderColor: [
                'yellow',
                'red',
                'green'
            ],
            borderWidth: 5,
            fill:false
        }]
    },
    options: {
    	title: {
            display: true,
            text: country,
            fontSize:20
        },
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                    fontSize: 20
                }
            }],
            xAxes: [{
                ticks: {
                    beginAtZero: true,
                    fontSize: 20
                }
            }]
        }
    }
});
}
window.scrollBy('',599);
});
}
function myFunction1(){
	$("#form1").submit()
}
