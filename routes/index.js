var express = require('express');
var router = express.Router();
var fetch=require('node-fetch')
var unirest= require('unirest')
var moment=require('moment')

/* GET home page. */
var time=moment().format('MMMM Do YYYY, h:mm:ss a')
console.log(time)
	 var  promise1=new Promise((resovle,reject)=>{

		fetch("https://pomber.github.io/covid19/timeseries.json")
  		.then(response => response.json())
  		.then(info => {

  			resovle(info)

  		})
  		.catch(err=>{
  			reject(err)});

 });
	 var promise2= new Promise((resovle,reject)=>{
	 	fetch("https://coronavirus-tracker-api.herokuapp.com/v2/latest")
  		.then(response => response.json())
  		.then(info => {

  			resovle(info)

  		})
  		.catch(err=>{
  			reject(err)});

	 })
router.get('/',(req, res, next)=> {
	var country=req.body.country
	promise2.
	then(info=>{
		console.log(info)
		promise1.
		then(data=>{
		var countrys=Object.keys(data)
		console.log(countrys)
		res.render('index',{report:'Global',countrys:countrys,recoverd:info.latest.recovered,dead:info.latest.deaths,infected:info.latest.confirmed,time:time,table:false})

		})	
	})
	.catch(err=>{
		console.log(err)
	});
	
	});
router.post("/",(req,res)=>{
	var country=req.body.country
	console.log(country)
	promise1.
	then(data=>{
		var countrys=Object.keys(data)
		let array=data[country]
		let length=array.length
		console.log(length)
		let recoverd=array[length-1].recovered
		let dead=array[length-1].deaths
		let infected=array[length-1].confirmed
		console.log(array)
		res.render('index',{report:country,countrys:countrys,recoverd:recoverd,dead:dead,infected:infected,data:array,time:time,table:true})
		})
	.catch(err=>{
		console.log(err)
	});

})

router.get("/graph/:country",(req,res)=>{
	let country=req.params.country
	if(country=="Global"){
		promise2.
		then(data=>{
			res.send(data)
		})
	}
	promise1.
	then(data=>{
		let array=data[country]
		let length=array.length
		res.send(array[length-1])
	});

});


module.exports = router;
