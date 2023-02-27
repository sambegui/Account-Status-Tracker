# Okta Account Status Checker
This is a Google Apps Script that checks the account status of Okta users by their username. The usernames are stored in a Google Sheet, and the script retrieves the status of each user and writes the results to the sheet.

## Sheet Requirements
This script assumes that you have a Google Sheet with the following requirements:

1. A sheet named "Okta Tracker" exists in the Google Sheet.
2. The first column of the "Okta Tracker" sheet contains the usernames.
3. The second column of the "Okta Tracker" sheet is empty and will be used to store the account statuses.
4. A sheet named "Logs" exists in the Google Sheet to store the log entries.

Make sure that your Google Sheet meets these requirements before running the script.

## Usage
To use this script:

1. Open the Google Sheet where you want to track Okta account statuses.
2. Click on `Tools` and then `Script editor`.
3. Copy and paste the code from this repository into the editor.
4. Save the script with a name of your choice.
5. Modify the `apiToken` variable in the `checkAccountStatuses` function with your own Okta API token.
6. Modify the sheetName variable in the `checkAccountStatuses` function with the name of the sheet that contains your usernames.
7. Run the `checkAccountStatuses` function by clicking on the play button or by going to Run > `checkAccountStatuses`.
8. The script will retrieve the status for each username and write the results to the sheet.

You can also set up a trigger to run the script automatically by calling the `setRefreshTriggerOkta` function. This will create a time-based trigger that runs the script every 12 hours.

## Credits
This script was created by Samuel Beguiristain.
