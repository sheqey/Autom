#include <WiFi.h>
#include <HTTPClient.h>

const char* ssid = "your_SSID_here";
const char* password = "your_PASSWORD_here";

const char* serverName = "http://your_server_url_here/devices?id=1";

void setup() {
  Serial.begin(115200);

  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting to WiFi...");
  }

  Serial.println("Connected to WiFi");
}

void loop() {
  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;

    // Send GET request to server
    http.begin(serverName);
    int httpResponseCode = http.GET();

    if (httpResponseCode > 0) {
      String payload = http.getString();
      Serial.println("HTTP Response code: " + String(httpResponseCode));
      Serial.println("Payload: " + payload);

      // Check device status from payload
      if (payload == "on") {
        // Turn device off
        Serial.println("Device is on, turning off...");
        // Code to turn device off
      } else if (payload == "off") {
        // Turn device on
        Serial.println("Device is off, turning on...");
        // Code to turn device on
      } else {
        Serial.println("Invalid payload");
      }
    } else {
      Serial.println("Error in HTTP request");
    }

    http.end();
  } else {
    Serial.println("Error: WiFi not connected");
  }

  // Wait for some time before checking again
  delay(5000);
}
