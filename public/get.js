function getdata() {
  var xhr = new XMLHttpRequest();
  let mac = ""; // mac address
  let url = "https://tempboard.nicolocarcagni.repl.co/get/"; // your own URL
  url = url.concat(mac);
  xhr.open('GET', url, true);
  xhr.onreadystatechange = function() {
    if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
      var data = JSON.parse(this.responseText);
      var t = data.temp;
      var h = data.hum;
      var ts = new Date(data.date);
      if (t == -104 || h == -104) { // I use these values to screen print any problems with the sensor
        document.getElementById("date").style.visibility = "visible";
        document.getElementById("date").innerHTML = "Bad measurements on: " + ts.toLocaleString() + ". Check your sensor";
      } else {
        document.getElementById("T1").innerHTML = t + "°C";
        document.getElementById("H1").innerHTML = h + "%";
        document.getElementById("date").style.visibility = "visible";
        document.getElementById("date").innerHTML = "on: " + ts.toLocaleString();
      }
    }
  };
  xhr.send();
}
getdata()
setInterval(getdata, 30 * 1000); // Refresh every 30 seconds
