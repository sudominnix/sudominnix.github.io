// CODE FOR SWAPPING OUT SLOGAN

function slogan() {
    var newslogan = prompt("what you say?");
    document.getElementById('sloganline').innerHTML = newslogan;
}
    
// CODE FOR TOGGLING OUT WAYNE


function togglepic() {
       var e = document.getElementById('hide');
       if(e.style.display == 'inline')
       {
          e.style.display = 'none';
       }
       else
       {
          e.style.display = 'inline';
       }
}





// CODE FOR TEMPERATURE CONVERSION

function ftoc() {
    var tf = document.getElementById('ftemp').value;
    var tc = (tf-32)*(5/9);
    var result = Math.round(tc*100)/100
    document.getElementById('ctemp').innerHTML = result;
}






// CODE FOR DROPPING IMAGE
