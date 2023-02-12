/** 
 * Okta API Acct Status checks account status via Okta Username
 * Assumes Okta org assigns Okta accounts under format 'jdoe@example.com'
 * The code inputs usernames in jdoe or jdoe@example.com formats and encodes API request 
 * 
 * Input: Column A must contain OKTA usernames assuming usernames are in jdoe@example.com format
 * Output: Column B will contain corresponding account status
 * 
 * AUTHOR: Samuel Beguiristain
 * Version: 2
**/
function checkAccountStatuses() {
  var sheet = SpreadsheetApp.getActiveSheet();
  var usernames = sheet.getRange("A2:A").getValues();
  var apiToken = "Your_API_Token";
  var apiUrl = "https://your_okta_link.com/api/v1/users?search=";
  // If cell is not empty, continue
  for (var i = 0; i < usernames.length; i++) {
    var username = usernames[i][0];
    if (!username) {
      break;
    }
    // encode API request, insert org Okta email under email 1 and email 2
    var email1 = username.split("@")[0] + "%40example.com"; //Okta Email 1
    var email2 = username.split("@")[0] + "%40aol.com"; // Okta Email 2
    var encodedApiUrl1 = apiUrl + "profile.email eq %22" + email1 + "%22"; //Okta Email 1
    var encodedApiUrl2 = apiUrl + "profile.email eq %22" + email2 + "%22"; //Okta Email 2
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
    // Data validation. If empty response return error 
    data = JSON.parse(response.getContentText());
    if (data.length > 0) {
      sheet.getRange(i + 1, 2).setValue(data[0].status);
    } else {
      sheet.getRange(i + 1, 2).setValue("Error: Username not found");
    }
  }
}
