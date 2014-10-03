// PURELY JQUERY

$(document).ready(function() {
  	$( "#loaded" ).text( "The DOM is now loaded and can be manipulated." );
  	});

$(document).ready(function(){
	alert("Hello World");
	});


$( "#foo" ).bind( "click", function() {
  alert( "User clicked on 'foo.'" );
});

$( "#fu" ).click(function() {
	console.log("yes it worked");
});




// CODE FOR TEMPERATURE CONVERSION

function ftoc() {
    var tf = document.getElementById('itemp').value;
    var tc = (tf-32)*(5/9);
    var result = Math.round(tc*100)/100;
    document.getElementById('rtemp').innerHTML = result+"C";
}

function ctof() {
	var tc = document.getElementById('itemp').value;
	var tf = 32+(tc*(9/5));
	var result = Math.round(tf*100)/100;
	document.getElementById('rtemp').innerHTML = result+"F";
}


// CODE FOR TEMP CONVERSIONS

function swapconversion() {
	$("#changectofbutton").toggle();
	$("#changeftocbutton").toggle();
	$("#ctof").toggle();
	$("#ftoc").toggle();
	document.getElementById('rtemp').innerHTML = "";
	document.getElementById('itemp').value = "";

}

// EXPERIMENT FROM GITHUB -> plugin
// https://github.com/fkling/jQuery-Function-Toggle-Plugin

$(".multicolorfun").funcToggle({
    'click': [function() {
            $(this).css('color', 'red');
        }, function() {
            $(this).css('color', 'green');
        }, function() {
            $(this).css('color', 'black');
        }],
    'mouseover': [function() {
            $(this).css('background-color', 'red');
        }, function() {
             $(this).css('background-color', 'white');
        }]
});