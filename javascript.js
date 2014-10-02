


// CODE FOR repeating a entered line a specified (by user) number of times.






function slogan() {
    var newslogan = prompt("what you say?");
    var numbertimes = prompt("how many you want?");
   for (var i = 0; i < (numbertimes); i++) {
    var node=document.createElement("P");
    var textnode=document.createTextNode(newslogan)
    node.appendChild(textnode);
    document.getElementById("sloganline").appendChild(node);
  }
}

function switchfunction() {
    var answer = prompt("what is your favorite color- red, blue or white?").toLowerCase();
    switch(answer){
        case 'red':
        var useranswer="Red is nice."
        break;
        case 'blue':
        var useranswer="Blue is nice."
        break;
        case 'white':
        var useranswer="White is really nice."
        break;
        default:
        var useranswer="Sorry, it has to be red, white or blue.";
    }
    document.getElementById('switchline').innerHTML = useranswer;

};
