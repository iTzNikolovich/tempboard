# TempBoard
### Check the temperature of your room with a modern and minimal Dashboard

![tempboard](https://github.com/nicolocarcagni/tempboard/assets/64737169/7589cc32-af9e-458b-ae00-f0a81219020c)

## Installation
* Install [NodeJS and npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
* Install [Express.js](https://expressjs.com/en/starter/installing.html)
* Clone the repository
```bash
$ git clone https://github.com/nicolocarcagni/tempboard
```
* Install the necessary packages
```bash
$ cd tempboard/
$ npm install
```

## ESP8266
You can use your ESP8266 as a client that send temperature or humidity. (I made this code works with DHT11 sensor but you can edit it to works with other sensors.)

1. Install [Arduino IDE](https://www.arduino.cc/en/software)
2. Add ESPs support. [This](https://randomnerdtutorials.com/how-to-install-esp8266-board-arduino-ide/) could help you.
3. Edit the following lines in the code:
```c++
const char* ssid = "";
const char* password = "";
const char* serverUrl = ""; // your server url
```
4. Flash on your device
5. Connect your sensor to the ESP
6. Power it
7. Check ESP's MAC address and edit line 3 of [```public/get.js```](https://github.com/nicolocarcagni/tempboard/blob/main/public/get.js)
8. Start your server and enjoy!
