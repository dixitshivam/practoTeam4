$("#search-btn").click(function () {
	var specInput = $("#spec").val();
	var locInput = $("#loc").val();
	var city = "";
	var index = 1;
	var docList = getDoctorData(specInput,locInput,city,index);
	
	$("#search-box").animate({marginTop: "0px"}, 400, "linear", function () {
		$("#doctor-list-wrapper").text("");
		makeDoctorCards(docList);
	});
	$("#pagination-wrapper").show();
});

$("#page-list li").on("click", function (){
	var pageId = $(this).attr("id");
	var index = $(this).text();
	var specInput = $("#spec").val();
	var locInput = $("#loc").val();
	var city = "";
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
			$("<div>").addClass("sideCard").appendTo(newCard).append("<p>Specialization: " + docList[i]["specialization"] + "<br>In: " + docList[i]["area"] + "<br>Fee: " + docList[i]["rate"] + "</p>");
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
	$("#loc").autocomplete({
		source: getLocationList("")
	});
});

function getDoctorData(speciality, location, city, index) {

	$.post("doctors_by_area.py", {city: city, area: location, specialization: speciality, page: index}, function(data, response) {
		alert(data);
	});
	var docList = [
		{
			"name": "Dr Tony Stark",
			"experience": "5 Years",
			"specialization": "Cardiologist",
			"rate": "INR 500",
			"education": "M.B.B.S, M.D",
			"imgsrc": "/img/1.png",
			"area": "JP Nagar",
        	"completeaddress": "This is the complete address of the clinic"
		},
		{
			"name": "Dr Thor Odinson",
			"experience": "24 Years",
			"specialization": "Dermatologist",
			"rate": "INR 400",
			"education": "M.B.B.S, MD-Dermatology",	
			"imgsrc": "/img/2.png",
			"area": "HSR Layout",
        	"completeaddress": "This is the complete address of the clinic"
		},
		{
			"name": "Dr Barry Allen",
			"experience": "2 Years",
			"specialization": "Pediatrician",
			"rate": "INR 600",
			"education": "M.B.B.S, M.D - Pediatrics",	
			"imgsrc": "/img/2.png",
			"area": "JP Nagar",
        	"completeaddress": "This is the complete address of the clinic"
		},
		{
			"name": "Dr Clark Kent",
			"experience": "6 Years",
			"specialization": "Dermatologist",
			"rate": "INR 350",
			"education": "MD-Dermatology",	
			"imgsrc": "/img/2.png",
			"area": "BTM Layout",
        	"completeaddress": "This is the complete address of the clinic"
		}
		,
		{
			"name": "Dr Bruce Wayne",
			"experience": "15 Years",
			"specialization": "Homeopath",
			"rate": "INR 300",
			"education": "B.H.S",	
			"imgsrc": "/img/2.png",
			"area": "Bannerghatta Road",
        	"completeaddress": "This is the complete address of the clinic"
		}
		,
		{
			"name": "Dr Oliver Queen",
			"experience": "5 Years",
			"specialization": "Pediatrician",
			"rate": "INR 700",
			"education": "M.B.B.S, DCH",	
			"imgsrc": "/img/2.png",
			"area": "WhiteField",
        	"completeaddress": "This is the complete address of the clinic"
		}
		,
		{
			"name": "Dr Steve Rogers",
			"experience": "25 Years",
			"specialization": "Cardiologist",
			"rate": "INR 600",
			"education": "M.D",	
			"imgsrc": "/img/2.png",
			"area": "WhiteField",
        	"completeaddress": "This is the complete address of the clinic"
		}
		,
		{
			"name": "Dr Sarah Conner",
			"experience": "5 Years",
			"specialization": "Dentist",
			"rate": "INR 500",
			"education": "B.D.S, M.D.S",
			"imgsrc": "/img/2.png",
			"area": "BTM Layout",
        	"completeaddress": "This is the complete address of the clinic"
		}
		,
		{
			"name": "Dr Charles Xavier",
			"experience": "19 Years",
			"specialization": "Dentist",
			"rate": "INR 400",
			"education": "B.D.S, M.D.S",
			"imgsrc": "/img/2.png",
			"area": "JP Nagar",
        	"completeaddress": "This is the complete address of the clinic"
		}
		,
		{
			"name": "Dr Peter Parker",
			"experience": "5 Years",
			"specialization": "Pediatrician",
			"rate": "INR 350",
			"education": "M.B.B.S, DCH",	
			"imgsrc": "/img/2.png",
			"area": "WhiteField",
        	"completeaddress": "This is the complete address of the clinic"
		}

	];

	var len = docList.length;
	var output = [];
	for(var x = 0; x<len; x++) {
		if(speciality == docList[x]["specialization"] && location == docList[x]["area"]) {
			output.push(docList[x]);
		}
	}
	return output;	
}

function getLocationList(city) {
	return ["JP Nagar", "HSR Layout", "BTM Layout", "WhiteField", "Bannerghatta Road"];
}

function getSpecialityList() {
	return ["Dentist", "Dermatologist", "Pediatrician", "Homeopath", "Cardiologist"];
}