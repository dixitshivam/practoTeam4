$("#search-btn").click(function () {
	var city = $("#city").val();
	window.open("/" + city, "_self");
});

$("#city").on("input", function() {
	$("#city").autocomplete({
		source: getCityList()
	});
});

function getCityList() {
	return ["Bangalore", "Mumbai", "Delhi", "Hyderabad", "Chennai", "Kolkata", "Ahemdabad", "Indore"];	
}

$(document).ready(function() {
	$(window).keydown(function(event){
		if(event.keyCode == 13) {
			event.preventDefault();
			return false;
		}
	});
});