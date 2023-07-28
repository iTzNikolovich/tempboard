#include <ESP8266WiFi.h>
#include <WiFiClientSecure.h>
#include <ESP8266HTTPClient.h>
#include <DHT.h>

#define DHTPIN 2
#define DHTTYPE DHT11
DHT dht(DHTPIN, DHTTYPE);

const char* ssid = "";
const char* password = "";
const char* serverUrl = ""; // your server url

WiFiClientSecure client;

void setup() {
  Serial.begin(115200);
  WiFi.begin(ssid, password);
  
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting...");
  }
  Serial.println("Connected");
  client.setInsecure();
}

void loop() {
  sendPostRequest();
  delay(30000); // wait 30 seconds
}

void sendPostRequest() {
  HTTPClient http;
  String macAddress = WiFi.macAddress();
  // Read from sensor
  float temperature = dht.readTemperature();
  float humidity = dht.readHumidity();
  if (isnan(temperature) || isnan(humidity)){ // if is not a number to avoid server crash
    temperature = -104;
    humidity = -104;
    Serial.println("bad measurements, wait for new ones...");
  }
  Serial.println(temperature);
  Serial.println(humidity);

  // JSON
  String jsonPayload = "{\"mac\":\"" + macAddress + "\",\"temp\":" + String(temperature) + ",\"hum\":" + String(humidity) + "}";

  http.begin(client, serverUrl);
  http.addHeader("Content-Type", "application/json"); // request header

  int httpResponseCode = http.POST(jsonPayload); // send request
  Serial.println(httpResponseCode);

  String response = http.getString(); // read response code from server

  http.end();
}
