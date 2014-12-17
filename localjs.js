// future function: sortable rows, more variables
// better clean out of URL parameters & pass through to custom page w/embedded Google Map;  
// better approach to cross domain issue-> add header instead of using YQL

$(document).ready(function(){

	// CLICK FUNCTION
	$(".pressme").click(function(){

	// FADE / SLIDE AWAY INTRO QUESTION BOX 
	$(".questionbox").fadeTo("slow", 0.01, function(){ 
             $(this).slideUp("slow", function() { 
                 $(this).remove(); 
             });
         });

    //	 FADE IN RESULTING DESTINATION LIST

	$(".fadein").fadeIn("slow");

	// USE USER FIELD INPUT TO SET DEPT AND MILEAGE VARIABLES
	var departureCity = document.getElementById('locationinput').value;
	var mileage = document.getElementById('mileageID').value;

	// COLLECT XML FILE FROM US GOV (via YQL) for FUEL PRICE AVERAGES
	var xmlhttp;
	xmlhttp = new XMLHttpRequest();
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
	
	// USE DROP DOWN VARIABLE TO SET USER'S CHOSENGASCOST VARIABLE
	function gasChoice() {
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
        
    // USE USER INPUT FROM DROP DOWN 2
        
	var destinationdropdown = $("#DropDown2 option:selected").val();
                
    // ESTABLISH DESTINATION ARRAYS
        
    var amusement = ["Disneyland", "Disney World", "Six Flags Over Texas", "Six Flags Great America", "Universal Studios Orlando", "King's Island", "Busch Gardens Tampa", "Universal Studios Hollywood", "Six Flags New England" ]
    var parks = ["Bryce Canyon National Park", "Carlsbad Caverns National Park", "Death Valley California", "Grand Canyon National Park", "Everglades National Park", "Glacier National Park", "Rocky Mountain National Park", "Yellowstone National Park", "Yosemite National Park"]
    var historic = ["Washington, DC", "Williamsburg, Virginia", "Charleston, SC", "Boston, MA", "Philadelphia, PA", "Savannah, Georgia", "Richmond, VA", "Sante Fe, NM", "San Antonio, TX"]
    var bigcityfun = ["New York City", "Las Vegas", "New Orleans", "Chicago", "Seattle", "San Francisco", "Los Angeles", "Dallas", "Miami" ]
    var relax = ["Aspen, CO", "Lake Tahoe, CA", "San Diego, CA", "Fort Lauderdale, FL", "Cape Cod, MA", "Albuquerque, NM", "Hilton Head, SC", "Santa Barbara, CA", "Jackson Hole, WY"]
    
    // ESTABLISH CHOSENDESTINATION variable
    
    var chosendestination;
    
    // USE DROP DOWN VARIABLE TO SET USER'S CHOSENDESTINATION

    function destinationChoice(){
        if (destinationdropdown === "National Parks") {
             chosendestination = parks;
            }
        else if (destinationdropdown === "Amusement Parks") {
             chosendestination = amusement;
            }
        else if (destinationdropdown === "Historic Places") {
             chosendestination = historic;
            }
        else if (destinationdropdown === "Big Cities") {
             chosendestination = bigcityfun;
            }
        else if (destinationdropdown === "Relaxing Destinations") {
             chosendestination = relax;
            }
        };

	// RUN GAS CHOICE FUNCTION 
    // RUN DESTINATION CHOICE FUNCTION

	gasChoice();
    destinationChoice();
                
	// MAIN FUNCTION: CALC DISTANCE W/API, APPEND ROW TO TABLE

    for (var i in chosendestination) {
        
        function calctrip(){
            var origin = departureCity;
            var destination = chosendestination[i];

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
                     var cost = Math.round(cost).toFixed(0);
                    
                    // CREATE NEW ROWS W/id'S TO PUT A PARTICULAR DESTINATION RESULT INTO
                    $('.tablebody').append('<tr><td id = "cellone"></td><td id="celltwo"></td><td id="cellthree"></td><td id="cellfour"></td><td><a id="cellfive" href = "http://www.cnn.com"></a></td></tr>');
                    
                    // INSERT DATA INTO NEW TABLE ROWS
                    
                    document.getElementById('cellone').innerHTML = destination; 
                    document.getElementById('celltwo').innerHTML = distance + " miles";
                    document.getElementById('cellthree').innerHTML = duration;
                    document.getElementById('cellfour').innerHTML = "$" + cost;
                    document.getElementById('cellfive').innerHTML = "Go!";
                    
                    // CREATE LINK FOR Go! TEXT, TAKING USER TO APPROPRIATE MAPS PAGE
                    // AND CLEAN OUT ORIGIN STRING FOR URL
                    var origin = departureCity;
                    var origin = origin.replace(/ /g, "+");
                    var origin = origin.replace(/ /g, "+");
                    $('#cellfive').prop("href", "https://www.google.com/maps/dir/" + origin + "/" + destination +"/");
                        
                    // REMOVE id's from the finished table row
                    $('td#cellone').removeAttr('id');
                    $('td#celltwo').removeAttr('id');
                    $('td#cellthree').removeAttr('id');
                    $('td#cellfour').removeAttr('id');
                    $('a#cellfive').removeAttr('id');
                                }
                            }
                        }
                    }
                }
                calctrip();
            }
	});
});



// highlight input field when in use
$(document).ready(function(){
    $('input').focus(function(){
        $(this).css('outline-color', '##81DAF5');
    })
});
