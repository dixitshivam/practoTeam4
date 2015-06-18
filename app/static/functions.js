$("#search-btn").click(function () {
	var specInput = $("#spec").val();
	var locInput = $("#loc").val();
	var url = window.location.href;
	var city = "";
	var index = 1;
	var counter = 0;
	for(var i = 0;i < url.length;i++){
		if(counter>=3){
			city+=url[i];
		}
		if(url[i]=='/'){
			counter++;
		}
	}
	console.log(city);
	function f(doc) {
		console.log("Hello",doc);
		$("#search-box").animate({marginTop: "0px"}, 400, "linear", function () {
			$("#doctor-list-wrapper").text("");
			makeDoctorCards(doc);
		});
		$("#pagination-wrapper").show();
	}
	getDoctorData(specInput,locInput,city,index, f);
});

$("#page-list li").on("click", function (){
	var pageId = $(this).attr("id");
	var index = $(this).text();
	var specInput = $("#spec").val();
	var locInput = $("#loc").val();
	var city = "";
	var counter = 0;
	for(var i = 0;i < url.length;i++){
		if(counter>=3){
			city+=url[i];
		}
		if(url[i]=='/'){
			counter++;
		}
	}
	var docList = getDoctorData(specInput,locInput,city,index);
	
	$(".doctorCard").slideUp(500)
	$("#doctor-list-wrapper").text("");
	makeDoctorCards(docList);
});

function makeDoctorCards(docList) {
	var len = docList.length;
	var limit = 10;
	if(len < 10)
		limit = len;
	if(len==0)
	{
		$("<p>").text("No results to display").appendTo("#doctor-list-wrapper");
	}
	else {

		for(var i=0;i<limit;i++) {
			var txt = "<h2>" + docList[i]["name"] + "</h2><p>" + docList[i]["education"] + "</p><p>Experience: " + docList[i]["experience"] + "</p>";
			var newRow = $("<div>").addClass("row").appendTo("#doctor-list-wrapper");
			var newCard = $("<div>").addClass("col-sm-8").addClass("doctorCard").addClass("col-sm-offset-2");
			$("<div>").addClass("sideCard").appendTo(newCard).append("<p>Specialization: " + docList[i]["specialization"] + "<br>In: " + docList[i]["area"] + "<br>Fee: " + docList[i]["fee"] + "</p>");
			newCard.appendTo(newRow).slideDown(1000).append(txt);	
		}
	}
}

$("#spec").on("input",function() {
	$("#spec").autocomplete ({
	source: getSpecialityList()
	});	
});

 $("#loc").on("input", function() {
 	var city = "";
 	var url = window.location.href;
	var counter = 0;
	for(var i = 0;i < url.length;i++){
		if(counter>=3){
			city+=url[i];
		}
		if(url[i]=='/'){
			counter++;
		}
	}
 	$("#loc").autocomplete({
 		source: getLocationList(city)
 	});
 });

function getLocationList(city){
	var cityList = [];
	var p = "";
	p+="get/"+String(city);
	$.get(p, function(data){
		var List = data.results;
		for (var i = 0;i < List.length;i++){
			cityList.push(List[i].area);
		}
		console.log(cityList);
	});
	return cityList;
}
function getDoctorData(speciality, location, city, index, func_proc) {

	var docList = [];
	var Data;
	var p = String(city)+"/"+String(location)+"/"+String(speciality)+"/"+String(index);
	$.get(p, function(data){
		var docList = data.results;
		console.log(docList);
		func_proc(docList);
	});
}

function getSpecialityList() {
	return ["Dentist", "Dermatologist", "Pediatrician", "Homeopath", "Cardiologist"];
}