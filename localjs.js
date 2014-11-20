

// TO DO LIST:
// add drop down menu for categories of destinations (parks, big cities, etc.)
// create several arrays of destinations to match categories above
// trim down JS to one single block of calculating code that cycles through chosen array
// add error handling code
// redo yql-> move to pure ajax to pull gas price 


$(document).ready(function(){

	// CLICK FUNCTION
	$(".pressme").click(function(){

	// FADE / SLIDE AWAY INTRO QUESTION BOX 
	$(".questionbox").fadeTo("slow", 0.01, function(){ 
             $(this).slideUp("slow", function() { 
                 $(this).remove(); 
             });
         });

	// FADE IN RESULTING 9 DESTINATION 'CARDS'

	$(".fadein").fadeIn("slow");


	// USE USER FIELD INPUT TO SET DEPT AND MILEAGE VARIABLES
	var departureCity = document.getElementById('locationinput').value;
	var mileage = document.getElementById('mileageID').value;

	// COLLECT XML FILE FROM YQL for FUEL PRICE AVERAGES
	var xmlhttp;
	xmlhttp=new XMLHttpRequest();
	xmlhttp.open("GET","https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20xml%20where%20url%3D'http%3A%2F%2Fwww.fueleconomy.gov%2Fws%2Frest%2Ffuelprices'",false);
	xmlhttp.send();
	xmlDoc=xmlhttp.responseXML;

	// SCAN XML FILE AND USE TO ESTABLISH FUEL PRICE VARIABLES
	var regular = xmlDoc.getElementsByTagName("regular")[0].childNodes[0].nodeValue;;
	var midgrade = xmlDoc.getElementsByTagName("midgrade")[0].childNodes[0].nodeValue;;
	var premium = xmlDoc.getElementsByTagName("premium")[0].childNodes[0].nodeValue;;
	var diesel = xmlDoc.getElementsByTagName("diesel")[0].childNodes[0].nodeValue;;
	
	
	// USE USER INPUT FROM DROP DOWN
	var gasdropdown = $("#DropDown option:selected").val();

	// ESTABLISH CHOSENGASCOST VARIABLE
	var chosengascost;
	
	// USE DROP DOWN VARIABLE TO SET USER'S CHOSENGASCOST VARAIBLE
	function gaschoice(){
		if (gasdropdown === "Regular") {
			 chosengascost = regular;
			}
		else if (gasdropdown === "Midgrade") {
			 chosengascost = midgrade;
			}
		else if (gasdropdown === "Premium") {
			 chosengascost = premium;
			}
		else if (gasdropdown === "Diesel") {
			 chosengascost = diesel;
			}
		};

	// RUN GAS CHOICE FUNCTION 
	gaschoice();	

	// XML for VEGAS via Google Maps Distance Matrix API
	
	function vegas(){
		var origin = departureCity;
		var destination = "Las Vegas, Nevada";

		var service = new google.maps.DistanceMatrixService();
		service.getDistanceMatrix(
		{
	    origins: [origin],
	    destinations: [destination],
	    travelMode: google.maps.TravelMode.DRIVING,

	  	}, callback);

		function callback(response, status) {
	  		if (status == google.maps.DistanceMatrixStatus.OK) {
	    	var origins = response.originAddresses;
	    	var destinations = response.destinationAddresses;

	    	for (var i = 0; i < origins.length; i++) {
	     		 var results = response.rows[i].elements;
	        for (var j = 0; j < results.length; j++) {
	      		 var element = results[j];
	       		 var distance = element.distance.text;
	       		 var duration = element.duration.text;
	       		 var from = origins[i];
	       		 var to = destinations[j];
	       		 var distance = distance.replace(/[^\d.-]/g, '');
	       		 var distance = (distance/1.609344);
	       		 var distance = Math.round(distance).toFixed(0);
	       		 var cost = (distance/mileage)*chosengascost;
	       		 var cost = Math.round(cost).toFixed(2);
	       		document.getElementById('distanceVegas').innerHTML = distance + " miles";
				document.getElementById('traveltimeVegas').innerHTML = duration;
				document.getElementById('costVegas').innerHTML = "$" + cost;
	 			console.log("hello");
	 			     }
	 		 	  }
	 		 	}
			}

			// Create Clickable Link to take to Google Maps Page
			// Clean out origin and departure strings for URL
			    $("#mapVegas").click(function(){  
			            var destination = "Las+Vegas+Nevada";
			            var origin = departureCity;
			            var origin = origin.replace(/ /g, "+");
			            var origin = origin.replace(/,/g, "+");
			        window.location.href = "https://www.google.com/maps/dir/" + destination + "/" + origin +"/";

			});
		}



	// XML for The Alamo via Google Maps Distance Matrix API

	function alamo(){
		var origin = departureCity;
		var destination = "The Alamo, Alamo Plaza, San Antonio, TX";

		var service = new google.maps.DistanceMatrixService();
		service.getDistanceMatrix(
		{
	    origins: [origin],
	    destinations: [destination],
	    travelMode: google.maps.TravelMode.DRIVING,

	  	}, callback);

		function callback(response, status) {
	  		if (status == google.maps.DistanceMatrixStatus.OK) {
	    	var origins = response.originAddresses;
	    	var destinations = response.destinationAddresses;

	    	for (var i = 0; i < origins.length; i++) {
	     		 var results = response.rows[i].elements;
	        for (var j = 0; j < results.length; j++) {
	      		 var element = results[j];
	       		 var distance = element.distance.text;
	       		 var duration = element.duration.text;
	       		 var from = origins[i];
	       		 var to = destinations[j];
	       		 var distance = distance.replace(/[^\d.-]/g, '');
	       		 var distance = (distance/1.609344);
	       		 var distance = Math.round(distance).toFixed(0);
	       		 var cost = (distance/mileage)*chosengascost;
	       		 var cost = Math.round(cost).toFixed(2);
	       		document.getElementById('distanceAlamo').innerHTML = distance + " miles";
				document.getElementById('traveltimeAlamo').innerHTML = duration;
				document.getElementById('costAlamo').innerHTML = "$" + cost;
	 			     }
	 		 	  }
	 		 	}
			}
			
			// Create Clickable Link to take to Google Maps Page
			// Clean out origin and departure strings for URL
		    
		    $("#mapAlamo").click(function(){  
		            var destination = "The+Alamo+Alamo+Plaza+San+Antonio+TX";
		            var origin = departureCity;
		            var origin = origin.replace(/ /g, "+");
		            var origin = origin.replace(/,/g, "+");
		        window.location.href = "https://www.google.com/maps/dir/" + destination + "/" + origin +"/";
		      });
		}



	// XML for NYC via Google Maps Distance Matrix API

	function newyorkcity(){
		var origin = departureCity;
		var destination = "New York City, New York";

		var service = new google.maps.DistanceMatrixService();
		service.getDistanceMatrix(
		{
	    origins: [origin],
	    destinations: [destination],
	    travelMode: google.maps.TravelMode.DRIVING,

	  	}, callback);

		function callback(response, status) {
	  		if (status == google.maps.DistanceMatrixStatus.OK) {
	    	var origins = response.originAddresses;
	    	var destinations = response.destinationAddresses;

	    	for (var i = 0; i < origins.length; i++) {
	     		 var results = response.rows[i].elements;
	        for (var j = 0; j < results.length; j++) {
	      		 var element = results[j];
	       		 var distance = element.distance.text;
	       		 var duration = element.duration.text;
	       		 var from = origins[i];
	       		 var to = destinations[j];
	       		 var distance = distance.replace(/[^\d.-]/g, '');
	       		 var distance = (distance/1.609344);
	       		 var distance = Math.round(distance).toFixed(0);
	       		 var cost = (distance/mileage)*chosengascost;
	       		 var cost = Math.round(cost).toFixed(2);
	       		document.getElementById('distanceNewYork').innerHTML = distance + " miles";
				document.getElementById('traveltimeNewYork').innerHTML = duration;
				document.getElementById('costNewYork').innerHTML = "$" + cost;
	 			     }
	 		 	  }
	 		 	}
			}
			// Create Clickable Link to take to Google Maps Page
			// Clean out origin and departure strings for URL
	    $("#mapNewYork").click(function(){  
		            var destination = "New+York+City";
		            var origin = departureCity;
		            var origin = origin.replace(/ /g, "+");
		            var origin = origin.replace(/,/g, "+");
		        window.location.href = "https://www.google.com/maps/dir/" + destination + "/" + origin +"/";

		      });

		}



	// XML for Chicago via Google Maps Distance Matrix API

		function denver(){
		var origin = departureCity;
		var destination = "Denver, CO";

		var service = new google.maps.DistanceMatrixService();
		service.getDistanceMatrix(
		{
	    origins: [origin],
	    destinations: [destination],
	    travelMode: google.maps.TravelMode.DRIVING,

	  	}, callback);

		function callback(response, status) {
	  		if (status == google.maps.DistanceMatrixStatus.OK) {
	    	var origins = response.originAddresses;
	    	var destinations = response.destinationAddresses;

	    	for (var i = 0; i < origins.length; i++) {
	     		 var results = response.rows[i].elements;
	        for (var j = 0; j < results.length; j++) {
	      		 var element = results[j];
	       		 var distance = element.distance.text;
	       		 var duration = element.duration.text;
	       		 var from = origins[i];
	       		 var to = destinations[j];
	       		 var distance = distance.replace(/[^\d.-]/g, '');
	       		 var distance = (distance/1.609344);
	       		 var distance = Math.round(distance).toFixed(0);
	       		 var cost = (distance/mileage)*chosengascost;
	       		 var cost = Math.round(cost).toFixed(2);
	       		document.getElementById('distanceDenver').innerHTML = distance + " miles";
				document.getElementById('traveltimeDenver').innerHTML = duration;
				document.getElementById('costDenver').innerHTML = "$" + cost;
	 			     }
	 		 	  }
	 		 	}
			}

			// Create Clickable Link to take to Google Maps Page
			// Clean out origin and departure strings for URL

    		$("#mapDenver").click(function(){  
		            var destination = "Denver+CO";
		            var origin = departureCity;
		            var origin = origin.replace(/ /g, "+");
		            var origin = origin.replace(/,/g, "+");
		        window.location.href = "https://www.google.com/maps/dir/" + destination + "/" + origin +"/";

		      });


		}


	// XML for Grand Canyon via Google Maps Distance Matrix API


		function grandcanyon(){
		var origin = departureCity;
		var destination = "Grand Canyon Village, AZ";

		var service = new google.maps.DistanceMatrixService();
		service.getDistanceMatrix(
		{
	    origins: [origin],
	    destinations: [destination],
	    travelMode: google.maps.TravelMode.DRIVING,

	  	}, callback);

		function callback(response, status) {
	  		if (status == google.maps.DistanceMatrixStatus.OK) {
	    	var origins = response.originAddresses;
	    	var destinations = response.destinationAddresses;

	    	for (var i = 0; i < origins.length; i++) {
	     		 var results = response.rows[i].elements;
	        for (var j = 0; j < results.length; j++) {
	      		 var element = results[j];
	       		 var distance = element.distance.text;
	       		 var duration = element.duration.text;
	       		 var from = origins[i];
	       		 var to = destinations[j];
	       		 var distance = distance.replace(/[^\d.-]/g, '');
	       		 var distance = (distance/1.609344);
	       		 var distance = Math.round(distance).toFixed(0);
	       		 var cost = (distance/mileage)*chosengascost;
	       		 var cost = Math.round(cost).toFixed(2);
	       		document.getElementById('distanceGrandCanyon').innerHTML = distance + " miles";
				document.getElementById('traveltimeGrandCanyon').innerHTML = duration;
				document.getElementById('costGrandCanyon').innerHTML = "$" + cost;
	 			     }
	 		 	  }
	 		 	}
			}

			// Create Clickable Link to take to Google Maps Page
			// Clean out origin and departure strings for URL

			    $("#mapGrandCanyon").click(function(){  
		            var destination = "Grand+Canyon+Village+AZ";
		            var origin = departureCity;
		            var origin = origin.replace(/ /g, "+");
		            var origin = origin.replace(/,/g, "+");
		        window.location.href = "https://www.google.com/maps/dir/" + destination + "/" + origin +"/";

		      });

		}

	// XML for Miami via Google Maps Distance Matrix API

		function miami(){
		var origin = departureCity;
		var destination = "Miami, Florida";

		var service = new google.maps.DistanceMatrixService();
		service.getDistanceMatrix(
		{
	    origins: [origin],
	    destinations: [destination],
	    travelMode: google.maps.TravelMode.DRIVING,

	  	}, callback);

		function callback(response, status) {
	  		if (status == google.maps.DistanceMatrixStatus.OK) {
	    	var origins = response.originAddresses;
	    	var destinations = response.destinationAddresses;

	    	for (var i = 0; i < origins.length; i++) {
	     		 var results = response.rows[i].elements;
	        for (var j = 0; j < results.length; j++) {
	      		 var element = results[j];
	       		 var distance = element.distance.text;
	       		 var duration = element.duration.text;
	       		 var from = origins[i];
	       		 var to = destinations[j];
	       		 var distance = distance.replace(/[^\d.-]/g, '');
	       		 var distance = (distance/1.609344);
	       		 var distance = Math.round(distance).toFixed(0);
	       		 var cost = (distance/mileage)*chosengascost;
	       		 var cost = Math.round(cost).toFixed(2);
	       		document.getElementById('distanceMiami').innerHTML = distance + " miles";
				document.getElementById('traveltimeMiami').innerHTML = duration;
				document.getElementById('costMiami').innerHTML = "$" + cost;
	 			     }
	 		 	  }
	 		 	}
			}

			// Create Clickable Link to take to Google Maps Page
			// Clean out origin and departure strings for URL

			    $("#mapMiami").click(function(){  
		            var destination = "Miama+Florida";
		            var origin = departureCity;
		            var origin = origin.replace(/ /g, "+");
		            var origin = origin.replace(/,/g, "+");
		        window.location.href = "https://www.google.com/maps/dir/" + destination + "/" + origin +"/";

		      });

		}



	// XML for Niagra Falls via Google Maps Distance Matrix API

		function niagrafalls(){
		var origin = departureCity;
		var destination = "Niagara Falls, NY";

		var service = new google.maps.DistanceMatrixService();
		service.getDistanceMatrix(
		{
	    origins: [origin],
	    destinations: [destination],
	    travelMode: google.maps.TravelMode.DRIVING,

	  	}, callback);

		function callback(response, status) {
	  		if (status == google.maps.DistanceMatrixStatus.OK) {
	    	var origins = response.originAddresses;
	    	var destinations = response.destinationAddresses;

	    	for (var i = 0; i < origins.length; i++) {
	     		 var results = response.rows[i].elements;
	        for (var j = 0; j < results.length; j++) {
	      		 var element = results[j];
	       		 var distance = element.distance.text;
	       		 var duration = element.duration.text;
	       		 var from = origins[i];
	       		 var to = destinations[j];
	       		 var distance = distance.replace(/[^\d.-]/g, '');
	       		 var distance = (distance/1.609344);
	       		 var distance = Math.round(distance).toFixed(0);
	       		 var cost = (distance/mileage)*chosengascost;
	       		 var cost = Math.round(cost).toFixed(2);
	       		document.getElementById('distanceNiagraFalls').innerHTML = distance + " miles";
				document.getElementById('traveltimeNiagraFalls').innerHTML = duration;
				document.getElementById('costNiagraFalls').innerHTML = "$" + cost;
	 			     }
	 		 	  }
	 		 	}
			}

				// Create Clickable Link to take to Google Maps Page
				// Clean out origin and departure strings for URL

			    $("#mapNiagraFalls").click(function(){  
		            var destination = "Niagra+Falls+NY";
		            var origin = departureCity;
		            var origin = origin.replace(/ /g, "+");
		            var origin = origin.replace(/,/g, "+");
		        window.location.href = "https://www.google.com/maps/dir/" + destination + "/" + origin +"/";

		      });
		}



	// XML for Anchorage via Google Maps Distance Matrix API

		function anchorage(){
		var origin = departureCity;
		var destination = "Anchorage, Alaska";

		var service = new google.maps.DistanceMatrixService();
		service.getDistanceMatrix(
		{
	    origins: [origin],
	    destinations: [destination],
	    travelMode: google.maps.TravelMode.DRIVING,

	  	}, callback);

		function callback(response, status) {
	  		if (status == google.maps.DistanceMatrixStatus.OK) {
	    	var origins = response.originAddresses;
	    	var destinations = response.destinationAddresses;

	    	for (var i = 0; i < origins.length; i++) {
	     		 var results = response.rows[i].elements;
	        for (var j = 0; j < results.length; j++) {
	      		 var element = results[j];
	       		 var distance = element.distance.text;
	       		 var duration = element.duration.text;
	       		 var from = origins[i];
	       		 var to = destinations[j];
	       		 var distance = distance.replace(/[^\d.-]/g, '');
	       		 var distance = (distance/1.609344);
	       		 var distance = Math.round(distance).toFixed(0);
	       		 var cost = (distance/mileage)*chosengascost;
	       		 var cost = Math.round(cost).toFixed(2);
	       		document.getElementById('distanceAnchorage').innerHTML = distance + " miles";
				document.getElementById('traveltimeAnchorage').innerHTML = duration;
				document.getElementById('costAnchorage').innerHTML = "$" + cost;
	 			     }
	 		 	  }
	 		 	}
			}

			// Create Clickable Link to take to Google Maps Page
			// Clean out origin and departure strings for URL

			    $("#mapAnchorage").click(function(){  
		            var destination = "Anchorage+Alaska";
		            var origin = departureCity;
		            var origin = origin.replace(/ /g, "+");
		            var origin = origin.replace(/,/g, "+");
		        window.location.href = "https://www.google.com/maps/dir/" + destination + "/" + origin +"/";

		      });

		}



	// XML for Albuquerque via Google

		function albuquerque(){
		var origin = departureCity;
		var destination = "Albuquerque, New Mexico";

		var service = new google.maps.DistanceMatrixService();
		service.getDistanceMatrix(
		{
	    origins: [origin],
	    destinations: [destination],
	    travelMode: google.maps.TravelMode.DRIVING,

	  	}, callback);

		function callback(response, status) {
	  		if (status == google.maps.DistanceMatrixStatus.OK) {
	    	var origins = response.originAddresses;
	    	var destinations = response.destinationAddresses;

	    	for (var i = 0; i < origins.length; i++) {
	     		 var results = response.rows[i].elements;
	        for (var j = 0; j < results.length; j++) {
	      		 var element = results[j];
	       		 var distance = element.distance.text;
	       		 var duration = element.duration.text;
	       		 var from = origins[i];
	       		 var to = destinations[j];
	       		 var distance = distance.replace(/[^\d.-]/g, '');
	       		 var distance = (distance/1.609344);
	       		 var distance = Math.round(distance).toFixed(0);
	       		 var cost = (distance/mileage)*chosengascost;
	       		 var cost = Math.round(cost).toFixed(2);
	       		document.getElementById('distanceAlbuquerque').innerHTML = distance + " miles";
				document.getElementById('traveltimeAlbuquerque').innerHTML = duration;
				document.getElementById('costAlbuquerque').innerHTML = "$" + cost;
	 			     }
	 		 	  }
	 		 	}
			}

				// Create Clickable Link to take to Google Maps Page
				// Clean out origin and departure strings for URL

			    $("#mapAlbuquerque").click(function(){  
		            var destination = "Alburquerque+New+Mexico";
		            var origin = departureCity;
		            var origin = origin.replace(/ /g, "+");
		            var origin = origin.replace(/,/g, "+");
		        window.location.href = "https://www.google.com/maps/dir/" + destination + "/" + origin +"/";

		      });

		}

	vegas();
	alamo();
	newyorkcity();
	denver();
	grandcanyon();
	miami();
	niagrafalls();
	anchorage();
	albuquerque();

	});

});



// plug-in code for pop-up 'notes' description on the '2nd' page
$(function() {
		$('.notes').avgrund({
			height: 400,
			width: 400,
			holderClass: 'custom',
			showClose: true,
			showCloseText: 'Close',
			enableStackAnimation: true,
			onBlurContainer: '.container',
			template: '<p>brief technical notes on demonstration:<br>* loads and parses XML data from two external sources for up-to-date calculations <br>* uses Google Maps API for both calculations and map rendering   <br>* utilizes Bootstrap CSS <br>* utilizes several jQuery UI effects and plug-ins <br> </p>' 
		});
	});


// highlight input field when in use
$(document).ready(function(){
    $('input').focus(function(){
        $(this).css('outline-color', '#F6FE17');
    })
});