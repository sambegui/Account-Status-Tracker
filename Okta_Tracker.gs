/** 
 * This version of App Script checks account status via Okta Username
 * AUTHOR: Samuel Beguiristain
 * Version: 5
**/
function checkAccountStatuses() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Okta Tracker"); // Attaches to sheet titled Okta Tracker
  sheet.getRange("A1").setValue("Username"); // Column A contains Usernames or emails
  sheet.getRange("B1").setValue("Status"); // Column B contains output with status
  var usernames = sheet.getRange("A2:A").getValues();
  var apiToken = "api_token";
  var apiUrl = "https://okta_url.com/api/v1/users?search=";

  // Create a log entry
  var logSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Logs");
  logSheet.appendRow([new Date(), "Okta Account Status Script Ran"]);

  for (var i = 0; i < usernames.length; i++) {
    var username = usernames[i][0];
    if (!username) {
      break;
    }
    var email1 = username.split("@")[0] + "%40email1.com";
    var email2 = username.split("@")[0] + "%40email2.com";
    var encodedApiUrl1 = apiUrl + "profile.email eq %22" + email1 + "%22"; // You only need one, added two in case your org has
    var encodedApiUrl2 = apiUrl + "profile.email eq %22" + email2 + "%22"; // two emails to search in Okta
    var response = UrlFetchApp.fetch(encodedApiUrl1, {
      headers: {
        "Authorization": "SSWS " + apiToken,
        "Accept": "application/json"
      }
    });
    var data = JSON.parse(response.getContentText());
    if (data.length > 0) {
      sheet.getRange(i + 2, 2).setValue(data[0].status);
      continue;
    }
    response = UrlFetchApp.fetch(encodedApiUrl2, {
      headers: {
        "Authorization": "SSWS " + apiToken,
        "Accept": "application/json"
      }
    });
    data = JSON.parse(response.getContentText());
    if (data.length > 0) {
      sheet.getRange(i + 2, 2).setValue(data[0].status);
    } else {
      sheet.getRange(i + 2, 2).setValue("Error: Failed Search");
    }
  }
}
