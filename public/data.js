function getdata() {
  var xhr = new XMLHttpRequest();
  let mac = "ABC:123";
  let url = "https://tempboard.itznikolovich.repl.co/";
  url = url.concat(mac);
  xhr.open('GET', url, true);
  xhr.onreadystatechange = function() {
    if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
      var data = JSON.parse(this.responseText);
      var t = data.temp;
      var ts = new Date(data.date);
      document.getElementById("T1").innerHTML = t + "°C";
      document.getElementById("date").style.visibility = "visible";
      document.getElementById("date").innerHTML = "on: " + ts.toLocaleString();
    }
  };
  xhr.send();
}
getdata()
setInterval(getdata, 180 * 1000);
