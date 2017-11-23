
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
       // Action to be performed when the document is read;
    }
};
xhttp.open("GET", "data.csv", true);
xhttp.send();

var canvas = document.getElementById('canvas'),
	context = canvas.getContext('2d');